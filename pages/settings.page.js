import { BasePage } from "./base.page";

export class SettingsPage extends BasePage {

    constructor (page) {
        super (page),
        this.nameField = this.page.getByPlaceholder('Your Name'),
        this.bioField = this.page.getByPlaceholder('Short bio about you'),
        this.emailField = this.page.getByPlaceholder('Email'),
        this.passwordField = this.page.getByPlaceholder('Password'),
        this.updateSettingsButton = this.page.getByRole('button', { name: 'Update Settings' })

    }

    async updateProfile (name, bio, email) {
        await this.nameField.click();
        await this.nameField.fill(name);
        await this.bioField.click();
        await this.bioField.fill(bio);
        await this.emailField.click();
        await this.emailField.fill(email);
        await this.updateSettingsButton.click();
    }
}