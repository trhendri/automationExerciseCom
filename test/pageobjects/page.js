module.exports = {
    //Register Form
    browserUrl: "https://www.automationexercise.com/",
    registerNameField: '//input[@data-qa="signup-name"]',
    registerEmailField: '//input[@data-qa="signup-email"]',
    registerError: ".signup-form p",

    signupBtn: "button=Signup",
    titleMrsRadio: '//label[@for="id_gender2"]',
    passwordField: '//input[@data-qa="password"]',

    dobDayField: '//select[@data-qa="days"]',
    dobMonthField: '//select[@data-qa="months"]',
    dobYearField: '//select[@data-qa="years"]',
    newsletterCheckbox: "#newsletter",
    specialOfferCheckbox: "#optin",
    firstNameField: "#first_name",
    lastNameField: "#last_name",
    companyField: "#company",
    address1Field: "#address1",
    address2Field: "#address2",
    countryField: "#country",
    stateField: "#state",
    cityField: "#city",
    zipcodeField: "#zipcode",
    mobileNumField: "#mobile_number",
    createAccountBtn: "button=Create Account",
    accountCreatedSuccessText: "ACCOUNT CREATED!",
    accountCreatedUrl: "https://www.automationexercise.com/account_created",
    accountCreatedSuccessMsg: '//h2[@data-qa="account-created"]',

    //Login In Form
    loginEmailField: '//input[@data-qa="login-email"]',
    loginPasswordField: '//input[@data-qa="login-password"]',
    loginBtn: "button=Login",

    loginErrorMsg: '//p[contains(text(),"Your email or password is incorrect!")]',

    signupLoginBtn: '//a[contains(text(), "Signup / Login")]',
    deleteAccountBtn: 'a[href="/delete_account"]',
    accountDeletedMsg: 'h2[data-qa="account-deleted"]',
    accountDeletedText: "ACCOUNT DELETED!",

    newUserSignUpText: ".signup-form h2",
    loginText: ".login-form h2",
    logoutBtn: '//a[@href ="/logout"]',
    //loggedInAsText2: '.shop-menu > ul> li', //[9]

   //Contact Us Page
contactUsBtn: '//a[@href="/contact_us"]',
contactFormTitle: '.contact-form h2',
 // Contact Us Form
 contactUsNameField:'//input[@name = "name"]',
 contactUsEmailField:'//input[@name = "email"]',
 contactUsSubjectField: '//input[@name = "subject"]',
 contactUsMessageField: '//textarea[@name = "message"]',
contactUsUploadFileBtn:'//input[@name = "upload_file"]',
contactUsSubmitBtn : '//input[@name = "submit"]',
homeBtn: ' .btn-success',


//Test Cases Page
testCasesBtn: '//a[@href="/test_cases"]',

//Products
productsBtn: '//a[@href="/products"]',
allProductsTitle: '.features_items>h2',
productsList: '.features_items',
productsSearchInput: '',
productsSearchButton: '',





    //Data

    validEmailAddress: "email@0kkjwo001.com",
    validPassword: "password",
    invalidEmailAddress: "invalidemail@email.com",
    invalidPassword: "1",
    username: "Jane Doe",
    newRegistrationEmailAddress: "newuser90042@email.com",

    //Functions

    goToLoginSignupPage: async function () {
        await browser.url("/");
        const browserUrl = this.browserUrl;
        const signupLoginBtn = $(this.signupLoginBtn);
        const newUserSignUpText = $(this.newUserSignUpText);
        const loginText = $(this.loginText);

        await expect(browser).toHaveUrl(browserUrl);
        await signupLoginBtn.click();
        await expect(newUserSignUpText).toBeDisplayed();
        await expect(loginText).toBeDisplayed();
    },

    loginUser: async function (email, password) {
        const loginEmailField = $(this.loginEmailField);
        const loginPasswordField = $(this.loginPasswordField);
        const loginBtn = $(this.loginBtn);

        await loginEmailField.setValue(email);
        await loginPasswordField.setValue(password);
        await loginBtn.click();
    },

    registerUser: async function (email, password) {
        await browser.url("/");
        const browserUrl = this.browserUrl;
        const signupLoginBtn = $(this.signupLoginBtn);
        const newUserSignUpText = $(this.newUserSignUpText);
        const loginText = $(this.loginText);

        await expect(browser).toHaveUrl(browserUrl);
        await signupLoginBtn.click();
        await expect(newUserSignUpText).toBeDisplayed();
        await expect(loginText).toBeDisplayed();
        await expect(newUserSignUpText).toHaveText("New User Signup!");

        const registerNameField = await $(this.registerNameField);
        const registerEmailField = await $(this.registerEmailField);
        const signupBtn = await $(this.signupBtn);
        // const registerTitle = await $$(this.registerTitle); // $$(".login-form h2")[0];
        await registerNameField.setValue(email);
        await registerEmailField.setValue(password);
        await signupBtn.click();
        //await expect(registerTitle).toHaveText("ENTER ACCOUNT INFORMATION");

        const titleMrsRadio = await $(this.titleMrsRadio);
        const passwordField = await $(this.passwordField);

        const dobDayField = await $(this.dobDayField);
        const dobMonthField = await $(this.dobMonthField);
        const dobYearField = await $(this.dobYearField);
        const newsletterCheckbox = await $(this.newsletterCheckbox);
        const specialOfferCheckbox = await $(this.specialOfferCheckbox);
        const firstNameField = await $(this.firstNameField);
        const lastNameField = await $(this.lastNameField);
        const companyField = await $(this.companyField);
        const address1Field = await $(this.address1Field);
        const address2Field = await $(this.address2Field);
        const countryField = await $(this.countryField);
        const stateField = await $(this.stateField);
        const cityField = await $(this.cityField);
        const zipcodeField = await $(this.zipcodeField);
        const mobileNumField = await $(this.mobileNumField);
        const createAccountBtn = await $(this.createAccountBtn);

        const accountCreatedSuccessText = "ACCOUNT CREATED!";
        const accountCreatedUrl = "https://www.automationexercise.com/account_created";
        const accountCreatedSuccessMsg = $(this.accountCreatedSuccessMsg);

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
        await passwordField.setValue(this.validPassword);
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
    },
};
