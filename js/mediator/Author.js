
class Author {

    constructor(author, titles, parentNode) {
        this.author = author;
        this.titles = titles;
        this.parentNode = parentNode;
        this.createAuthor();
    }

    createAuthor() {
        const postsTitlesArray = this.titles.map((title) => {
            return {
                tagName: 'li',
                classList: ['menu__item'],
                innerText: title.title.slice(0, 50) + '...',
                attributes: [
                    {
                        'data-id': title.id,
                    },
                ],
            };
        });
        const authorMenu = {
            tagName: 'li',
            classList: ['menu__category'],
        };
        const li = Post.builder(authorMenu,
            this.parentNode, null);
        this.author = Post.builder(
            {
                tagName: 'span',
                attributes: [
                    {
                        'data-value': this.author,
                    },
                ],
                classList: ['menu__button'],
                innerText: this.author,
            }, li, null);
        this.titlesWrapper = Post.builder(
            {
                tagName: 'ul',
                classList: ['menu__list', 'menu__list-close'],
                children: postsTitlesArray,
            }, li, null);
    }
}
