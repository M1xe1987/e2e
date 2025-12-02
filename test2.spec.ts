import { Test } from "../support/pageObjects.ts/test";



describe('User: Register as a new user and login', () => {
    beforeEach('Navigate to Demo Home page', () => {
        Test.navigateToDemoPage();
    })
    it('Go to demo page, and register as a new user', () => {
        Test.clickOnTheTabs('Sign in');
        Test.clickOnRegisterLink(0, 'Register your account');
        Test.enterName('Mihajlo');
        Test.lastName('Lazovic');
        cy.wait(500);
        Test.enterBirthDate('1987-06-20');
        Test.enterAdress('Pere Djurkovica 48');
        Test.enterPostCode('11211');
        Test.enterCity('Belgrade');
        Test.enterState('Serbia');
        Test.selectCountry(3, 'RS');
        Test.enterPhone('381643623516');
        Test.enterMail('m.lazovic1987@yahoo.com');
        Test.enterPassword('nigrutin');
        Test.clickOnRegisterbutton();
        cy.wait(1500);
        Test.LoginButton();
    });
    it('Go to Login page and login with credentials and check of you are logged in', () => {
        Test.clickOnTheTabs('Sign in');
        Test.enterMailOnLoginPage('m.lazovic1987@yahoo.com');
        Test.enterPasswordOnLoginPage('nigrutin');
        Test.LoginButton();
        Test.getTitle().should('equal', 'My account')
    });
    /* });
    describe('Search and filter products', () => {
        beforeEach('Navigate to Demo Home page', () => {
            Test.navigateToDemoPage();
        })
    */
    it('Enter `cutters` in search filed, and perform the search', () => {
        cy.wait(1000);
        Test.navigateToDemoPage();
        cy.wait(1000);
        Test.enterInSearch('cutters');
        Test.clickOnSearchButton();
        cy.wait(500);
        Test.listOfImages().should('be.visible');
        cy.step('when saerch is done, it should be only 2 cards so there is no navigation at the bottom')
        Test.getNavigation().should('not.be.visible');

    });
    it('Choose Hammer from Hand Tools categories', () => {
        Test.listOfImages().should('be.visible');
        Test.chooseFilter(' Hammer');
        Test.clickOnSearchButton();
        Test.getTextInImage().should('equal', ' Claw Hammer with Shock Reduction Grip  Hammer  Claw Hammer  Thor Hammer  Sledgehammer  Claw Hammer with Fiberglass Handle  Court Hammer ');
    });
    it('Choose Grinder from Powert Tools categories, and perform the search, there should be no products and message should appear `No results found.`', () => {
        Test.chooseFilter(' Grinder');
        cy.wait(1000);
        Test.clickOnSearchButton();
        cy.wait(1500);
        Test.notFoundText().should('equal', 'No results found.');
    });
    it('Sort products from Z to A', () => {
        Test.getTextInImage().should('equal', ' Combination Pliers  Pliers  Bolt Cutters  Long Nose Pliers  Slip Joint Pliers  Claw Hammer with Shock Reduction Grip  Hammer  Claw Hammer  Thor Hammer ');
        Test.chooseSort('Name (Z - A)');
        cy.wait(1400);
        Test.getTextInImage().should('equal', ' Wood Saw  Thor Hammer  Slip Joint Pliers  Sledgehammer  Sheet Sander  Pliers  Phillips Screwdriver  Open-end Spanners (Set)  Mini Screwdriver ');
    });
    it('Sort products by Price(Low-High)', () => {
        cy.wait(500);
        Test.getProductPrice(0).should('equal', '$14.15');
        Test.chooseSort('Price (Low - High)');
        cy.wait(500);
        Test.getProductPrice(1).should('equal', '$9.17');
    });

    /* });
    describe('Cart: Add at least 2 different products from different categories to the cart', () => {
        beforeEach('Navigate to Demo Home page', () => {
            Test.navigateToDemoPage();
        })*/
    it('Choose Drill from Hand Tools categories, it should filtered and show 2 products, choose 1st and add to cart', () => {
        cy.wait(2000);
        Test.chooseFilter(' Drill');
        cy.wait(2000);
        Test.clickOnSearchButton();
        cy.wait(2000);
        Test.getTextInImage().should('equal', ' Cordless Drill 24V  Cordless Drill 12V ');
        cy.step('choose 1st product');
        Test.selectProducts(0);
        // Test.getTitleOfSelectedProduct().should('equal', 'Cordless Drill 24V');
        Test.AddProductToCart();
    });
    it('Turn back to Home page, choose Sander filter, it should filter products, choose 2nd product and add to cart', () => {
        cy.wait(2000);
        Test.clickOnTheTabs('Home');
        cy.wait(2000);
        Test.chooseFilter(' Sander');
        cy.wait(2000);
        Test.selectProducts(1);
        // Test.getTitleOfSelectedProduct().should('equal', 'Belt Sander');
        Test.AddProductToCart();
    });
    it('Go to shoping cart, check product inside the dable, name, quantity and values', () => {
        cy.wait(2000);
        Test.clickOnTheTabs('Home');
        Test.goToShopingCart(4);
        Test.getTableColumns().then(tableColumns => {
            expect(tableColumns.eq(0).text()).to.be.equal('Item');
            expect(tableColumns.eq(1).text()).to.be.equal('');
            expect(tableColumns.eq(2).text()).to.be.equal('Quantity');
            expect(tableColumns.eq(3).text()).to.be.equal('Price');
            expect(tableColumns.eq(4).text()).to.be.equal('Total');
            expect(tableColumns.eq(5).text()).to.be.equal('Total');
        });
        Test.getValuesInTable(0, 0).should('equal', 'Cordless Drill 24V');
        Test.getValuesInTable(0, 2).should('equal', '1');
        Test.getValuesInTable(0, 3).should('equal', '$66.54');
        Test.getValuesInTable(0, 4).should('equal', '$66.54');
        Test.getValuesInTable(1, 0).should('equal', 'Belt Sander');
        Test.getValuesInTable(1, 2).should('equal', '1');
        Test.getValuesInTable(1, 3).should('equal', '$73.59');
        Test.getValuesInTable(1, 4).should('equal', '$73.59');
        Test.getTotalSum(0, 3).should('equal', 'Total');
        Test.getTotalSum(0, 4).should('equal', '$140.13');
        Test.CheckoutButton();
    });
});