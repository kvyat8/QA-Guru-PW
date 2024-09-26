import { BasePage } from "./base.page";

export class LoginPage extends BasePage {

    constructor (page) {
        super (page),
        this.emailField = this.page.getByPlaceholder('Email'),
        this.passwordField = this.page.getByPlaceholder('Password'),
        this.signInButton = this.page.getByRole('button', { name: 'Login' })
    }

    async login (email, password) {
        await this.emailField.click();
        await this.emailField.fill(email);
        await this.passwordField.click();
        await this.passwordField.fill(password);
        await this.signInButton.click();
    }
}
