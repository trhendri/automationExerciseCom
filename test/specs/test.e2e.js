const { expect, browser } = require("@wdio/globals");

const page = require("../pageobjects/page");
import path from "node:path";

//AutomationExercises.com Project

describe("Test Case 1", () => {
    it("Should Register User", async () => {
        //Launch Browser, navigate to site, and confirm homepage is visible
        await browser.url("/");
        const browserUrl = "https://www.automationexercise.com/";
        await expect(browser).toHaveUrl(browserUrl);

        //Click 'Signup / Login' button, Verify 'New User Signup!' is visible

        await $(page.signupLoginBtn).click();
        const newUserSignUpText = await $(page.newUserSignUpText);
        await expect(newUserSignUpText).toBeDisplayed();
        await expect(newUserSignUpText).toHaveText("New User Signup!");

        //Enter name and email address, click 'Signup' button, and verify that 'ENTER ACCOUNT INFORMATION' is visible

        const registerNameField = await $('//input[@data-qa="signup-name"]');
        const registerEmailField = await $('//input[@data-qa="signup-email"]');
        const signupBtn = await $("button=Signup");
        const registerTitle = await $$(".login-form h2")[0];

        await registerNameField.setValue(page.username);
        await registerEmailField.setValue(page.validEmailAddress);
        await signupBtn.click();
        await expect(registerTitle).toHaveText("ENTER ACCOUNT INFORMATION");

        //Fill details: Title, Name, Email, Password, Date of birth, and select checkbox 'Sign up for our newsletter!',
        //Select checkbox 'Receive special offers from our partners!',
        //Fill details: First name, Last name, Company, Address, Address2, Country, State, City, Zipcode, Mobile Number,
        //Click 'Create Account' button,
        ///Verify that 'ACCOUNT CREATED!' is visible

        const titleMrsRadio = await $('//label[@for="id_gender2"]');
        const passwordField = await $('//input[@data-qa="password"]');

        const dobDayField = await $('//select[@data-qa="days"]');
        const dobMonthField = await $('//select[@data-qa="months"]');
        const dobYearField = await $('//select[@data-qa="years"]');
        const newsletterCheckbox = await $("#newsletter");
        const specialOfferCheckbox = await $("#optin");
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
        await passwordField.setValue(page.validPassword);
        await dobDayField.selectByVisibleText("12");
        await dobMonthField.selectByVisibleText("April");
        await dobYearField.selectByVisibleText("1900");

        await newsletterCheckbox.click();
        await specialOfferCheckbox.click();
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

        //  Click 'Continue' button and Verify that 'Logged in as username' is visible

        const registerContinueBtn = await $('a[data-qa="continue-button"]');
        const loggedInUser = await $("a > b");

        await registerContinueBtn.click();
        await expect(loggedInUser).toBeDisplayed();
        await expect(loggedInUser).toHaveText(page.username);

        //Click Delete Account' button and verify that 'ACCOUNT DELETED!' is visible and click 'Continue' button
        const accountDeletedMsg = await $('h2[data-qa="account-deleted"]');
        const continueBtn = await $('a[data-qa="continue-button"]');
        const accountDeletedText = "ACCOUNT DELETED!";

        /*
        await $(page.deleteAccountBtn).click();
        await expect(accountDeletedMsg).toBeDisplayed();
        await expect(accountDeletedMsg).toHaveText(accountDeletedText);
        await continueBtn.click();
        */
    });
});

// *TODO: Implement log out and so log in options are available. Also, rewrite to work and redefine variables

describe("Test Case 2", () => {
    it("Should log user in with correct email and password", async () => {
        //Launch Browser and navigate to url, verify home page is visible successfully
        await browser.url("/");
        const browserUrl = "https://www.automationexercise.com/";
        await expect(browser).toHaveUrl(browserUrl);

        //Click on "Signup/Login" button, verify 'Login to your account' is visible

        const loginText = await $(page.loginText);
        await $(page.signupLoginBtn).click();
        await expect(loginText).toBeDisplayed();
        await expect(loginText).toHaveText("Login to your account");

        //Enter correct email address and password, Click Login Button
        //Verify that 'Logged in as username' is visible
        const loginEmailField = await $(page.loginEmailField);
        const loginPasswordField = await $(page.loginPasswordField);
        const loginBtn = await $(page.loginBtn);

        await loginEmailField.setValue(page.validEmailAddress);
        await loginPasswordField.setValue(page.validPassword);
        await loginBtn.click();
        const loggedInAsText = await $$(".shop-menu > ul> li")[9];
        console.log(loggedInAsText);

        await expect(loggedInAsText).toHaveText("Logged in as " + page.username);

        //Click 'Delete Account' button, Verify that 'ACCOUNT DELETED!"
        const deleteAccountBtn = await $(page.deleteAccountBtn);
        const accountDeletedMsg = await $(page.accountDeletedMsg);
        const accountDeletedText = page.accountDeletedText;
        await deleteAccountBtn.click();
        await expect(accountDeletedMsg).toBeDisplayed();
        await expect(accountDeletedMsg).toHaveText(accountDeletedText);
    });
});

describe("Test Case 3", () => {
    it(" Login User with incorrect email and password", async () => {
        //Launch Browser, Nav to url, and verify that homepage is visible successfully
        //Click on sign up/login button and verify 'Login to your account' is visible
        await page.goToLoginSignupPage();

        //Enter incorrect email address and password, click login button and verify error 'Your email or password is incorrect!' is visible
        await page.loginForm(page.invalidEmailAddress, page.invalidPassword);
        const loginErrorMsg = $(page.loginErrorMsg);
        await expect(loginErrorMsg).toBeDisplayed();
        await expect(loginErrorMsg).toHaveText("Your email or password is incorrect!");
    });
});

describe("Test Case 4", () => {
    it("Should Logout User", async () => {
        //Launch Browser, Nav to site, Verify the homepage is visible
        //Click on Sign up/Login Button, Verify 'Login to your account' is visible
        await page.goToLoginSignupPage();

        //Enter correct email address and password, Click 'login' button, verify that 'Logged in as username' is visible
        await page.loginUser(page.validEmailAddress, page.validPassword);
        const loggedInAsText = await $$(".shop-menu > ul> li")[9];
        const username = page.username;

        await expect(loggedInAsText).toHaveText("Logged in as " + username);

        //Click 'Logout' button , Verify that user is navigated to login Page

        const logoutBtn = await $(page.logoutBtn);
        await logoutBtn.click();
        await expect(browser).toHaveUrl(page.browserUrl + "login");
    });
});
//*TODO: Reorganize code to add a beforeEach for each test if reasonable
describe("Test Case 5", () => {
    it("Register User with existing email", async () => {
        const username = page.username;
        const newRegistrationEmailAddress = page.newRegistrationEmailAddress;
        //Launch Browser, Nav to site, Verify the homepage is visible
        //Click on Sign up/Login Button, Verify 'New User Sign up' is visible
        //Register new User
        await page.registerUser(username, newRegistrationEmailAddress);

        //Enter name and already registered email address, click 'Signup' button,

        const signupLoginBtn = await $(page.signupLoginBtn);
        await signupLoginBtn.click();
        const logoutBtn = await $(page.logoutBtn);
        await logoutBtn.click();

        const registerNameField = await $(page.registerNameField);
        const registerEmailField = await $(page.registerEmailField);
        const signUpBtn = await $(page.signupBtn);

        await registerNameField.setValue(username);
        await registerEmailField.setValue(newRegistrationEmailAddress);
        await signUpBtn.click();

        //Verify error 'Email Address already Exist!' is visible.

        const registerError = await $(page.registerError);

        await registerError.waitForDisplayed();
        await expect(registerError).toBeDisplayed();
        await expect(registerError).toHaveText("Email Address already exist!");
    });
});

describe("Text Case 6", () => {
    it("Contact Us Form", async () => {
        //Launch Browser, Nav to url, verify page is visible
        await browser.url("/");
        const browserUrl = page.browserUrl;
        await expect(browser).toHaveUrl(browserUrl);
        //Click contact us button and verify 'GET IN TOUCH' is visible.
        const contactUsBtn = await $(page.contactUsBtn);
        await contactUsBtn.click();
        const contactUsTitle = await $(page.contactFormTitle);
        await expect(contactUsTitle).toHaveText("GET IN TOUCH");
        //Enter name, email, subject and message,
        const contactUsNameField = await $(page.contactUsNameField);
        const contactUsEmailField = await $(page.contactUsEmailField);
        const contactUsSubjectField = await $(page.contactUsSubjectField);
        const contactUsMessageField = await $(page.contactUsMessageField);
        await contactUsNameField.setValue(page.username);
        await contactUsEmailField.setValue(page.validEmailAddress);
        await contactUsSubjectField.setValue("Test Message");
        await contactUsMessageField.setValue("Hellooo this is a message Hooray!");

        await browser.pause(2000);

        //Upload file and click submit button,

        const contactUsUploadFileBtn = await $(page.contactUsUploadFileBtn);
        const contactUsSubmitBtn = await $(page.contactUsSubmitBtn);
        const filepath = path.join(__dirname, "../Images/wdiorobot.jpg");
        const remoteFilePath = await browser.uploadFile(filepath);

        await contactUsUploadFileBtn.setValue(remoteFilePath);
        await browser.pause(2000);
        await contactUsSubmitBtn.click();

        //Click Ok AlertButton

        //*!Dialog Browser Listener

        await browser.on("dialog", async (dialog) => {
            console.log(dialog.message());
            await browser.pause(2000);
            await dialog.accept(); //Accept Dialog OK
        });

        const alertText = await browser.getAlertText();
        console.log(alertText);

        // await browser.acceptAlert();

        //verify success message'Success! Your details have been submitted successfully.' is visible,
        await browser.pause(5000);
        const successMessage = $(".status.alert-success");
        await successMessage.waitForDisplayed();
        await expect(successMessage).toBeDisplayed();
        await expect(successMessage).toHaveText("Success! Your details have been submitted successfully.");

        //Click 'Home' button and verify that landed to homepage successfully.
        const homeBtn = await $(page.homeBtn);
        await homeBtn.click();
        await expect(browser).toHaveUrl(browserUrl);
    });
});

describe("Text Case 7", () => {
    it("Verify Test Cases Page", async () => {
        const browserUrl = page.browserUrl;
        //Launch Browser, Nav to url, verify page is visible
        await browser.url("/");
        await expect(browser).toHaveUrl(browserUrl);

        //Click on 'Test Cases' button and verify user is navigated to test cases page successfully
        const testCasesBtn = await $(page.testCasesBtn);
        await testCasesBtn.click();
        await expect(browser).toHaveUrl("https://www.automationexercise.com/test_cases");
    });
});

describe.only("Text Case 8", () => {
    it("Verify All Products and product detail page", async () => {
        //Launch Browser, Nav to url, verify page is visible
        const browserUrl = page.browserUrl;
        await browser.url("/");
        await expect(browser).toHaveUrl(browserUrl);
        // Click on 'Products' button
        const productsBtn = await $(page.productsBtn);
        await productsBtn.click();

        // Verify user is navigated to "ALL PRODUCTS" page successfully and the products list is visible
        const allProductsTitle = await $(page.allProductsTitle);
        const productsList = await $(page.productsList);
        await expect(allProductsTitle).toHaveText("ALL PRODUCTS");
        await expect(productsList).toBeDisplayed();
        //Click on 'View Product' of first product,
        const viewFirstProduct = await $('//a[@href="/product_details/1"]');

        await viewFirstProduct.click();

        //User is landed to product page and verify that detail detail is visible: product name, category, price, availability, condition, brand
        await expect(browser).toHaveUrl(browserUrl + "product_details/1");
        const productInfo = await $(".product-information");
        await expect(productInfo).toBeDisplayed();
    });
});
describe("Text Case 9", () => {
    it("Search Product", async () => {
        //Launch Browser, Nav to url, verify page is visible
        //Click on 'Products' button and verify user is navigated to 'All Products page successfully
        //Enter product name in search input and click search button,
        //Verify 'Searched Products' is visible;
        //Verify all the products related to search are visible
    });
});

describe("Text Case 10", () => {
    it("Verify Subscription in home page", async () => {
        //Launch Browser, Nav to url, verify page is visible
        // Scroll down to footer,
        //Verify text 'SUBSCRIPTION'
        //Enter email address in input and click arrow button,
        //Verify success message ' You have been successfully subscribed!' is visible
    });
});
