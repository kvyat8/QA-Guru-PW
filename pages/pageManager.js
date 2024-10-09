import {EditorPage} from "./editor.page";
import {LoginPage} from "./login.page";
import {ArticlePage} from "./article.page";
import {Header} from "./header";
import {RegistrationPage} from "./registration.page";
import {SettingsPage} from "./settings.page";
import {MainPage} from "./main.page";


export class PageManager {

    constructor(page){
        this.page = page;
        this.mainPage = new MainPage(page);
        this.articlePage = new ArticlePage(page);
        this.loginPage = new LoginPage(page);
        this.editorPage = new EditorPage(page);
        this.registrationPage = new RegistrationPage(page);
        this.settingsPage = new SettingsPage(page);
        this.header = new Header(page);
    }
}