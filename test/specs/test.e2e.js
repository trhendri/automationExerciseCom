const { expect, browser } = require("@wdio/globals");

const page = require("../pageobjects/page");

//AutomationExercises.com Project

describe('Test Case 1', () => {
    it("Should Register User", async () => {
        //Launch Browser, navigate to site, and confirm homepage is visible
        await browser.url("/");
        const browserUrl = "https://www.automationexercise.com/";
        await expect(browser).toHaveUrl(browserUrl);

        //Click 'Signup / Login' button, Verify 'New User Signup!' is visible
        const loginBtn = await $('//a[contains(text(), "Signup / Login")]');
        await loginBtn.click();
        const newUserSignUpText = await $(".signup-form h2");
        await expect(newUserSignUpText).toBeDisplayed;
        await expect(newUserSignUpText).toHaveText("New User Signup!");

        //Enter name and email address, click 'Signup' button, and verify that 'ENTER ACCOUNT INFORMATION' is visible
        const name = "Jane Smith";
        const emailAddress = "email@jwo0.com";
        const registerNameField = await $('//input[@data-qa="signup-name"]');
        const registerEmailField = await $('//input[@data-qa="signup-email"]');
        const signupBtn = await $("button=Signup");
        const registerTitle = await $$(".login-form h2")[0];

        await registerNameField.setValue(name);
        await registerEmailField.setValue(emailAddress);
        await signupBtn.click();
        await expect(registerTitle).toHaveText("ENTER ACCOUNT INFORMATION");

        //Fill details: Title, Name, Email, Password, Date of birth, and select checkbox 'Sign up for our newsletter!',
        //Select checkbox 'Receive special offers from our partners!',
        //Fill details: First name, Last name, Company, Address, Address2, Country, State, City, Zipcode, Mobile Number,
        //Click 'Create Account' button,
        ///Veridy that 'ACCOUNT CREATED!' is visible

        const titleMrsRadio = await $('//label[@for="id_gender2"]');
        const passwordField = await $('//input[@data-qa="password"]');
        const password = "password";
        const dobDayField = await $('//select[@data-qa="days"]');
        const dobMonthField = await $('//select[@data-qa="months"]');
        const dobYearField = await $('//select[@data-qa="years"]');
        const newsletterCheckbox = await $("#newsletter");
        const specialofferCheckbox = await $("#optin");
        const firstNameField = await $("#first_name");
        const lastNameField = await $("#last_name");
        const companyField = await $("#company");
        const address1Field = await $("#address1");
        const address2Field = await $("#address2");
        const countryField = await $("#country");
        const stateField = await $("#state");
        const cityField = await $("#city");
        const zipcodeField = await $("#zipcode");
        const mobileNumField = await $("#mobile_number");
        const createAccountBtn = $("button=Create Account");
        const accountCreatedSuccessText = "ACCOUNT CREATED!";
        const accountCreatedUrl = "https://www.automationexercise.com/account_created";
        const accountCreatedSuccessMsg = $('//h2[@data-qa="account-created"]');

        const user = {
            firstName: "Jane",
            lastName: "Doe",
            company: "ABC",
            address1: "123 Mark Street",
            address2: " Apt 90",
            country: "United States",
            state: "New York",
            city: "New York",
            zipcode: "456789",
            mobileNum: "1234567890",
        };

        await titleMrsRadio.click();
        await passwordField.setValue(password);
        await dobDayField.selectByVisibleText('12');
        await dobMonthField.selectByVisibleText("April");
        await dobYearField.selectByVisibleText("1900");
        
        await newsletterCheckbox.click();
        await specialofferCheckbox.click();
        await firstNameField.setValue(user.firstName);
        await lastNameField.setValue(user.lastName);
        await companyField.setValue(user.company);
        await address1Field.setValue(user.address1);
        await address2Field.setValue(user.address2);
        await countryField.selectByVisibleText(user.country);
        await stateField.setValue(user.state);
        await cityField.setValue(user.state);
        await zipcodeField.setValue(user.zipcode);
        await mobileNumField.setValue(user.mobileNum);
        
        await createAccountBtn.click();
        await expect(browser).toHaveUrl(accountCreatedUrl);
        await expect(accountCreatedSuccessMsg).toBeDisplayed();
        await expect(accountCreatedSuccessMsg).toHaveText(accountCreatedSuccessText);

        



        //Click 'Countinue' button and Verify that 'Logged in as username' is visible

        const registerContinueBtn = await $('a[data-qa="continue-button"]');
        const loggedInUser = await $('a > b'); 
        
        
        await registerContinueBtn.click();
        await expect(loggedInUser).toBeDisplayed()
        await expect(loggedInUser).toHaveText(name);



        //Click Delete Account' button and verify that 'ACCOUNT DELETED!' is visble and click 'Continue' button
        const deleteAccountBtn = await $('a[href="/delete_account"]');
        const accountDeletedMsg = await $('h2[data-qa="account-deleted"]');
        const continueBtn = await $('a[data-qa="continue-button"]');
        const accountDeletedText = 'ACCOUNT DELETED!';

        await deleteAccountBtn.click();
        await expect(accountDeletedMsg).toBeDisplayed();
        await expect(accountDeletedMsg).toHaveText(accountDeletedText);
        await continueBtn.click();


    });

    it("", async () => {});

    it("", async () => {});

    it("", async () => {});

});

describe ('Test Case 2', () => {
    it('Should log user in with correct email and password', async() => {
        


    });


});
