import { test, expect } from '@playwright/test';
import { UserBuilder } from  '../helpers/builder';
import { PageManager } from '../pages/pageManager';


const url = 'https://realworld.qa.guru/'

test.describe('Процесс регистрации', () => {

test('Регистрация', async ({ page }) => {

  let pm = new PageManager(page);
  const newUser = new UserBuilder().addName().addEmail().addPassword().generate();


  await pm.mainPage.open(url);
  await pm.header.goToRegister();
  await pm.registrationPage.registration (newUser.userName, newUser.userEmail, newUser.userPassword);
  await expect(page.getByText(newUser.userName)).toBeVisible();
});
});

test.describe('Работа с профилем', () => {

  test('Изменение настроек профиля', async ({ page }) => {

    let pm = new PageManager(page);
    let newUser = new UserBuilder().addName().addEmail().addPassword().addBio().generate();

    await pm.mainPage.open(url);
    await pm.header.goToRegister();
    await pm.registrationPage.registration (newUser.userName, newUser.userEmail, newUser.userPassword);

    newUser = new UserBuilder().addName().addEmail().addBio().generate();
    await pm.header.openSettings();
    await pm.settingsPage.updateProfile(newUser.userName, newUser.userBio, newUser.userEmail)


    await expect(page.getByPlaceholder('Your Name')).toHaveValue(newUser.userName);
    await expect(page.getByPlaceholder('Short bio about you')).toHaveValue(newUser.userBio);

});
});