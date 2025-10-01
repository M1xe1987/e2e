import { Constellation } from "../support/pageObjects.ts/constellation";

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
    it('Go to Social Network page and try to login with bad pass', () => {
        Constellation.enterMail('m.lazovic1987@yahoo.com');
        Constellation.enterPassword('nig');
        Constellation.clickOnConfirmbtn();
        Constellation.getInvalidFeedbackMessage().should('equal', 'Please provide a minimum of 6 characters')
    });
    it('Go to Social Network page and try to login with bad mail and without pass', () => {
        Constellation.enterMail('m.lazovic1987@yahoo');
        Constellation.clickOnConfirmbtn();
        Constellation.getInvalidFeedbackMessage().should('equal', 'Password field is required.')
    });
    it('Go to Social Network page and try to login with bad mail', () => {
        Constellation.enterMail('m.lazovic1987@yahoo');
        Constellation.enterPassword('nigrutin');
        Constellation.clickOnConfirmbtn();
        Constellation.getErrorMessage().should('equal', 'An error occurred during login.')
    });
    it('Ok login and enter a new post, and add a image post also', () => {
        Constellation.enterMail(' m.lazovic1987@yahoo.com');
        Constellation.enterPassword('constel123');
        Constellation.clickOnConfirmbtn();
        // checkinf if we are on the main page
        Constellation.getHometitle().should('equal', 'Home')
        //enter a new text post
        Constellation.enterPost('E djesi, e desi e');
        Constellation.clickOnNewPost();
        cy.wait(1000);
        Constellation.clickOnNewPost();
        // Upload it using selectFile
        const imageUrl = 'https://football-italia.net/wp-content/uploads/2024/02/ssc-napoli-v-fc-barcelona-round-of-16-first-leg-uefa-champions-league-2023-24.jpg';
        Constellation.enterPost(imageUrl);
        Constellation.clickOnNewPost();
    });
    it('Add an audio post', () => {
        Constellation.enterMail(' m.lazovic1987@yahoo.com');
        Constellation.enterPassword('constel123');
        Constellation.clickOnConfirmbtn();
        //audio post
        Constellation.clickToStartAudioPost();
        Constellation.clickToStopAudioPost()
        cy.wait(1000);
        Constellation.clickOnNewPost();
    });
    it('Like a post', () => {
        Constellation.enterMail(' m.lazovic1987@yahoo.com');
        Constellation.enterPassword('constel123');
        Constellation.clickOnConfirmbtn();
        cy.wait(1000);
        // Contellation.clickLikeButtonByIndex(0);
        //checking if we hit the like button by number if likes
        Constellation.getLikeCountByIndex(0).then(initialCount => {
            Constellation.clickLikeButtonByIndex(0);
            cy.wait(500);
            Constellation.getLikeCountByIndex(0).then(updatedCount => {
                expect(updatedCount).to.be.greaterThan(initialCount);
            });
        });
        //it can be dan aslo with colours(When it is like button is blue)
    });
    it('LIke/dislike a post', () => {
        Constellation.enterMail(' m.lazovic1987@yahoo.com');
        Constellation.enterPassword('constel123');
        Constellation.clickOnConfirmbtn();
        cy.wait(1000);
        // Like the post
        Constellation.getLikeCountByIndex(0).then(initialCount => {
            Constellation.clickLikeButtonByIndex(0);
            cy.wait(500);
            Constellation.getLikeCountByIndex(0).then(afterLike => {
                expect(afterLike).to.be.greaterThan(initialCount); // ✅ Like worked
                // Dislike the post (click again)
                Constellation.clickLikeButtonByIndex(0);
                cy.wait(1000);
                Constellation.getLikeCountByIndex(0).then(afterDislike => {
                    expect(afterDislike).to.equal(initialCount); // ✅ Should return to original
                });
            });
        });

    });
    it('Dislike a post', () => {
        Constellation.enterMail(' m.lazovic1987@yahoo.com');
        Constellation.enterPassword('constel123');
        Constellation.clickOnConfirmbtn();
        cy.wait(1000);
        Constellation.getLikeCountByIndex(0).then(initialCount => {
            Constellation.clickLikeButtonByIndex(0); // expecting it to dislike
            cy.wait(500);
            Constellation.getLikeCountByIndex(0).then(updatedCount => {
                expect(updatedCount).to.be.lessThan(initialCount);
            });
        });
    });
    it('Write and check comment', () => {
        Constellation.enterMail(' m.lazovic1987@yahoo.com');
        Constellation.enterPassword('constel123');
        Constellation.clickOnConfirmbtn();
        Constellation.clickCommentBtnByIndex(0);
        const postIndex = 0
        let initialCommentCount: number;
        Constellation.getCommentCount(postIndex).then(count => {
            initialCommentCount = count;
        });
        Constellation.writeComment('testing comment');
        Constellation.checkComment().should('contains', 'testing comment');
        Constellation.getCommentCount(postIndex).should('eq', initialCommentCount + 1);

    });
    it('Delete comment', () => {
        Constellation.enterMail(' m.lazovic1987@yahoo.com');
        Constellation.enterPassword('constel123');
        Constellation.clickOnConfirmbtn();
        Constellation.clickCommentBtnByIndex(0);
        const postIndex = 0;
        let initialCommentCount: number;
        Constellation.writeComment('testing comment');
        Constellation.postComment();
        Constellation.checkComment().should('contains', 'testing comment');
        Constellation.getCommentCount(postIndex).then(count => {
            initialCommentCount = count;
            Constellation.deleteComment();
            cy.wait(1000);
            // Contellation.checkComment().should('contains', 'testing comment');
            Constellation.getDeletedMessage().should('equal', 'You sucessfully deleted your comment')
            Constellation.getCommentCount(postIndex).should('eq', initialCommentCount - 1);
        });
    });
    it('Check max length of audio posts', () => {
        Constellation.enterMail(' m.lazovic1987@yahoo.com');
        Constellation.enterPassword('constel123');
        Constellation.clickOnConfirmbtn();
        cy.wait(3000);
        cy.scrollTo('center');

        // Start recording
        Constellation.clickToStartAudioPost();

        // Confirm recording UI is visible
        Constellation.getAudioVisualizerCanvas().should('be.visible');
        Constellation.getRecordingTimerDisplay().should('contain.text', '0:0');

        // Wait for 11 seconds to ensure auto-stop kicks in
        cy.wait(11000);

        // Check that recording has stopped
        Constellation.getRecordingTimerDisplay().invoke('text').then((text: string) => {
            expect(text.trim()).to.match(/^0:10$/);
        });
    });

});
