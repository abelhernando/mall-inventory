import { itemConfig } from "./item.config";

export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name: string, sellIn: number, quality: number) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class MallInventory {
  constructor(public items = [] as Array<Item>) {}

  public updateQuality(): Item[] {
    const updatedItems = this.items.map((item) => {
      if (this.isException(item.name)) return item;

      item.sellIn--;

      if (Object.keys(itemConfig).includes(item.name)) {
        itemConfig[item.name].update(item);
      } else {
        if (item.sellIn < 0) {
          item.quality = item.quality - 2;
        } else {
          item.quality--;
        }
      }
  
      this.validateQuality(item);
  
      return item;
    });
    return updatedItems;
  }

  isException(itemName: string): boolean {
    return itemName === "Millenary Honey";
  }
  validateQuality(item: Item): void {
    if (item.quality > 50) item.quality = 50;
    if (item.quality < 0) item.quality = 0;
  }
}
