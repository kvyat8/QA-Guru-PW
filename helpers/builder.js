import { faker } from '@faker-js/faker';

export class UserBuilder {
    addBio() {
        this.userBio = faker.animal.cat();
        return this;
    }

    addEmail() {
        this.userEmail = faker.internet.email();
        return this;
    }
    addName() {
        this.userName = faker.person.firstName('male');
        return this;
    }
    addPassword() {
        this.userPassword = faker.internet.password();
        return this;
    }
    addFailPassword() {
        this.userPassword = faker.internet.password({ length: 3 });
        return this;
    }
    generate() {
        const copied = structuredClone (
            {
                userEmail: this.userEmail,
                userName: this.userName,
                userPassword: this.userPassword,
                userFailPassword: this.userPassword,
                userBio: this.userBio
            }
        );
        return copied;
    }
}


export class ArticleBuilder {
    addTitle() {
        this.title = faker.lorem.sentence({ min: 3, max: 5 });
        return this;
    }

    addDescription() {
        this.description = faker.lorem.sentence({ min: 3, max: 5 });
        return this;
    }
    addText() {
        this.text = faker.lorem.lines({ min: 3, max: 6 });
        return this;
    }
    addTags() {
        this.tags = `${faker.word.sample()},${faker.word.sample()},${faker.word.sample()}`;
        return this;
    }

    addComment() {
        this.comment = faker.lorem.lines({ min: 3, max: 6 });
        return this;
    }

    generate() {
        const copied = structuredClone (
            {
                title: this.title,
                description: this.description,
                text: this.text,
                tags: this.tags,
                comment: this.comment
            }
        );
        return copied;
    }
}