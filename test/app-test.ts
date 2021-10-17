import { Item, MallInventory } from '../app/mall-inventory';

const items = [
    new Item("Bottle of water", 10, 20), //
    new Item("Aged Cheese", 2, 0), //
    new Item("Coffee", 5, 7), //
    new Item("Millenary Honey", 0, 80), //
    new Item("Millenary Honey", -1, 80),
    new Item("VIP special event passes to a VeryX19R45 Concert", 15, 20),
    new Item("VIP special event passes to a VeryX19R45 Concert", 10, 49),
    new Item("VIP special event passes to a VeryX19R45 Concert", 5, 49),
    // this Fresh fish item does not work properly yet
    new Item("Fresh fish", 3, 6)]


const mallInventory = new MallInventory(items);
const days: number = 2;
for (let i = 0; i < days; i++) {
    console.log("-------- day " + i + " --------");
    console.log("name, sellIn, quality");
    items.forEach(element => {
        console.log(element.name + ' ' + element.sellIn + ' ' + element.quality);

    });
    console.log();
    mallInventory.updateQuality();
}
