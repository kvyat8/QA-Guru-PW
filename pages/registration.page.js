import { BasePage } from "./base.page";

export class RegistrationPage extends BasePage {

    constructor (page) {
        super (page),
        this.nameField = this.page.getByPlaceholder('Your Name'),
        this.emailField = this.page.getByPlaceholder('Email'),
        this.passwordField = this.page.getByPlaceholder('Password'),
        this.signUpButton = this.page.getByRole('button', { name: 'Sign up' })
    }

    async registration (name, email, password) {
        await this.nameField.click();
        await this.nameField.fill(name);
        await this.emailField.click();
        await this.emailField.fill(email);
        await this.passwordField.click();
        await this.passwordField.fill(password);
        await this.signUpButton.click();
    }
}