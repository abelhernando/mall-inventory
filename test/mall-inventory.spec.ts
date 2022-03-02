import { Item, MallInventory } from '~/app/mall-inventory';

describe('Nicek Mall Inventory', () => {
    describe('with one normal item', () => {
        let mallInventory: MallInventory;

        beforeEach(() => {
            mallInventory = new MallInventory([new Item('bottle of water', 5, 10)]);
        });

        it('should add a bottle of water', () => {
            const actualUpdatedItem = mallInventory.updateQuality()[0];
            expect(actualUpdatedItem.name).toEqual('bottle of water');
        });

        it('should degrade SellIn from 5 to 4 on update', () => {
            const actualUpdatedItem = mallInventory.updateQuality()[0];
            expect(actualUpdatedItem.sellIn).toEqual(4);
        });

        it('should degrade Quality from 10 to 9 on update', () => {
            const actualUpdatedItem = mallInventory.updateQuality()[0];
            expect(actualUpdatedItem.quality).toEqual(9);
        });

        it('when SellIn < 0 should degrade Quality from 10 to 8 on update', () => {
            mallInventory.items[0].sellIn = -1;
            const actualUpdatedItem = mallInventory.updateQuality()[0];
            expect(actualUpdatedItem.quality).toEqual(8);
        });

        it('when Quality is 0 should not reduce Quality', () => {
            mallInventory.items[0].quality = 0;
            const actualUpdatedItem = mallInventory.updateQuality()[0];
            expect(actualUpdatedItem.quality).toEqual(0);
        });
    });

    describe('with multiple normal items', () => {
        let mallInventory: MallInventory;

        beforeEach(() => {
            mallInventory = new MallInventory([
                new Item('coffee', 5, 10),
                new Item('soap', 6, 13),
                new Item('toilet paper', 4, 8),
                new Item('water', 1, 3)
            ]);
        });

        it('should degrade all SellIn values on update', () => {
            const actualUpdatedItems = mallInventory.updateQuality();
            expect(actualUpdatedItems[0].sellIn).toEqual(4);
            expect(actualUpdatedItems[1].sellIn).toEqual(5);
            expect(actualUpdatedItems[2].sellIn).toEqual(3);
            expect(actualUpdatedItems[3].sellIn).toEqual(0);
        });

        it('should degrade all Quality values on update', () => {
            const actualUpdatedItems = mallInventory.updateQuality();
            expect(actualUpdatedItems[0].quality).toEqual(9);
            expect(actualUpdatedItems[1].quality).toEqual(12);
            expect(actualUpdatedItems[2].quality).toEqual(7);
            expect(actualUpdatedItems[3].quality).toEqual(2);
        });
    });


    describe('with one Aged Cheese', () => {
        let mallInventory: MallInventory;

        beforeEach(() => {
            mallInventory = new MallInventory([new Item('Aged Cheese', 5, 10)]);
        });

        it('should increase Quality from 10 to 11 on update', () => {
            const actualUpdatedItem = mallInventory.updateQuality()[0];
            expect(actualUpdatedItem.quality).toEqual(11);
        })

        it('when Quality is 50 should not increase Quality', () => {
            mallInventory.items[0].quality = 50;
            const actualUpdatedItem = mallInventory.updateQuality()[0];
            expect(actualUpdatedItem.quality).toEqual(50);
        });
    });

    describe('with one Millenary Honey', () => {
        var mallInventory: MallInventory;

        beforeEach(() => {
            mallInventory = new MallInventory([new Item('Millenary Honey', 20, 30)]);
        });

        it('should not decrease Quality on update', () => {
            const actualUpdatedItem = mallInventory.updateQuality()[0];
            expect(actualUpdatedItem.quality).toEqual(30);
        });

        it('should not decrease SellIn on update', () => {
            const actualUpdatedItem = mallInventory.updateQuality()[0];
            expect(actualUpdatedItem.sellIn).toEqual(20);
        });
    });

    describe('with one VIP special event passes', () => {
        let mallInventory: MallInventory;

        beforeEach(() => {
            mallInventory = new MallInventory([new Item('VIP special event passes to a VeryX19R45 Concert', 17, 11)]);
        });

        it('when SellIn is less than 5 should increase Quality from 11 to 14 on update', () => {
            mallInventory.items[0].sellIn = 2
            const actualUpdatedItem = mallInventory.updateQuality()[0];
            expect(actualUpdatedItem.quality).toEqual(14);
        });

        it('when SellIn is 5 should increase Quality from 11 to 14 on update', () => {
            mallInventory.items[0].sellIn = 5
            const actualUpdatedItem = mallInventory.updateQuality()[0];
            expect(actualUpdatedItem.quality).toEqual(14);
        });

        it('when SellIn is less than 10 should increase Quality from 11 to 13 on update', () => {
            mallInventory.items[0].sellIn = 7
            const actualUpdatedItem = mallInventory.updateQuality()[0];
            expect(actualUpdatedItem.quality).toEqual(13);
        });

        it('when SellIn is 10 should increase Quality from 11 to 13 on update', () => {
            mallInventory.items[0].sellIn = 10
            const actualUpdatedItem = mallInventory.updateQuality()[0];
            expect(actualUpdatedItem.quality).toEqual(13);
        });

        it('when SellIn is 0 should have Quality of zero', () => {
            mallInventory.items[0].sellIn = 0
            const actualUpdatedItem = mallInventory.updateQuality()[0];
            expect(actualUpdatedItem.quality).toEqual(0);
        });
    });
});
