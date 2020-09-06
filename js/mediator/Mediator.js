class Mediator {

    constructor(menus, posts) {
        this.menus = menus;
        this.posts = posts;
        console.log(this.posts)
    }

    handleClickByAuthor(value) {
        this.menus.forEach((menu) => {
            const author = menu.authors.find(({ author }) => {
                return author.dataset.value === value;
            });
            if (author) {
                menu.toggleAuthor(author.wrapper);
            }
        });
    }

    handleClickByPost(id) {
        this.posts.setInfoToShow(id);
        this.menus.forEach((menu) => {
            menu.activateItem(id);
        });
    }
}

