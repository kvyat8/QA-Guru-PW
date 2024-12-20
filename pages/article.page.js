import { BasePage } from "./base.page";


export class ArticlePage extends BasePage {

    constructor (page) {
        super (page),

        this.editArticleButton = this.page.getByRole('button', { name: 'Edit Article' }).first(),
        this.deleteArticleButton = this.page.getByRole('button', { name: 'Delete Article' }).first(),
        this.articleCommentField = this.page.getByPlaceholder('Write a comment...'),
        this.postCommentButton = this.page.getByRole('button', { name: 'Post Comment' }),
        this.articleTitle = this.page.getByRole('heading'),
        this.articleText = this.page.getByRole('main'),
        this.articleNotAvailableMessage = this.page.getByText('Articles not available.')
    }

    async goToEditArticle () {
        await this.editArticleButton.click();
    };

    async postComment (commentText) {
        await this.articleCommentField.click();
        await this.articleCommentField.fill(commentText);
        await this.postCommentButton.click();
    }

    async deleteArticle () {

        await this.deleteArticleButton.click();

    } 

    getArticleCommentLocator (commentText) {

        return this.page.getByText(commentText);

    } 

}