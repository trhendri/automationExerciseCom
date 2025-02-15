const { expect, browser } = require("@wdio/globals");

const page = require("../pageobjects/page");
import path from "node:path";
//import { browser, $, $$, expect } from '@wdio/globals'; 

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
        await page.startUpPage();
        //Click on Sign up/Login Button, Verify 'New User Sign up' is visible
        const signupLoginBtn = $(page.signupLoginBtn);
        const newUserSignUpText = $(page.newUserSignUpText);
        const loginText = $(page.loginText);

        await signupLoginBtn.click();
        await expect(newUserSignUpText).toBeDisplayed();
        await expect(loginText).toBeDisplayed();
        await expect(newUserSignUpText).toHaveText("New User Signup!");
        //Register new User
        const registerNameField = await $(page.registerNameField);
        const registerEmailField = await $(page.registerEmailField);
        const signupBtn = await $(page.signupBtn);
        // const registerTitle = await $$(this.registerTitle); // $$(".login-form h2")[0];
        await registerNameField.setValue(page.username);
        const validEmailAddress = 'emailemaiadf0jdjdjd@gmail.com'
        await registerEmailField.setValue(validEmailAddress);
        await signupBtn.click();

        await page.registerUser();
        await page.clickCreateAccount();
        await page.confirmAccountCreated();

        //Enter name and already registered email address, click 'Signup' button,

        await signupLoginBtn.click();
        const logoutBtn = await $(page.logoutBtn);
        await logoutBtn.click();

        await registerNameField.setValue(username);
        await registerEmailField.setValue(newRegistrationEmailAddress);
        await signupBtn.click();

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

describe("Text Case 8", () => {
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
xdescribe("Text Case 9", () => {
    it("Search Product", async () => {
        //Launch Browser, Nav to url, verify page is visible
        await page.startUpPage();
        //Click on 'Products' button and verify user is navigated to 'All Products page successfully
        const productsBtn = await $(page.productsBtn);
        await productsBtn.click();
        const allProductsTitle = await $(page.allProductsTitle);
        const productsList = await $(page.productsList);
        await expect(allProductsTitle).toHaveText("ALL PRODUCTS");
        await expect(productsList).toBeDisplayed();
        //Enter product name in search input and click search button,

        const productsSearchInput = await $(page.productsSearchInput);
        const productsSearchButton = await $(page.productsSearchButton);
        await productsSearchInput.setValue("shirt");
        const searchTerm = await productsSearchInput.getValue();
        console.log(searchTerm);
        await productsSearchButton.click();

        //Verify 'Searched Products' is visible;
        const searchedProductsTitle = await $(page.searchedProductsTitle);
        await expect(searchedProductsTitle).toHaveText("SEARCHED PRODUCTS");

        //Verify all the products related to search are visible
        const displayedProducts = await $$(page.displayedProducts);

        //toHaveText(expect.stringContaining('test framework for Node.js'))

        /*
        for (const product of displayedProducts) {
           // console.log(displayedProductsItemName);
         
           // await expect(displayedProductsItemName).toHaveText(await expect.stringContaining(searchTerm));
           await expect(displayedProductsItemName).toHaveText(new RegExp(searchTerm));
        }
           */
        //*! Figure out this For Of Loop. Its iterating over the same item but needs to cycle through all.
        //*!Consider using
        for (const product of displayedProducts) {
            // Find the product name inside the product container
            const displayedProductsItemName = await product.$(page.displayedProductsItemName);

            if (!searchTerm) {
                console.log("No product name found for this product.");
                continue; // Skip to the next product if no name is found
            }

            // Get the text of the product name
            const productText = await displayedProductsItemName.getText();
            console.log(productText);

            // Check if the product text contains the search term
            await expect(productText).toMatch(new RegExp(searchTerm));
        }
    });
});

describe("Text Case 10", () => {
    it("Verify Subscription in home page", async () => {
        //Launch Browser, Nav to url, verify page is visible
        await page.startUpPage();
        // Scroll down to footer,
        const footer = await $(page.footer);
        await footer.scrollIntoView();
        //Verify text 'SUBSCRIPTION'

        const subscriptionText = await $(page.subscriptionText);
        await expect(subscriptionText).toHaveText("SUBSCRIPTION");

        //Enter email address in input and click arrow button,
        //Verify success message ' You have been successfully subscribed!' is visible

        const footerSubscribeEmailInput = await $(page.footerSubscribeEmailField);
        const validEmailAddress = page.validEmailAddress;
        const footerSubscribeSubmitBtn = await $(page.footerSubscribeSubmitBtn);

        await footerSubscribeEmailInput.setValue(validEmailAddress);
        await footerSubscribeSubmitBtn.click();

        const footerSubscribeSuccess = await $(page.footerSubscribeSuccess);
        await footerSubscribeSuccess.waitForDisplayed();

        await expect(footerSubscribeSuccess).toBeDisplayed();
        console.log(await footerSubscribeSuccess.getText());

        await expect(footerSubscribeSuccess).toHaveText("You have been successfully subscribed!");
    });
});

//*TODO: Start Checking if tests work here and below. Also Check variables
describe("Test Case 11", () => {
    it("Verify Subscription in Cart page", async () => {
        //Launch Browser, Nav to url, verify page is visible
        await page.startUpPage();
        //Click 'Cart' button, Scroll down to footer, Verify text "Subscription"
        const cartBtn = await $(page.cartBtn);
        await cartBtn.click();
        const footer = await $(page.footer);
        const subscriptionText = await $(page.subscriptionText);
        await footer.scrollIntoView();
        await expect(subscriptionText).toBeDisplayed();
        await expect(subscriptionText).toHaveText("SUBSCRIPTION");
        console.log(subscriptionText);

        //Enter email address in input and click arrow button.

        const footerSubscribeEmailField = await $(page.footerSubscribeEmailField);
        const footerSubscribeSubmitBtn = await $(page.footerSubscribeSubmitBtn);
        await footerSubscribeEmailField.setValue(page.validEmailAddress);
        await footerSubscribeSubmitBtn.click();
        //Verify success message 'You have been successfully subscribed!' is visible
        const footerSubscribeSuccess = await $(page.footerSubscribeSuccess);
        await footerSubscribeSuccess.waitForDisplayed();

        await expect(footerSubscribeSuccess).toBeDisplayed();
        console.log(await footerSubscribeSuccess.getText());

        await expect(footerSubscribeSuccess).toHaveText("You have been successfully subscribed!");
    });
});

describe("Test Case 12", () => {
    it("Add Products in Cart", async () => {
        //Launch browser, nav to url, verify page is visible
        await page.startUpPage();

        //click 'Products' button, Hover over first product and click 'Add to cart',
        const productsAdded = [];
        const itemPrices = [];
        const itemQuantities = [];

        const productsButton = await $(page.productsBtn);
        await productsButton.click();

        const firstProduct = await $('.product-image-wrapper');
        const firstProductName = await firstProduct.$('.productinfo p').getText();
        const firstItemPrice = await firstProduct.$('.productinfo h2').getText();

        console.log(firstItemPrice);
        productsAdded.push(firstProductName);
        console.log('pushed first product to array')
        await firstProduct.scrollIntoView();
        await firstProduct.moveTo();
        await firstProduct.$$('a.add-to-cart')[1].click();


        console.log('clicked add to cart for first product')
        const addToCartModal = await $('.modal-content');
        await addToCartModal.waitForDisplayed();



        // Click 'Continue Shopping' button, Hover over second product and click 'Add to cart',
        const continueShoppingButton = await $(page.continueShoppingBtn);
        await continueShoppingButton.click();


        const secondProduct = await $$('.product-image-wrapper')[1];
        console.log('secondProduct declared')
        const secondProductName = await secondProduct.$('.productinfo p').getText();
        const secondProductPrice = await secondProduct.$('.productinfo h2').getText();

        
        productsAdded.push(secondProductName);
        console.log(productsAdded);
        await secondProduct.moveTo();
        await secondProduct.$$('a.add-to-cart')[1].click();

        console.log('clicked second products add to cart button');
        await addToCartModal.waitForDisplayed();


        //*TODO: Make sure to pull variables about each item being added to cart to cross reference when its in the cart

        //Click 'View Cart' button, Verify both products are added to Cart
        const viewCartButton = await $('.modal-content').$('a');
        await viewCartButton.click();
        const cartItemsPage = await $('#cart_items').getText();
        console.log(cartItemsPage);

        for (const name of productsAdded) {
            await expect(cartItemsPage).toContain(name);
        }

//! REDO this part

        //Verify their prices, quantity and total price
        const firstProductPriceSlice = await firstItemPrice.slice(4);
        console.log(firstProductPriceSlice);
        itemPrices.push(firstProductPriceSlice);
        const secondProductPriceSlice = await secondProductPrice.slice(4);
        console.log(secondProductPriceSlice);
        itemPrices.push(secondProductPriceSlice);
        console.log(itemPrices);

        let index = 0;

        for (const itemPrice of itemPrices) {
            const cartRows = await $$('tbody tr');
            const cartRow = cartRows[index];
            const rowText = await cartRow.getText();
        
            await expect(rowText).toContain(itemPrice);
           

        }

        const firstProductQuantity = await $$('#quantity')[0].getText();
        const secondProductQuantity = await $$('#quantity')[1].getText();

        const totalPriceOfEachItem = await $$('.cart_total');
        await expect(firstProductPriceSlice * firstProductQuantity).toEqual(totalPriceOfEachItem[0]);
        await expect(secondProductPriceSlice * secondProductQuantity).toEqual(totalPriceOfEachItem[1]);





    });
});

//! Push this one.

describe("Test Case 13", () => {
    it("Verify product quantity in Cart", async () => {
        //Launch browser, nav to url , verify home page is visible
        await page.startUpPage();


        //Click 'View Product' for any product on home page, verify product detail is opened
        const viewProductButton = await $(page.viewProductButton);
        const productInfo = await $('.productinfo p').getText();
        console.log(productInfo);
        await viewProductButton.click();
        const productInformationPage = await $('.product-information').getText();
        console.log(productInformationPage);
        await expect(productInformationPage).toContain(productInfo);




        //Increase quantity to 4, Click 'Add to cart' button, click 'View cart ' button,
        //Verify that product is displayed in cart page with exact quantity
        const productQuantity = await $('#quantity');
        await productQuantity.setValue('3');
        const confirmQuantity = await productQuantity.getValue();
        const addToCartButton = await $('button=Add to cart');
        await addToCartButton.click();
        const viewCart = await $('.modal-content').$('a');
        await viewCart.click();
        const cartInfo = await $('#cart_info').getText();
        await expect(cartInfo).toContain(productInfo);
        const cartQuantity = await $('.cart_quantity').getText();
        await expect(cartQuantity).toEqual(confirmQuantity);



    });
});

describe("Test Case 14", () => {
    it("Place Order: Register while Checkout", async () => {
        //Launch browser, nav to url, verify homepage is visible
        await page.startUpPage();
        //Add products to cart, click 'Cart' button, Verify that cart page is displayed
        //Click Proceed to Checkout, click 'Register/Login' button,
        //Fill all details in signup and create account, Verify 'ACCOUNT CREATED'
        //Click 'Continue' button, Verify 'Logged in as username' at top
        //Click 'Cart' button, Click 'Proceed to Checkout' button, Verify Address Details and Review Your Order
        //Enter description in comment text area and click 'Place Order',
        //Enter payment details: Name on Card, Card number, CVC, Expiration date,
        //Click 'Pay and Confirm Order' button, Verify success message 'Your order has been placed successfully!'
        //Click 'Delete Account' button, Verify 'ACCOUNT DELETED! and click ' Continue button
    });
});

describe("Test Case 15", () => {
    it("Place Order: Register before Checkout", async () => {
        // Launch browser, Navigate to url 'http://automationexercise.com', Verify that home page is visible successfully
        await page.startUpPage();
        // Click 'Signup / Login' button, Fill all details in Signup and create account, Verify 'ACCOUNT CREATED!' and click 'Continue' button
        const signupLoginButton = await $(page.signupLoginBtn)
        await signupLoginButton.click();
        const registerNameField = await $(page.registerNameField);
        const registerEmailField = await $(page.registerEmailField);

        const validEmail = 'email00000@emalll.com';
        const validPassword = page.validPassword;
        const username = page.username;

        await registerNameField.setValue(username);
        await registerEmailField.setValue(validEmail);
        const signupButton = await $(page.signupBtn);
        await signupButton.click();



        await page.registerUser();
        const registrationData = [];
        const registrationDataFields = await $$('.login-form .form-control');

        //Cycle through data and pull values, and add to array
        for (const registrationField of registrationDataFields) {

            const eachField = await registrationField.getValue();
            //Skip Email field
            if (eachField === validEmail || validPassword) { //exclude email and password fields from array
                continue; // Skip this iteration if the product should be excluded
            }

            registrationData.push(eachField);
            console.log('1');

        }

        console.log(registrationData);
        await page.clickCreateAccount();
        await page.confirmAccountCreated();


        const registrationContinueButton = await $('//a[@data-qa="continue-button"]');
        await registrationContinueButton.click();

        //Verify ' Logged in as username' at top
        const userLoggedInAs = await $('.shop-menu').getText();
        await expect(userLoggedInAs).toContain('Logged in as ' + username);
        //Add products to cart, Click 'Cart' button, Verify that cart page is displayed
        const itemNames = []
        let productName;

        const searchPageProducts = await $$('.product-image-wrapper');

        //Cycle through 5 products and add to cart, add item name to array

        for (let i = 0; i < 5 && i < searchPageProducts.length; i++) {
            const eachProduct = searchPageProducts[i];
            const productImg = await eachProduct.$('.product-image-wrapper img'); //* Also remember to call each individual product in the loop on which to add the actions.
            await productImg.scrollIntoView();
            await productImg.moveTo();
            //await browser.pause(1000);

            const addToCartButton = await eachProduct.$$('a.add-to-cart')[1]; //* Remember to double check if there are multiples of the elements and or try an array.
            await addToCartButton.waitForClickable();
            await addToCartButton.click();
            const addedToCartModal = await $('.modal-content');
            await addedToCartModal.waitForDisplayed({ timeout: 12000 });
            const continueShoppingButton = await $('button=Continue Shopping');
            await continueShoppingButton.waitForClickable();
            await continueShoppingButton.click();
            productName = await eachProduct.$('.productinfo p').getText();




            itemNames.push(productName);
        }
        console.log(itemNames);

        const cartButton = await $(page.cartBtn);
        await cartButton.click();
        const breadcrumb = await $('.breadcrumbs');
        await expect(breadcrumb).toHaveText(expect.stringContaining('Shopping Cart'));


        //Click Proceed To Checkout, Verify Address Details and Review Your Order
        const proceedToCheckoutButton = await $('#do_action .check_out');
        await proceedToCheckoutButton.click();

        //cycle through and compare item names to check out page items

        const cartItems = await $('#cart_items').getText();
        for (const name of itemNames) {//* here we can loop through each item in our itemNames array and compare it with the cartItems Text to confirm if it exists in the cart.
            await expect(cartItems).toContain(name);
        }
        const checkoutAddressDetails = await $('#cart_items .container').getText();

        //cycle through and compare registration field data to checkout address and billing page
        for (const dataItem of registrationData) {
            await expect(checkoutAddressDetails).toContain(dataItem);
        }

        console.log('Finished Final Loop');


        //Enter description in comment text area and click 'Place Order',
        const commentBox = await $('//textarea[@name="message"]');
        await commentBox.scrollIntoView();
        await commentBox.setValue('This is a comment in the comment box about my order');
        const placeOrderButton = await $('.check_out.btn');
        await placeOrderButton.click();

        //Enter payment details: Name on Card, Card Number, CVC, Expiration date,
        const nameOnCardField = await $('//input[@data-qa="name-on-card"]');
        const cardNumberField = await $('//input[@data-qa="card-number"]');
        const cvcField = await $('//input[@data-qa="cvc"]');
        const expirationMonthField = await $('//input[@data-qa="expiry-month"]');
        const expirationYearField = await $('//input[@data-qa="expiry-year"]');

        const fakeCreditCard = {
            name: page.username,
            cardNumber: '5383191275681644',
            cvc: '123',
            expirationMonth: '12',
            expirationYear: '3009'


        }

        await nameOnCardField.setValue(fakeCreditCard.name);
        await cardNumberField.setValue(fakeCreditCard.cardNumber);
        await cvcField.setValue(fakeCreditCard.cvc);
        await expirationMonthField.setValue(fakeCreditCard.expirationMonth);
        await expirationYearField.setValue(fakeCreditCard.expirationYear);

        //Click 'Pay and Confirm Order' button, Verify success message 'Your order has been placed successfully!'
        const payAndConfirmOrderButton = await $('button=Pay and Confirm Order');
        await payAndConfirmOrderButton.click();
        const orderPlacedMessage = 'Your order has been placed successfully!';
        const orderPlacedMessage2 = 'Congratulations! Your order has been confirmed!';
        const orderPlacedConfirmed = await $('#form p').getText();


        await expect(orderPlacedConfirmed).toContain(orderPlacedMessage2);
        //Click 'Delete Account' button, Verify 'ACCOUNT DELETED!' and click 'Continue' button
        const deleteAccountButton = await $(page.deleteAccountBtn);
        await deleteAccountButton.click();
        const accountDeletedText = 'ACCOUNT DELETED!'
        const accountDeletedSection = await $('.title').getText();
        await expect(accountDeletedSection).toContain(accountDeletedText);
        const deletedContinueButton = await $('a[data-qa="continue-button"]');
        await deletedContinueButton.click();
    });
});

describe("Test Case 16", () => {
    it("Place Order: Login before Checkout", async () => {
        //1. Launch browser, Navigate to url 'http://automationexercise.com', Verify that home page is visible successfully
        await page.startUpPage();
        //Click 'Signup / Login' button,  Fill email, password and click 'Login' button, Verify 'Logged in as username' at top
        //Add products to cart, Click 'Cart' button, Verify that cart page is displayed
        //Click Proceed To Checkout, Verify Address Details and Review Your Order
        // Enter description in comment text area and click 'Place Order', Enter payment details: Name on Card, Card Number, CVC, Expiration date,
        // Click 'Pay and Confirm Order' button, Verify success message 'Your order has been placed successfully!'
        //Click 'Delete Account' button, Verify 'ACCOUNT DELETED!' and click 'Continue' button
    });
});
describe("Test Case 17", () => {
    it("Remove Products From Cart", async () => {
        //Launch browser, Navigate to url 'http://automationexercise.com', Verify that home page is visible successfully
        await page.startUpPage();
        //  Add products to cart, Click 'Cart' button, Verify that cart page is displayed
        //Click 'X' button corresponding to particular product, Verify that product is removed from the cart
    });
});

describe("Test Case 18", () => {
    it("View Category Products", async () => {
        //Launch Browser, Nav to url, verify that categories are visible on the left side bar
        await page.startUpPage();
        const categories = await $(".category-products").getText();
        console.log(categories);

        await expect(categories.toLowerCase()).toContain("women", "men", "kids");

        //Click on 'Women' category
        const womenCategory = await $('//a[@href="#Women"]');
        await womenCategory.click();
        //Click on any category link under 'Women' category, for example: Dress
        const dressCategory = await $("//a[@href and contains(text(), 'Dress')]");
        await dressCategory.click();

        //Verify that category page is displayed and confirm text 'WOMEN - TOPS PRODUCTS'
        const dressTitle = await $(".title").getText();
        console.log(dressTitle);
        await expect(dressTitle.toLowerCase()).toContain("women - dress products");
        //On left side bar, click on any sub-category link of 'Men' Category

        const menCategory = await $('//a[@href="#Men"]');
        await menCategory.click();
        const jeansCategory = await $('//a[@href and contains(text(), "Jeans")]');
        await jeansCategory.click();

        //Verify that user is navigated to that category page
        const jeansTitle = await $(".title").getText();
        console.log(jeansTitle);
        await expect(jeansTitle.toLowerCase()).toContain("men - jeans products");
    });
});

describe("Test Case 19", () => {
    it("View & Cart Brand Products", async () => {
        //Launch browser, Navigate to url 'http://automationexercise.com', Click on 'Products' button, Verify that Brands are visible on left side bar
        await page.startUpPage();
        const productsButton = await $(page.productsBtn);
        await productsButton.click();
        const brandsTitle = await $('//h2[contains(text(), "Brands")]');
        console.log(await brandsTitle.getText());
        await expect(brandsTitle).toBeDisplayed();
        //Click on any brand name, Verify that user is navigated to brand page and brand products are displayed
        const poloBrand = await $('//a[@href="/brand_products/Polo"]');
        await poloBrand.click();
        const poloBrandTitle = await $(".title").getText();
        console.log(poloBrandTitle);
        await expect(poloBrandTitle.toLowerCase()).toContain("brand - polo products");
        //On left side bar, click on any other brand link
        const madameBrand = await $('//a[@href="/brand_products/Madame"]');
        await madameBrand.click();
        //Verify that user is navigated to that brand page and can see products
        const madameBrandTitle = await $(".title").getText();
        console.log(madameBrandTitle);
        await expect(madameBrandTitle.toLowerCase()).toContain("brand - madame products");
    });
});

//! BEST ONE SO FAR
//BEST ONE SO FAR

describe("Test Case 20", () => {
    it("Search Products and Verify Cart After Login", async () => {
        // Launch browser, Navigate to url 'http://automationexercise.com, Click on 'Products' button,

        await page.startUpPage();
        const productsButton = await $(page.productsBtn);
        await productsButton.click();



        //Verify user is navigated to ALL PRODUCTS page successfully
        const productsText = 'ALL PRODUCTS';
        const productsSection = $('.features_items');
        await expect(productsSection).toHaveText(expect.stringContaining(productsText));
        // Enter product name in search input and click search button, Verify 'SEARCHED PRODUCTS' is visible
        const searchField = await $(page.productsSearchInput);
        const searchButton = await $(page.productsSearchButton);
        await searchField.click();
        await searchField.setValue('Dress');
        await searchButton.click();
        const searchedProductsText = 'SEARCHED PRODUCTS';
        const searchProductsSection = $('.features_items');
        await expect(searchProductsSection).toHaveText(expect.stringContaining(searchedProductsText));

        // Verify all the products related to search are visible
        const productsPageUrl = await browser.getUrl();
        const urlSearchTerm = /.*search=Dress/;
        console.log(productsPageUrl);
        console.log(urlSearchTerm);
        await expect(productsPageUrl).toMatch(urlSearchTerm);


        const itemNames = [];
        // Add those products to cart, Click 'Cart' button and verify that products are visible in cart,
        //! Working Loop!
        const searchPageProducts = await $$('.product-image-wrapper');
        for (const eachProduct of searchPageProducts) {
            const productImg = await eachProduct.$('.product-image-wrapper img'); //* Also remember to call each individual product in the loop on which to add the actions.
            await productImg.scrollIntoView();
            await productImg.moveTo();
            await browser.pause(1000);
            // const overlay = await eachProduct.$('.product-image-wrapper .product-overlay');
            const addToCartButton = await eachProduct.$$('a.add-to-cart')[1]; //* Remember to double check if there are multiples of the elements and or try an array.
            await addToCartButton.click();
            const addedToCartModal = await $('.modal-content');
            await addedToCartModal.waitForDisplayed({ timeout: 12000 });
            const continueShoppingButton = await $('button=Continue Shopping');
            await continueShoppingButton.waitForClickable();
            await continueShoppingButton.click();
            const productName = await eachProduct.$('.productinfo p').getText();

            itemNames.push(productName);
            console.log(itemNames);


        }

        const cartButton = await $(page.cartBtn);
        await cartButton.click();
        const cartItems = await $('#cart_info_table').getText();

        for (const name of itemNames) {//* here we can loop through each item in our itemNames array and compare it with the cartItems Text to confirm if it exists in the cart.
            await expect(cartItems).toContain(name);
        }


        // Click 'Signup / Login' button and submit login details, Again, go to Cart page
        const signupLoginButton = await $(page.signupLoginBtn);
        await signupLoginButton.click();
        const loginEmailField = await $(page.loginEmailField);
        const loginPasswordField = await $(page.loginPasswordField);
        const validEmail = page.validEmailAddress;
        const validPassword = page.validPassword;
        const loginButton = await $(page.loginBtn);

        await loginEmailField.setValue(validEmail);
        await loginPasswordField.setValue(validPassword);
        await loginButton.click();
        await cartButton.click();


        //  Verify that those products are visible in cart after login as well
        for (const name of itemNames) {//* here we can loop through each item in our itemNames array and compare it with the cartItems Text to confirm if it exists in the cart.
            await expect(cartItems).toContain(name);
        }
    });
});

describe("Test Case 21", () => {
    it("Add Review on product", async () => {
        // Launch browser, Navigate to url 'http://automationexercise.com', Click on 'Products' button,
        await page.startUpPage();
        await $(page.productsBtn).click();
        // Verify user is navigated to ALL PRODUCTS page successfully
        const productText = 'ALL PRODUCTS';
        const allProductsText = await $('.features_items');


        await expect(allProductsText).toHaveText(expect.stringContaining(productText));
        // Click on 'View Product' button, Verify 'Write Your Review' is visible
        const viewProductButton = await $(page.viewProductButton);
        await viewProductButton.click();
        const reviewText = 'WRITE YOUR REVIEW';
        const reviewTitle = await $('//a[@href="#reviews"]');
        await expect(reviewTitle).toHaveText(expect.stringContaining(reviewText));


        //Enter name, email and review,  Click 'Submit' button, Verify success message 'Thank you for your review
        const reviewNameField = await $('#name');
        const reviewEmailField = await $('#email');
        const reviewTextInputField = await $('#review');
        const submitReviewButton = await $('#button-review');

        const reviewSuccessText = 'Thank you for your review';
        const reviewSuccessMessage = $('.alert-success.alert');

        await reviewNameField.setValue('Name Name');
        await reviewEmailField.setValue('TesterTestTest@email.com');
        await reviewTextInputField.setValue('This is a review. I am reviewing.');
        await submitReviewButton.click();
        await expect(reviewSuccessMessage).toHaveText(expect.stringContaining(reviewSuccessText));

    });
});

describe("Test Case 22", () => {
    it("Add to cart from Recommended items", async () => {
        // Launch browser, Navigate to url 'http://automationexercise.com', Scroll to bottom of page
        await page.startUpPage();
        const recommendedItems = $('.recommended_items');
        await recommendedItems.scrollIntoView();
        const recommendedItemsText = 'RECOMMENDED ITEMS';



        // Verify 'RECOMMENDED ITEMS' are visible
        await expect(recommendedItems).toHaveText(expect.stringContaining(recommendedItemsText));
        // Click on 'Add To Cart' on Recommended product, Click on 'View Cart' button,
        const recItemsProduct = await $(`a[data-product-id="5"]`).parentElement();

        await browser.pause(3000);
        await recItemsProduct.waitForDisplayed();

        const itemName = await $('//div[@id="recommended-item-carousel"]/div/div[2]/div[2]/div/div/div/p').getText(); //#recommended-item-carousel > div > div:nth-child(2) > div:nth-child(2) > div > div > div > img
        const addToCartButton = await $$('//a[@data-product-id="5"]')[2]; //find class for that spec product
        await addToCartButton.waitForDisplayed();

        await addToCartButton.click();
        const addToCartModal = await $('.modal-content');
        await addToCartModal.waitForDisplayed();
        const modalViewCartButton = await $('.modal-content a');
        await modalViewCartButton.click();
        const cartItems = await $('#cart_info_table').getText();

        //With selector chaining, it's way easier. Simply narrow down the desired element step by step:

        // await $('.row .entry:nth-child(2)').$('button*=Add').click()



        // Verify that product is displayed in cart page
        console.log(itemName);
        await expect(cartItems).toContain(itemName);

    });
});

describe("Test Case 23", () => {
    it("Verify address details in checkout page", async () => {
        //     Launch browser, Navigate to url 'http://automationexercise.com', Verify that home page is visible successfully
        //     Click 'Signup / Login' button, Fill all details in Signup and create account,
        //       Verify 'ACCOUNT CREATED!' and click 'Continue' button
        //     Verify ' Logged in as username' at top
        //     Add products to cart, Click 'Cart' button, Verify that cart page is displayed
        //     Click Proceed To Checkout,
        //     Verify that the delivery address is same address filled at the time registration of account
        //     Verify that the billing address is same address filled at the time registration of account
        //     Click 'Delete Account' button, Verify 'ACCOUNT DELETED!' and click 'Continue' button
    });
});

describe("Test Case 24", () => {
    it("Download Invoice after purchase order", async () => {
        // Launch browser, Navigate to url 'http://automationexercise.com', Verify that home page is visible successfully
        //     Add products to cart, Click 'Cart' button, Verify that cart page is displayed
        //      Click Proceed To Checkout, Click 'Register / Login' button,
        //     Fill all details in Signup and create account,
        //     Verify 'ACCOUNT CREATED!' and click 'Continue' button
        //     Verify ' Logged in as username' at top, Click 'Cart' button, Click 'Proceed To Checkout' button,
        //     Verify Address Details and Review Your Order,
        //     Enter description in comment text area and click 'Place Order',
        //     Enter payment details: Name on Card, Card Number, CVC, Expiration date,
        //     Click 'Pay and Confirm Order' button,
        //     Verify success message 'Your order has been placed successfully!'
        //     Click 'Download Invoice' button and verify invoice is downloaded successfully.,
        //     Click 'Continue' button, Click 'Delete Account' button,
        //     Verify 'ACCOUNT DELETED!' and click 'Continue' button
    });
});

describe("Test Case 25", () => {
    it('Verify Scroll Up using "Arrow" button and Scroll Down functionality', async () => {
        // Launch browser, Navigate to url 'http://automationexercise.com', Verify that home page is visible successfully
        // Scroll down page to bottom, Verify 'SUBSCRIPTION' is visible
        // Click on arrow at bottom right side to move upward,
        // Verify that page is scrolled up and 'Full-Fledged practice website for Automation Engineers' text is visible on screen
    });
});

describe("Test Case 26", () => {
    it('Verify Scroll Up without "Arrow" button and Scroll Down functionality', async () => {
        // Launch browser, Navigate to url 'http://automationexercise.com', Verify that home page is visible successfully
        // Scroll down page to bottom, Verify 'SUBSCRIPTION' is visible
        // Scroll up page to top,
        //Verify that page is scrolled up and 'Full-Fledged practice website for Automation Engineers' text is visible on screen
    });
});
