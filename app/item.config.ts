import { Item } from "./mall-inventory";

interface ItemConfig {
  [key: string]: {
    update: Function;
  };
}

export const itemConfig: ItemConfig = {
  "VIP special event passes to a VeryX19R45 Concert": {
    update: (item: Item) => {
      switch (true) {
        case item.sellIn <= 0:
          item.quality = 0;
          break;
        case item.sellIn < 5:
          item.quality = item.quality + 3;
          break;
        case item.sellIn < 10:
          item.quality = item.quality + 2;
          break;
        default:
          item.quality++;
          break;
      }
    },
  },
  "Aged Cheese": {
    update: (item: Item) => item.quality++,
  },
  "Fresh fish": {
    update: (item: Item) => (item.quality = item.quality - 2),
  },
};
