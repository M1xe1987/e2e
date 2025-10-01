describe('User: Register as a new user and login', () => {
    beforeEach('Navigate to Demo Home page', () => {
        Constellation.navigateToSocialNetworkpage();
    })
    it('Go to Social Network page and try to login', () => {
        Constellation.enterMail('m.lazovic1987@yahoo.com');
        Constellation.enterPassword('nigrutin');
        Constellation.clickOnConfirmbtn();
        Constellation.getErrorMessage().should('equal', 'An error occurred during login.')
    });
});