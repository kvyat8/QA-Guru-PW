import { test, expect } from '@playwright/test';
import { MainPage } from '../pages/index';
import { Header } from '../pages/index';
import { RegistrationPage } from '../pages/index';
import { UserBuilder } from  '../helpers/builder';
import { SettingsPage } from '../pages/settings.page';


test.use({
  viewport: {
    height: 600,
    width: 1800
  }
});


const url = 'https://realworld.qa.guru/'

test.describe('Процесс регистрации', () => {

test('Регистрация', async ({ page }) => {

  const mainPage = new MainPage(page);
  const header = new Header(page);
  const registrationPage = new RegistrationPage(page);
  const newUser = new UserBuilder().addName().addEmail().addPassword().generate();

  await mainPage.open(url);
  await header.goToRegister();
  await registrationPage.registration (newUser.userName, newUser.userEmail, newUser.userPassword);
  await expect(page.getByText(newUser.userName)).toBeVisible();
});
});

test.describe('Работа с профилем', () => {

  test('Изменение настроек профиля', async ({ page }) => {

    const mainPage = new MainPage(page);
    const header = new Header(page);
    const registrationPage = new RegistrationPage(page);
    const settingsPage = new SettingsPage(page);
    let newUser = new UserBuilder().addName().addEmail().addPassword().addBio().generate();

    await mainPage.open(url);
    await header.goToRegister();
    await registrationPage.registration (newUser.userName, newUser.userEmail, newUser.userPassword);

    newUser = new UserBuilder().addName().addEmail().addBio().generate();
    await header.openSettings();
    await settingsPage.updateProfile(newUser.userName, newUser.userBio, newUser.userEmail)


    await expect(page.getByPlaceholder('Your Name')).toHaveValue(newUser.userName);
    await expect(page.getByPlaceholder('Short bio about you')).toHaveValue(newUser.userBio);

    

    await page.reload();
    // await header.openProfile();
    // await expect(page.locator('h4')).toContainText(newUser.userName);
    // await expect(page.getByRole('main')).toContainText(newUser.userBio);



});
});