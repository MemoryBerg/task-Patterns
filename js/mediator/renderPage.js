const urlList = 'http://localhost:3000/api/list/';

function getAuthorsList() {
    const list = fetch(urlList, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'GET'
    })
        .then(response => {
            return response.json();
        });

    return list
}
const listOfAuthors = getAuthorsList();
const getDataToRender = createPostsPreview(listOfAuthors)

function getInfoToShow(data) {
    let info = {};
    const currentAuthor = event.target.parentNode.previousSibling.innerText;
    const currentPost = event.target.getAttribute('data-post');
    data.forEach(author => {
        if (author.author === currentAuthor) {
            for (let post in author.posts) {
                if (post === currentPost) {
                    info.title = author.posts[post].title;
                    info.text = author.posts[post].description;
                }
            }
        }
    })
    return info;
}

function createPostsPreview(list) {
    let authors = [];
    let posts = [];
    list.then(data => {
        const horizontalMenu = document.createElement('ul');
        horizontalMenu.classList = 'menu__list menu__list_horizontal';
        const verticalMenu = document.createElement('ul');
        verticalMenu.classList = 'menu__list menu__list_vertical';

        data.forEach(author => {
            if (!authors.includes(author.author)) {
                authors.push(author.author)
                posts.push({
                    author: author.author,
                    dataSet: 'auth' + (posts.length + 1),
                    posts: {
                        post1: {
                            title: author.title,
                            description: author.post
                        }
                    }
                })
            } else {
                posts.forEach(post => {
                    if (author.author === post.author) {
                        let postNum = 'post' + (Object.keys(post.posts).length + 1);
                        post.posts[postNum] = {
                            title: author.title,
                            description: author.post
                        }
                    }
                })
            }
        })
        posts.forEach(author => {
            let childrenItems = [];
            let childrenVertical = [];
            const domCategory = {
                tagName: 'li',
                classList: ['menu__category'],
                children: [
                    {
                        tagName: 'span',
                        innerText: author.author
                    },
                    {
                        tagName: 'ul',
                        classList: ['menu__list_li-style'],
                        attributes: [
                            {
                                'data-set': author.dataSet
                            }
                        ],
                        children: childrenItems,
                    }
                ]
            }

            for (let post in author.posts) {
                createItem(author.posts, childrenItems, post, 'horizontal');
                createItem(author.posts, childrenVertical, post, 'vertical')
            }

            render(domCategory, author, horizontalMenu)

            domCategory.children[1].children = childrenVertical;
            render(domCategory, author, verticalMenu)

        })
        function createItem(postsObject, postsArray, post, direction) {
            const domhorizontalMenuItem = {
                tagName: 'li',
                classList: ['menu__item', 'menu__item_horizontal'],
                innerText: postsObject[post].title,
                attributes: [
                    {
                        'data-post': post,
                    }
                ]
            }
            const domVerticalMenuItem = {
                tagName: 'li',
                classList: ['menu__item', 'menu__item_vertical'],
                innerText: postsObject[post].title,
                attributes: [
                    {
                        'data-post': post,
                    }
                ]
            }
            if (direction === 'horizontal') {
                postsArray.push(domhorizontalMenuItem)
            } else {
                postsArray.push(domVerticalMenuItem)
            }
        }
        document.getElementById('menu-horizontal').append(horizontalMenu);
        document.getElementById('menu-vertical').append(verticalMenu);
    })
    return posts;
}


function render(dom, data, parentNode) {
    if (!dom) {
        return;
    }
    let { tagName, classList, id, attributes, children, html, innerText } = dom;
    let newElement = document.createElement(tagName);
    if (classList) {
        classList.forEach(className => {
            className && newElement.classList.add(className)
        })
    }
    if (id) {
        newElement.id = id;
    }
    if (attributes) {
        attributes && attributes.forEach((attr) => {

            Object.entries(attr).forEach(prop => {
                newElement.setAttribute(prop[0], prop[1])
            })
        });
    }
    if (html) {
        render(html, data, parentNode)
    }
    if (innerText) {
        newElement.innerHTML = innerText || data.text;
    } else {
        newElement.innerText = '';
    }
    if (data) {

        if (data.classList && Array.from(newElement.classList).includes(data.criterionClassList)) {

            data.classList.forEach(className => {
                className && newElement.classList.add(className)
            })
        }
        if (data.identy && Array.from(newElement.classList).includes(data.criterionIdenty)) {
            data.identy.forEach(identy => {
                newElement.classList.add(identy)
            })
        }
    }
    if (children) {
        if (Array.isArray(children)) {
            children && children.forEach(child => {
                render(child, data, newElement)
            })
        }
    }
    parentNode.append(newElement)
    return newElement;
}

