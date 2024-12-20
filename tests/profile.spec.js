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
  await pm.registrationPage.registration(newUser.userName, newUser.userEmail, newUser.userPassword);
  await expect(pm.header.headerDropDown).toContainText(newUser.userName);

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


    await expect(pm.settingsPage.nameField).toHaveValue(newUser.userName);
    await expect(pm.settingsPage.bioField).toHaveValue(newUser.userBio);

});
});