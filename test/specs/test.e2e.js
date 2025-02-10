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
        await registerEmailField.setValue(page.validEmailAddress);
        await signupBtn.click();

        await page.registerUser();

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
//*!Just Start over with this later.
xdescribe("Test Case 12", () => {
    it("Add Products in Cart", async () => {
        //Launch browser, nav to url, verify page is visible
        await page.startUpPage();

        //click 'Products' button, Hover over first product and click 'Add to cart',
        const productsBtn = await $(page.productsBtn);
        await productsBtn.click();
        let products = await $$(page.products);
        const firstProduct = await products[0];
        await firstProduct.moveTo();

        await browser.pause(1000);
        const firstOverlayContent = await firstProduct.$(page.overlayContent);
        const firstAddToCartBtn = await firstOverlayContent.$(page.addToCartBtn);

        await firstAddToCartBtn.click();

        //Click 'Continue Shopping' button, Hover over second product and click 'Add to cart',
        const modalConfirm = await $(page.modalConfirm);
        await modalConfirm.waitForDisplayed();
        const continueShoppingBtn = await $(page.continueShoppingBtn);
        await browser.pause(3000);
        await continueShoppingBtn.click();

        products = await $$(page.products);

        const secondProduct = await products[1];

        await secondProduct.moveTo();

        await browser.pause(2000);
        const secondOverlayContent = await secondProduct.$(page.overlayContent);
        const secondAddToCartBtn = await secondOverlayContent.$(page.addToCartBtn);
        await secondAddToCartBtn.waitForDisplayed();
        await secondAddToCartBtn.click();

        await browser.pause(2000);

        await modalConfirm.waitForDisplayed();
        await continueShoppingBtn.click();

        //*TODO: Make sure to pull variables about each item being added to cart to cross reference when its in the cart

        //Click 'View Cart' button, Verify both products are added to Cart
        const cartBtn = await $(page.cartBtn);
        await cartBtn.click();

        //Verify their prices, quantity and total price
    });
});

//*!Just Start over with this later.

xdescribe("Test Case 13", () => {
    it("Verify product quantity in Cart", async () => {
        //Launch browser, nav to url , verify home page is visible
        await page.startUpPage();
        const products = await $$(page.products);
        const thirdProduct = await products[2];
        const viewProductButton = await $(page.viewProductButton);
        const thirdProductText = await thirdProduct.getText();
        console.log(thirdProductText);

        await viewProductButton.waitForDisplayed();
        await thirdProduct.viewProductButton.click();

        const productPageInfo = await $(page.productPageInfo).getText();
        console.log(productPageInfo);

        //Click 'View Product' for any product on home page, verify product detail is opened

        //Increase quantity to 4, Click 'Add to cart' button, click 'View cart ' button,
        //Verify that product is displayed in cart page with exact quantity
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
        //Verify ' Logged in as username' at top
        //Add products to cart, Click 'Cart' button, Verify that cart page is displayed
        //Click Proceed To Checkout, Verify Address Details and Review Your Order
        //Enter description in comment text area and click 'Place Order', Enter payment details: Name on Card, Card Number, CVC, Expiration date,
        //Click 'Pay and Confirm Order' button, Verify success message 'Your order has been placed successfully!'
        //Click 'Delete Account' button, Verify 'ACCOUNT DELETED!' and click 'Continue' button
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

describe("Test Case 20", () => {
    it("Search Products and Verify Cart After Login", async () => {
        // Launch browser, Navigate to url 'http://automationexercise.com, Click on 'Products' button,
        //Verify user is navigated to ALL PRODUCTS page successfully
        // Enter product name in search input and click search button, Verify 'SEARCHED PRODUCTS' is visible
        // Verify all the products related to search are visible
        // Add those products to cart, Click 'Cart' button and verify that products are visible in cart,
        // Click 'Signup / Login' button and submit login details, Again, go to Cart page
        //  Verify that those products are visible in cart after login as well
    });
});

describe("Test Case 21", () => {
    it("Add Review on product", async () => {
        // Launch browser, Navigate to url 'http://automationexercise.com', Click on 'Products' button,
        // Verify user is navigated to ALL PRODUCTS page successfully
        // Click on 'View Product' button, Verify 'Write Your Review' is visible
        //Enter name, email and review,  Click 'Submit' button, Verify success message 'Thank you for your review
    });
});

describe("Test Case 22", () => {
    it("Add to cart from Recommended items", async () => {
        // Launch browser, Navigate to url 'http://automationexercise.com', Scroll to bottom of page
        // Verify 'RECOMMENDED ITEMS' are visible
        // Click on 'Add To Cart' on Recommended product, Click on 'View Cart' button,
        // Verify that product is displayed in cart page
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
