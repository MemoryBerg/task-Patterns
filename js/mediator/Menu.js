class Menu {

    constructor(authors) {
        this.authors = authors;
        this.addAuthorListener();
        this.addWrapperListener();
    }

    set menuMediator(mediator) {
        this.mediator = mediator;
    }

    addAuthorListener() {
        this.authors.forEach(({ author }) => {
            author.addEventListener('click', () => {
                this.mediator.handleClickByAuthor(author.dataset.value);
            });
        });
    }

    toggleAuthor(node) {
        const close = 'menu__list-close';
        const wasClose = node.classList.contains(close);
        this.authors.forEach(({ wrapper }) => {
            wrapper.classList.add(close);
        });
        if (wasClose) {
            node.classList.remove(close);
        }
    }

    addWrapperListener() {
        this.authors.forEach(({ wrapper }) => {
            wrapper.addEventListener('click', (event) => {
                this.mediator.handleClickByPost(event.target.dataset.id);
            });
        });
    }

    activateItem(id) {
        this.authors.forEach((authorNodeItem) => {
            [].forEach.call(authorNodeItem.wrapper.children, (nodeChild) => {
                if (nodeChild.dataset.id === id) {
                    nodeChild.classList.add('active-post');
                } else {
                    nodeChild.classList.remove('active-post');
                }
            });
        });
    }
}
