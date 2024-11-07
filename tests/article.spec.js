import { test, expect } from '@playwright/test';
import { PageManager } from '../pages/pageManager';
import { UserBuilder, ArticleBuilder } from  '../helpers/builder';



const url = 'https://realworld.qa.guru/'

test.describe('Работа со статьями', () => {

  test.beforeEach(async ({ page }) => {
    const pm = new PageManager(page);
    const newUser = new UserBuilder().addName().addEmail().addPassword().generate();

    await pm.mainPage.open(url);
    await pm.header.goToRegister();
    await pm.registrationPage.registration (newUser.userName, newUser.userEmail, newUser.userPassword);
    await expect(pm.header.headerDropDown).toContainText(newUser.userName);

  });


test('Создание статьи', async ({ page }) => {

  let pm = new PageManager(page);
  const newArticle = new ArticleBuilder().addTitle().addDescription().addText().addTags().generate();
  
  await pm.header.goToNewArticle();
  await pm.editorPage.publishArticle (newArticle.title, newArticle.description, newArticle.text, newArticle.tags);
  await expect(pm.articlePage.articleTitle).toContainText(newArticle.title);
  await expect(pm.articlePage.articleText).toContainText(newArticle.text);
});

test('Редактирование статьи', async ({ page }) => {

  let pm = new PageManager(page);
  let newArticle = new ArticleBuilder().addTitle().addDescription().addText().addTags().generate();

  await pm.header.goToNewArticle();
  await pm.editorPage.publishArticle (newArticle.title, newArticle.description, newArticle.text, newArticle.tags);
  
  await pm.articlePage.goToEditArticle();

  newArticle = new ArticleBuilder().addTitle().addDescription().addText().addTags().generate();
  await pm.editorPage.updateArticle (newArticle.title, newArticle.description, newArticle.text, newArticle.tags);
  await expect(pm.articlePage.articleTitle).toContainText(newArticle.title);
  await expect(pm.articlePage.articleText).toContainText(newArticle.text);
});

test('Публиукация коммента', async ({ page }) => {

  let pm = new PageManager(page);
  const newArticle = new ArticleBuilder().addTitle().addDescription().addText().addTags().addComment().generate();
  
  await pm.header.goToNewArticle();
  await pm.editorPage.publishArticle (newArticle.title, newArticle.description, newArticle.text, newArticle.tags);
  await pm.articlePage.postComment(newArticle.comment);
  await expect(pm.articlePage.getArticleCommentLocator(newArticle.comment)).toContainText(newArticle.comment);

});

test('Удаление статьи', async ({ page }) => {

  let pm = new PageManager(page);
  const newArticle = new ArticleBuilder().addTitle().addDescription().addText().addTags().generate();
  

  await pm.header.goToNewArticle();
  await pm.editorPage.publishArticle (newArticle.title, newArticle.description, newArticle.text, newArticle.tags);

  await pm.page.on('dialog', dialog => dialog.accept());
  await pm.articlePage.deleteArticle();

  await expect(pm.articlePage.articleNotAvailableMessage).toContainText('Articles not available.');
  await expect(pm.articlePage.articleNotAvailableMessage).toBeVisible();
});

test('Нельзя создать статью с таким-же заголовком', async ({ page }) => {

  let pm = new PageManager(page);
  const newArticle = new ArticleBuilder().addTitle().addDescription().addText().addTags().generate();
  
  await pm.header.goToNewArticle();
  await pm.editorPage.publishArticle (newArticle.title, newArticle.description, newArticle.text, newArticle.tags);

  await pm.mainPage.open(url);
  await pm.header.goToNewArticle();
  await pm.editorPage.publishArticle (newArticle.title, newArticle.description, newArticle.text, newArticle.tags);
  await expect(pm.editorPage.titleAlreadyExistMessage).toBeVisible();
  await expect(pm.editorPage.titleAlreadyExistMessage).toContainText('Title already exists..');

});

})