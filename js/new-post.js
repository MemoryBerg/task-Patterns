const urlPost = 'http://localhost:3000/api/create-article';
const data = [
    {
        tagName: 'label',
        title: 'Type of post',
        classValue: 'add__label',
        children: [
            {
                tagName: 'select',
                classValue: 'add__type',
                attributes: [
                    {
                        name: 'type'
                    }
                ],
                children: [
                    {
                        tagName: 'option',
                        title: ''
                    },
                    {
                        tagName: 'option',
                        title: 'Video'
                    },
                    {
                        tagName: 'option',
                        title: 'Text'
                    },
                    {
                        tagName: 'option',
                        title: 'Music'
                    },
                    {
                        tagName: 'option',
                        title: 'Picture'
                    }
                ]
            }
        ]
    },
    {
        tagName: 'label',
        title: `Enter image's link`,
        classValue: 'add__label',
        children: [
            {
                tagName: 'input',
                classValue: 'add__img add__input',
                attributes: [
                    {
                        name: 'image',
                        type: 'text'
                    }
                ]
            }
        ]
    },
    {
        tagName: 'label',
        title: 'Title',
        classValue: 'add__label',
        children: [
            {
                tagName: 'input',
                classValue: 'add__title add__input',
                attributes: [
                    {
                        name: 'title',
                        type: 'text',
                        id: 'title-input'
                    }
                ]
            }
        ],
        attributes: [
            {
                id: 'title'
            }
        ]
    },
    {
        tagName: 'label',
        title: 'Author',
        classValue: 'add__label',
        children: [
            {
                tagName: 'input',
                classValue: 'add__author add__input',
                attributes: [
                    {
                        name: 'author',
                        type: 'text'
                    }
                ]
            }
        ]
    },
    {
        tagName: 'label',
        title: 'Post',
        classValue: 'add__label',
        children: [
            {
                tagName: 'textarea',
                classValue: 'add__desc add__input',
                attributes: [
                    {
                        name: 'post',
                        rows: 20,
                        type: 'text'
                    }
                ]
            }
        ]
    },
    {
        tagName: 'label',
        title: 'Quote',
        classValue: 'add__label',
        children: [
            {
                tagName: 'textarea',
                classValue: 'add__quote add__input',
                attributes: [
                    {
                        name: 'quote',
                        rows: 5,
                        type: 'text'
                    }
                ]
            }
        ]
    },
    {
        tagName: 'button',
        title: 'Add',
        classValue: 'add__button btn button button__dark',
        attributes: [
            {
                id: 'add-button',
                disabled: ''
            }
        ]
    }
];

const addButton = document.getElementById('add-post');
const header = document.getElementById('header');

let formWrapper = document.createElement('div');
formWrapper.classList = 'add';
formWrapper.setAttribute('id', 'add');
let formPost = document.createElement('form');
formPost.classList = 'add__form';
formPost.setAttribute('onsubmit', 'sendPostToServer.call(this)')
addButton.addEventListener('click', renderFormNewPost.bind(null, data, formPost));

function render(args, parent) {
    let newElement = document.createElement(args.tagName);

    if (args.classValue) {
        newElement.classList = args.classValue;
    }
    if (args.title) {
        newElement.innerText = args.title
    }
    if (args.attributes) {
        Object.entries(args.attributes).forEach(item => {
            const attrs = item[1];
            for (const [key, value] of Object.entries(attrs)) {
                newElement.setAttribute(key, value)
            }
        })
    }
    if (args.children) {
        const children = args.children;
        children.forEach(child => render(child, newElement))
    }
    parent.appendChild(newElement);
    return newElement;
}

function renderFormNewPost(array, parentNode) {
    const form = document.getElementById('add');
    if (form) {
        return;
    }
    let formHeader = document.createElement('div');
    formHeader.innerText = 'New Post';
    formHeader.classList = 'add__post head2';
    formWrapper.append(formHeader, formPost);
    header.append(formWrapper);
    array.forEach(el => render(el, parentNode));
    const title = document.getElementById('title-input');
    title.addEventListener('blur', validateTitle.bind(title));
}

let postInfo = {};

function getPostInfo() {
    const data = this.children;
    Array.from(data).forEach(element => {
        if (element.firstElementChild && element.tagName === 'LABEL') {
            const elemKey = element.firstElementChild.getAttribute('name');
            const keyValue = element.firstElementChild.value;
            postInfo[elemKey] = keyValue;
        }
    });
    const date = new Date();
    let newDate = date.toLocaleString('en-Gb', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    }).toLowerCase();
    postInfo.postDate = newDate.replace(new RegExp(' 2'), ',' + ' 2');
    console.log(postInfo.type)
    return postInfo;
}

async function sendPostToServer() {
    event.preventDefault();
    getPostInfo.call(this)
    const postJson = JSON.stringify(postInfo);

    await fetch(urlPost, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: postJson
    })
        .then(async response => {
            const respArray = await response.json()
            const newPostId = respArray[respArray.length - 1].id;
            if (response.status === 200) {
                console.log(response)
                const currentLocation = location.href;
                const positionTochange = currentLocation.lastIndexOf('/');
                let newLocation = currentLocation.slice(0, positionTochange + 1) + 'post.html#' + newPostId;
                location = newLocation;
            }
        });
}

function validateTitle() {
    const title = document.getElementById('title-input');
    const titleRegExp = /^(\w*\s*[ ,!:?.//-]*)*$/ug;
    let postButton = document.getElementById('add-button');
    if (!postButton.getAttribute('disabled')) {
        postButton.setAttribute('disabled', '');
    }
    const a = title.value[0].toUpperCase()
    const b = title.value[0]
    if (a !== b) {
        showErrorMessage('Title must start with an uppercase letter', 'title');
    } else if (!title.value) {
        showErrorMessage(`Can't be blank`, 'title');
    } else if (title.value.length < 2) {
        showErrorMessage(`Too short. Title length must be more than 2 characters`, 'title');
    } else if (title.value.length > 20) {
        showErrorMessage(`Too long. Title length must be less than 20 characters`, 'title');
    } else if (!titleRegExp.test(title.value)) {
        showErrorMessage(`Title can contain letters and special characters including space: [ !:-?.,]`, 'title');
    } else {
        postButton.removeAttribute('disabled', '');
    }
}

function showErrorMessage(errorMessage, parentId) {
    let parentElement = document.getElementById(parentId);
    let errorElement = document.createElement('div');
    errorElement.innerText = errorMessage;
    errorElement.style.color = 'red';
    errorElement.setAttribute('id', 'shownError')
    parentElement.prepend(errorElement);

    setTimeout(() => {
        const errorToDelete = document.getElementById('shownError');
        errorToDelete.remove();
    }, 4000);
}