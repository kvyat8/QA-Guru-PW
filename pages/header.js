export class Header {

    constructor (page) {
        this.page = page,
        this.signUpButton = this.page.getByRole('link', { name: 'Sign up' }),
        this.homeButton = this.page.getByRole('link', { name: 'Home' }),
        this.loginButton = this.page.getByRole('link', { name: 'Login' })
        this.newArticleButton = this.page.getByRole('link', { name: 'New Article' });
        this.headerDropDown = this.page.locator('.dropdown-toggle');
        this.settingsButton = this.page.getByRole('link', { name: 'Settings', exact: true }),
        this.profileButton = this.page.getByRole('link', { name: 'Profile', exact: true }),
        this.profileIndicator = this.page.getByRole('navigation')
    }

    async goToRegister () {
        await this.signUpButton.click();
    }

    async goToLogin () {
        await this.loginButton.click();
    }

    async goToHome () {
        await this.homeButton.click();
    }

    async goToNewArticle () {
        await this.newArticleButton.click();
    }

    async openSettings () {
        await this.headerDropDown.click();
        await this.settingsButton.click();
    }

    async openProfile () {
        await this.headerDropDown.click();
        await this.profileButton.click();
    }
}