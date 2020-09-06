const urlList = 'http://localhost:3000/api/list/';

function getAuthorsList() {
    const list = fetch(urlList, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'GET'
    })
        .then(async response => {
            return await response.json();
        });

    return list
}

class PortfolioPage {

    constructor() {
        this.create();
    }

    create() {
        getAuthorsList().then((data) => {
            const authorsArray = data.reduce((result, current) => {
                const currentAuthorInResult = result.findIndex((item) => {
                    return current.author === item.author;
                });
                const sortPost = {
                    title: current.title,
                    id: current.id,
                };
                if (currentAuthorInResult === -1) {
                    result.push({
                        author: current.author,
                        posts: [sortPost],
                    });
                } else {
                    result[currentAuthorInResult].posts.push(sortPost);
                }
                return result;
            }, []);
            this.posts = new ShowPosts(data);
            this.buildMenus(authorsArray);
            this.createMediator();
        });
    }

    createMediator() {
        this.mediator = new Mediator([this.verticalMenu, this.horizontalMenu], this.posts);
        this.verticalMenu.menuMediator = this.mediator;
        this.horizontalMenu.menuMediator = this.mediator;
    }

    buildMenus(authorsArray) {
        const horizontalMenu = [];
        const verticalMenu = [];

        authorsArray.forEach((author) => {
            const horizontalMenuItem = new Author(
                author.author,
                author.posts,
                document.querySelector('.menu__vertical')
            );
            const verticalMenuItem = new Author(
                author.author,
                author.posts,
                document.querySelector('.menu__horizontal')
            );
            horizontalMenu.push({
                author: horizontalMenuItem.author,
                wrapper: horizontalMenuItem.titlesWrapper,
            });
            verticalMenu.push({
                author: verticalMenuItem.author,
                wrapper: verticalMenuItem.titlesWrapper,
            });
        });
        this.verticalMenu = new Menu(verticalMenu);
        this.horizontalMenu = new Menu(horizontalMenu);
    }
}

new PortfolioPage();

