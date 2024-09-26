import { test, expect } from '@playwright/test';
import { MainPage } from '../pages/index';
import { Header } from '../pages/index';
import { EditorPage } from '../pages/index';
import { RegistrationPage } from '../pages/index';
import { LoginPage } from '../pages/index';
import { ArticlePage } from '../pages/index';
import { UserBuilder, ArticleBuilder } from  '../helpers/builder';


test.use({
  viewport: {
    height: 600,
    width: 1800
  }
});
const url = 'https://realworld.qa.guru/'
const newUser = new UserBuilder().addName().addEmail().addPassword().generate();

test.describe('Работа со статьями', () => {

  test.beforeEach(async ({page}) => {
    const mainPage = new MainPage(page);
    const header = new Header(page);
    const registrationPage = new RegistrationPage(page);

  
    await mainPage.open(url);
    await header.goToRegister();
    await registrationPage.registration (newUser.userName, newUser.userEmail, newUser.userPassword);
  });


test('Создание статьи', async ({ page }) => {

  const mainPage = new MainPage(page);
  const header = new Header(page);
  const loginPage = new LoginPage(page);
  const editorPage = new EditorPage(page);
  const newArticle = new ArticleBuilder().addTitle().addDescription().addText().addTags().generate();

  await mainPage.open(url);
  await header.goToLogin();
  await loginPage.login(newUser.userEmail, newUser.userPassword);
  
  await header.goToNewArticle();
  await editorPage.publishArticle (newArticle.title, newArticle.description, newArticle.text, newArticle.tags);
  await expect(page.getByRole('heading')).toContainText(newArticle.title);
  await expect(page.getByRole('main')).toContainText(newArticle.text);
});

test('Редактирование статьи', async ({ page }) => {

  const mainPage = new MainPage(page);
  const header = new Header(page);
  const loginPage = new LoginPage(page);
  const editorPage = new EditorPage(page);
  const articlePage = new ArticlePage(page);
  let newArticle = new ArticleBuilder().addTitle().addDescription().addText().addTags().generate();

  await mainPage.open(url);
  await header.goToLogin();
  await loginPage.login(newUser.userEmail, newUser.userPassword);

  await header.goToNewArticle();
  await editorPage.publishArticle (newArticle.title, newArticle.description, newArticle.text, newArticle.tags);
  
  await articlePage.goToEditArticle();

  newArticle = new ArticleBuilder().addTitle().addDescription().addText().addTags().generate();
  await editorPage.updateArticle (newArticle.title, newArticle.description, newArticle.text, newArticle.tags);
  await expect(page.getByRole('heading')).toContainText(newArticle.title);
  await expect(page.getByRole('main')).toContainText(newArticle.text);
});

test('Публиукация коммента', async ({ page }) => {

  const mainPage = new MainPage(page);
  const header = new Header(page);
  const loginPage = new LoginPage(page);
  const editorPage = new EditorPage(page);
  const newArticle = new ArticleBuilder().addTitle().addDescription().addText().addTags().addComment().generate();
  const articlePage = new ArticlePage(page);

  await mainPage.open(url);
  await header.goToLogin();
  await loginPage.login(newUser.userEmail, newUser.userPassword);
  
  await header.goToNewArticle();
  await editorPage.publishArticle (newArticle.title, newArticle.description, newArticle.text, newArticle.tags);
  await articlePage.postComment(newArticle.comment);
  await expect(page.getByRole('main')).toContainText(newArticle.comment);

});

test('Удаление статьи', async ({ page }) => {

  const mainPage = new MainPage(page);
  const header = new Header(page);
  const loginPage = new LoginPage(page);
  const editorPage = new EditorPage(page);
  const newArticle = new ArticleBuilder().addTitle().addDescription().addText().addTags().generate();
  const articlePage = new ArticlePage(page);

  await mainPage.open(url);
  await header.goToLogin();
  await loginPage.login(newUser.userEmail, newUser.userPassword);
  
  await header.goToNewArticle();
  await editorPage.publishArticle (newArticle.title, newArticle.description, newArticle.text, newArticle.tags);

  await page.on('dialog', dialog => dialog.accept());
  await articlePage.deleteArticle();
  await expect(page.getByRole('main')).toContainText('Articles not available.');
});

test('Нельзя создать статью с таким-же заголовком', async ({ page }) => {

  const mainPage = new MainPage(page);
  const header = new Header(page);
  const loginPage = new LoginPage(page);
  const editorPage = new EditorPage(page);
  const newArticle = new ArticleBuilder().addTitle().addDescription().addText().addTags().generate();

  await mainPage.open(url);
  await header.goToLogin();
  await loginPage.login(newUser.userEmail, newUser.userPassword);
  
  await header.goToNewArticle();
  await editorPage.publishArticle (newArticle.title, newArticle.description, newArticle.text, newArticle.tags);

  await mainPage.open(url);
  await header.goToNewArticle();
  await editorPage.publishArticle (newArticle.title, newArticle.description, newArticle.text, newArticle.tags);
  await expect(page.locator('form')).toContainText('Title already exists..');

});

})