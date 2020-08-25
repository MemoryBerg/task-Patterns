const userPicsList = document.getElementsByClassName('author__userpic');

function search() {
    const criterion = event.target.parentNode.previousElementSibling.value;
    let result;
    let count = 0;
    let wrapper = document.querySelector('[data-result]');
    if (wrapper) {
        wrapper.remove();
    }
    Array.from(userPicsList).forEach(user => {
        if (!result) {
            result = document.createElement('div');
            result.setAttribute('data-result', '');
        }
        const currentUser = user.cloneNode();
        currentUser.className = 'pic';
        let text = user.nextElementSibling.firstElementChild.innerText;
        if (text.includes(criterion, 0)) {
            count++;
            let searchingUser = document.createElement('div');
            searchingUser.className = 'search-pic';
            let name = document.createElement('span');
            name.innerText = user.nextElementSibling.firstElementChild.innerText;
            searchingUser.append(currentUser, name);

            result.append(searchingUser)
        }
    });
    if (count === 0) {
        result.innerText = 'Not founded';
    }

    document.getElementById('search').append(result)
}

const parentNode = document.getElementById('main');

parentNode.addEventListener('click', () => {
    const button = Array.from(document.getElementsByClassName('button__search'))[0];
    if (event.target !== button) {
        const result = document.querySelector('[data-result]');
        if (result) {
            result.remove();
        }
    }
    if (event.target.className.includes('post__button')) {
        const postID = event.target.parentNode.parentNode.parentNode.id;
        const currentLocation = location.href;
        const positionTochange = currentLocation.lastIndexOf('/');
        let newLocation = currentLocation.slice(0, positionTochange + 1) + 'post.html#' + postID.slice(4);
        location = newLocation;
    }
})

const posts = 4;

async function blogBuilder(postsNumber) {
    const parentNode = document.getElementById('main');
    let header = document.createElement('h2');
    header.classList = 'title__head head2';
    header.innerText = 'Blog';
    let line = document.createElement('div');
    line.classList = 'title__line line';
    const searchDom = {
        tagName: 'div',
        classList: ['title__search', 'search'],
        children: [
            {
                tagName: 'div',
                classList: ['input-group', 'mb-3'],
                id: 'search',
                children: [
                    {
                        tagName: 'input',
                        classList: ['form-control', 'input', 'input-search'],
                        attributes: [
                            {
                                type: 'text',
                                placeholder: 'Search by author',
                                'aria-describedby': 'button-addon2',
                                'aria-label': `Recipient's username`
                            }
                        ]
                    },
                    {
                        tagName: 'div',
                        classList: ['input-group-append'],
                        children: [
                            {
                                tagName: 'button',
                                classList: ['btn', 'btn-outline-secondary', 'button__search'],
                                id: 'button-addon2',
                                attributes: [
                                    {
                                        type: 'button'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }

    parentNode.append(header, line);
    Post.builder(searchDom, parentNode, null);
    const url = `http://localhost:3000/api/list/`;
    await fetch(url, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'GET'
    })
        .then(response => {
            return response.json();
        }
        )
        .then(dataArray => {
            dataArray.forEach(data => {
                if (data.id > postsNumber || data.id === 0) {
                    return
                } else {
                    const post = new Post(data, postLocation.blogPage, parentNode);
                    return post;
                }
            })
        })
    let buttonMore = document.createElement('button');
    buttonMore.classList = 'btn button button__dark post__button post__button-main';
    buttonMore.innerText = 'Read more';
    parentNode.append(buttonMore);
}

blogBuilder(posts)
