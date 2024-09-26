export class EditorPage {

    constructor (page) {
        this.page = page,
        this.articleTitle = this.page.getByPlaceholder('Article Title'),
        this.articleAbout = this.page.getByPlaceholder('What\'s this article about?'),
        this.articleText = this.page.getByPlaceholder('Write your article (in'),
        this.articleTags = this.page.getByPlaceholder('Enter tags'),
        this.articlePublishButton = this.page.getByRole('button', { name: 'Publish Article' })
        this.articleUpdateButton = this.page.getByRole('button', { name: 'Update Article' })
    }

    async publishArticle (title, description, text, tags) {
        await this.articleTitle.click();
        await this.articleTitle.fill(title);

        await this.articleAbout.click();
        await this.articleAbout.fill(description);

        await this.articleText.click();
        await this.articleText.fill(text);

        await this.articleTags.click();
        await this.articleTags.fill(tags);

        await this.articlePublishButton.click();
        
    }


    async updateArticle (title, description, text, tags) {
        await this.articleTitle.click();
        await this.articleTitle.fill(title);

        await this.articleAbout.click();
        await this.articleAbout.fill(description);

        await this.articleText.click();
        await this.articleText.fill(text);

        await this.articleTags.click();
        await this.articleTags.fill(tags);

        await this.articleUpdateButton.click();
        
    }
}