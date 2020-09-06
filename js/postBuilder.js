const postLocation = {
    postPageMain: 'main',
    postPageLatest: 'latest',
    blogPage: 'blog',
    homePage: 'home'
}
class Post {
    // _dataInfo = {};

    /**
     * 
     * @param domNodes
     * @param parentNode
     * @param data
     */

    static builder(domNodes, parentNode, data) {
        if (!domNodes) {
            return
        }
        let { tagName, classList, id, attributes, children, html, innerText } = domNodes;
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
            Post.builder(html, parentNode, this._dataInfo)
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
            children && children.forEach(child => {
                Post.builder(child, newElement, data)
            })
        }
        parentNode.append(newElement)
        return newElement;
    }


    /**
     * 
     * @param data
     * @param location
     * @param parentNode
     * 
     */

    constructor(data, location, parentNode) {
        this._parentNode = parentNode;
        this._parseDataInfo(data);
        if (location) {

            switch (location) {
                case postLocation.postPageMain:
                    this.postPagePostBuilder();
                    break;
                case postLocation.postPageLatest:
                    this.postPageLatest();
                    break;
                case postLocation.homePage:
                    this.homePagePostBuilder();
                    break;
                case postLocation.blogPage:
                    this.blogPageBuilder();
                    break;
                default:
                    break;
            }
        }
    }

    _parseDataInfo(data) {
        this._dataInfo = {
            title: data.title,
            type: data.type,
            image: data.image,
            author: data.author,
            text: data.post,
            quote: data.quote,
            date: data.date,
            id: data.id,
            min: data.min || 'some',
            comment: data.comment || '0',
            likes: data.likes || 0,
            read: data.read || 'more',
            pic: data.pic || './img/post/uncknown.png',
            identy: data.identy,
            criterionIdenty: data.criterionIdenty,
            classList: data.classList,
            criterionClassList: data.criterionClassList,
            rate: data.rate,
            music: data.music,
            href: data.href
        }

        switch (this._dataInfo.type) {
            case 'music':
                this._dataInfo.icon = 'melody';
                break;
            case 'video':
                this._dataInfo.icon = 'playmini';
                break;
            case 'picture':
                this._dataInfo.icon = 'picture';
                break;
            case 'text':
                this._dataInfo.icon = 'text';
                break;
            default:
                this._dataInfo.icon = 'no type';
        }
    }

    static createImage(data) {
        if (!data.type) {
            data.type = 'no type'
        }

        const postImage = data.type.toLowerCase() === 'text'
            ? ''
            : {
                tagName: 'img',
                classList: ['post__pic'],
                attributes: [
                    {
                        src: data.image,
                        alt: 'image'
                    }
                ]
            }
        return postImage
    }

    static createRate(data) {
        if (data.rate) {
            const rate = {
                tagName: 'div',
                classList: ['author__rate', 'post__rate'],
                children: []
            }

            data.rate.forEach(star => {
                rate.children[rate.children.length] = {
                    tagName: 'object',
                    attributes: [
                        {
                            data: star,
                            type: 'image/svg+xml'
                        }
                    ]
                }
            });
            return rate;
        }
    }

    static createMusic(data) {
        const music = data.type !== 'music'
            ? ''
            : {
                tagName: 'audio',
                classList: ['post__audio'],
                attributes: [
                    {
                        controls: '',
                        src: data.music
                    }
                ]
            }
        return music;
    }

    _createVideoIcon(data) {
        const videoIcon = data.type !== 'video'
            ? ''
            : {
                tagName: 'button',
                classList: ['post__play'],
                children: [
                    {
                        tagName: 'object',
                        classList: ['icon'],
                        attributes: [
                            {
                                data: './img/atom-icons/a-icon-play.svg',
                                type: 'image/svg+xml'
                            }
                        ]
                    }
                ]
            }
        return videoIcon;
    }

    _media(data) {
        const videoIcon = this._createVideoIcon(this._dataInfo);
        const postImage = Post.createImage(this._dataInfo);
        const media = data.type === 'text'
            ? ''
            : {
                tagName: 'div',
                classList: ['post__media', 'col-6'],
                children: [
                    {
                        html: videoIcon
                    },
                    {
                        html: postImage
                    }
                ]
            }
        return media;
    }
    postPagePostBuilder() {
        const postImage = Post.createImage(this._dataInfo);
        let postRate;
        if (this._dataInfo.rate) {
            postRate = Post.createRate(this._dataInfo);
        }
        const postMusic = Post.createMusic(this._dataInfo);
        const dom = {
            tagName: 'div',
            classList: ['post'],
            id: `post${this._dataInfo.id}`,
            children: [
                {
                    tagName: 'h1',
                    classList: ['post__head', 'head1'],
                    id: 'post-head',
                    innerText: this._dataInfo.title
                },
                {
                    tagName: 'div',
                    classList: ['post__info', 'd-flex', 'author'],
                    id: 'post-author',
                    children: [
                        {
                            tagName: 'img',
                            classList: ['post__userpic', 'author__userpic'],
                            attributes: [
                                {
                                    src: this._dataInfo.pic,
                                    alt: 'image'
                                }
                            ]
                        },
                        {
                            tagName: 'div',
                            classList: ['post__wrapper'],
                            children: [
                                {
                                    tagName: 'h4',
                                    classList: ['author__username', 'post__username'],
                                    id: 'post-username',
                                    innerText: this._dataInfo.author
                                },
                                {
                                    tagName: 'div',
                                    classList: ['author__data', 'data'],
                                    children: [
                                        {
                                            tagName: 'span',
                                            classList: ['author__data', 'data'],
                                            id: 'post-date',
                                            innerText: this._dataInfo.date
                                        },
                                        {
                                            tagName: 'span',
                                            classList: ['author__data', 'data', 'data-read'],
                                            innerText: `${this._dataInfo.min} min read`
                                        },
                                        {
                                            tagName: 'span',
                                            classList: ['author__data', 'data', 'data-comment'],
                                            children: [
                                                {
                                                    tagName: 'a',
                                                    attributes: [
                                                        {
                                                            href: this._dataInfo.href
                                                        }
                                                    ],
                                                    innerText: this._dataInfo.comment
                                                }
                                            ]
                                        },
                                        {
                                            html: postRate
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    html: postImage
                },
                {
                    html: postMusic
                },
                {
                    tagName: 'div',
                    classList: ['post__body'],
                    id: 'post-body',
                    children: [
                        {
                            tagName: 'div',
                            classList: ['post__paragraph', 'paragraph'],
                            innerText: this._dataInfo.text
                        },
                        {
                            tagName: 'blockquote',
                            classList: ['post__blockquote'],
                            innerText: this._dataInfo.quote
                        }
                    ]
                },
                {
                    tagName: 'div',
                    classList: ['post__wrapper', 'post__wrapper-flex'],
                    children: [
                        {
                            tagName: 'div',
                            children: [
                                {
                                    tagName: 'object',
                                    classList: ['icon', 'icon__like'],
                                    attributes: [
                                        {
                                            data: './img/atom-icons/a-icon-like.svg',
                                            type: 'image/svg+xml'
                                        }
                                    ]
                                },
                                {
                                    tagName: 'span',
                                    classList: ['icon', 'icon__text'],
                                    innerText: `${this._dataInfo.likes} likes`
                                }
                            ]
                        },
                        {
                            tagName: 'div',
                            classList: ['post__socials', 'socials'],
                            children: [
                                {
                                    tagName: 'a',
                                    classList: ['socials__item'],
                                    children: [
                                        {
                                            tagName: 'object',
                                            classList: ['icon', 'icon__facebook'],
                                            attributes: [
                                                {
                                                    data: './img/atom-icons/a-icon-facebook.svg',
                                                    type: 'image/svg+xml'
                                                }
                                            ]
                                        }
                                    ],
                                    attributes: [
                                        {
                                            href: 'https://www.facebook.com/'
                                        }
                                    ]
                                },
                                {
                                    tagName: 'a',
                                    classList: ['socials__item'],
                                    children: [
                                        {
                                            tagName: 'object',
                                            classList: ['icon', 'icon__dribble'],
                                            attributes: [
                                                {
                                                    data: './img/atom-icons/a-icon-dribbble.svg',
                                                    type: 'image/svg+xml'
                                                }
                                            ]
                                        }
                                    ],
                                    attributes: [
                                        {
                                            href: 'https://dribble.com/'
                                        }
                                    ]
                                },
                                {
                                    tagName: 'a',
                                    classList: ['socials__item'],
                                    children: [
                                        {
                                            tagName: 'object',
                                            classList: ['icon', 'icon__instagram'],
                                            attributes: [
                                                {
                                                    data: './img/atom-icons/a-icon-instagram.svg',
                                                    type: 'image/svg+xml'
                                                }
                                            ]
                                        }
                                    ],
                                    attributes: [
                                        {
                                            href: 'https://www.instagram.com/'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    tagName: 'div',
                    classList: ['primary__hr']
                }
            ]
        }

        Post.builder(dom, this._parentNode, this._dataInfo)
    }

    postPageLatest() {
        const postImage = Post.createImage(this._dataInfo);
        postImage.classList = '';
        const dom = {
            tagName: 'div',
            classList: ['latest__preview'],
            children: [
                {
                    html: postImage,
                    tagName: 'div',
                    classList: ['latest__info'],
                    children: [
                        {
                            tagName: 'h4',
                            classList: ['latest__title', 'head4'],
                            innerText: this._dataInfo.title
                        },
                        {
                            tagName: 'div',
                            classList: ['latest__data', 'data'],
                            children: [
                                {
                                    tagName: 'span',
                                    classList: ['latest__data', 'data'],
                                    innerText: this._dataInfo.date
                                },
                                {
                                    tagName: 'span',
                                    classList: ['latest__data', 'data', 'data-read'],
                                    innerText: this._dataInfo.min
                                },
                                {
                                    tagName: 'span',
                                    classList: ['latest__data', 'data', 'data-comment'],
                                    children: [
                                        {
                                            tagName: 'a',
                                            attributes: [
                                                {
                                                    href: this._dataInfo.href
                                                }
                                            ],
                                            innerText: this._dataInfo.comment
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }

        Post.builder(dom, this._parentNode, this._dataInfo)

    }
    homePagePostBuilder() {
        const postImage = Post.createImage(this._dataInfo);
        let text = this._dataInfo.text.slice(0, 260);
        text = text + '...'
        const dom = {
            tagName: 'div',
            classList: ['posts__post', 'col-4'],
            id: `post${this._dataInfo.id}`,
            children: [
                {
                    html: postImage
                },
                {
                    tagName: 'h3',
                    classList: ['posts__head', 'head3'],
                    innerText: this._dataInfo.title
                },
                {
                    tagName: 'p',
                    classList: ['posts__paragraph', 'posts__paragraph-post'],
                    innerText: text
                },
                {
                    tagName: 'div',
                    classList: ['posts__data', 'data'],
                    children: [
                        {
                            tagName: 'span',
                            classList: ['posts__data', 'data'],
                            innerText: this._dataInfo.date
                        },
                        {
                            tagName: 'span',
                            classList: ['posts__data', 'data', 'data-read'],
                            innerText: this._dataInfo.min
                        },
                        {
                            tagName: 'span',
                            classList: ['posts__data', 'data', 'data-comment'],
                            children: [
                                {
                                    tagName: 'a',
                                    attributes: [
                                        {
                                            href: this._dataInfo.href
                                        }
                                    ],
                                    innerText: this._dataInfo.comment
                                }
                            ]
                        }
                    ]
                }
            ]
        }

        Post.builder(dom, this._parentNode, this._dataInfo)
    }
    blogPageBuilder() {
        let text = this._dataInfo.text.slice(0, 260);
        text = text + '...'
        const postRate = Post.createRate(this._dataInfo);
        const media = this._media(this._dataInfo);
        let music = Post.createMusic(this._dataInfo);
        const dom = {
            tagName: 'div',
            classList: ['post', 'd-flex', 'container'],
            id: `post${this._dataInfo.id}`,
            children: [
                {
                    tagName: 'div',
                    classList: ['post__wrapper', 'row'],
                    children: [
                        {
                            html: media
                        },
                        {
                            tagName: 'div',
                            classList: ['post__info', 'col'],
                            children: [
                                {
                                    tagName: 'div',
                                    classList: ['post__type', `post__type-${this._dataInfo.type}`],
                                    children: [
                                        {
                                            tagName: 'object',
                                            classList: ['icon', `icon__${this._dataInfo.icon}`],
                                            attributes: [
                                                {
                                                    data: `./img/atom-icons/a-icon-${this._dataInfo.icon}.svg`,
                                                    type: 'image/svg+xml'
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    tagName: 'div',
                                    classList: ['post__wrapper', 'd-flex', 'author'],
                                    children: [
                                        {
                                            tagName: 'img',
                                            classList: ['post__userpic', 'author__userpic'],
                                            attributes: [
                                                {
                                                    src: this._dataInfo.pic,
                                                    alt: 'image'
                                                }
                                            ]
                                        },
                                        {
                                            tagName: 'div',
                                            classList: ['post__wrapper'],
                                            children: [
                                                {
                                                    tagName: 'h3',
                                                    classList: ['post__username', 'author__username', 'head4'],
                                                    innerText: this._dataInfo.author
                                                },
                                                {
                                                    tagName: 'div',
                                                    classList: ['post__data', 'data'],
                                                    children: [
                                                        {
                                                            tagName: 'span',
                                                            classList: ['post__data', 'data'],
                                                            innerText: this._dataInfo.date
                                                        },
                                                        {
                                                            tagName: 'span',
                                                            classList: ['post__data', 'data', 'data-read'],
                                                            innerText: this._dataInfo.read
                                                        },
                                                        {
                                                            tagName: 'span',
                                                            classList: ['post__data', 'data', 'data-comment'],
                                                            children: [
                                                                {
                                                                    tagName: 'a',
                                                                    attributes: [
                                                                        {
                                                                            href: this._dataInfo.href
                                                                        }
                                                                    ],
                                                                    innerText: this._dataInfo.comment
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            html: postRate
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    tagName: 'div',
                                    classList: ['post__wrapper', 'post__wrapper-info'],
                                    children: [
                                        {
                                            tagName: 'h3',
                                            classList: ['post__title', 'head3'],
                                            innerText: this._dataInfo.title
                                        },
                                        {
                                            html: music
                                        },
                                        {
                                            tagName: 'p',
                                            classList: ['post__paragraph', 'paragraph'],
                                            innerText: text
                                        }
                                    ]
                                },
                                {
                                    tagName: 'button',
                                    classList: ['btn', 'button', 'button__light', 'post__button'],
                                    innerText: `Read ${this._dataInfo.read}`
                                }
                            ]
                        }
                    ]
                }
            ]
        }
        Post.builder(dom, this._parentNode, this._dataInfo)
    }
}

class Portfolio extends Post {
    constructor(...args) {
        super(...args);
        this.data = args[0];
        this.parent = args[2];
        this.buildPortfolio(this.parent, this.data)
    }

    static builder(dom, parent, data) {
        super.builder(dom, parent, data);
    }

    buildPortfolio(parent, data) {
        const dom = {
            tagName: 'div',
            classList: ['portfolio__container', 'slide'],
            children: [
                {
                    tagName: 'div',
                    classList: ['info__post', 'info__post-hover', 'portfolio__post',
                        'portfolio__post-hover', 'col-4', 'd-flex', 'flex-column', 'justify-content-center'],
                    children: [
                        {
                            tagName: 'h3',
                            classList: ['info__title', 'portfolio__title', 'head3'],
                            innerText: data.title
                        },
                        {
                            tagName: 'p',
                            classList: ['info__paragraph', 'info__paragraph-light', 'portfolio__paragraph',
                                'portfolio__paragraph-light'],
                            innerText: data.text
                        }
                    ]
                }
            ]
        }
        Portfolio.builder(dom, parent, data);
        let toolbarsContainers = Array.from(document.getElementsByClassName('portfolio__toolbar'));
        const toolbarDom = {
            tagName: 'div',
            classList: ['btn-toolbar'],
            attributes: [
                {
                    role: 'toolbar',
                    'aria-label': 'Toolbar with button groups'
                }
            ],
            children: [
                {
                    tagName: 'div',
                    classList: ['btn-group'],
                    attributes: [
                        {
                            role: 'group',
                            'aria-label': 'First group'
                        }
                    ],
                    children: [
                        {
                            tagName: 'button',
                            classList: ['btn', 'button', 'button__transparent'],
                            attributes: [
                                {
                                    type: 'button'
                                }
                            ],
                            children: [
                                {
                                    tagName: 'object',
                                    classList: ['icon', 'icon__attach'],
                                    attributes: [
                                        {
                                            data: './img/atom-icons/a-icon-attach.svg'
                                        },
                                        {
                                            type: 'image/svg+xml'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            tagName: 'button',
                            classList: ['btn', 'button', 'button__transparent'],
                            attributes: [
                                {
                                    type: 'button'
                                }
                            ],
                            children: [
                                {
                                    tagName: 'object',
                                    classList: ['icon', 'icon__search'],
                                    attributes: [
                                        {
                                            data: './img/atom-icons/a-icon-search.svg',
                                            type: 'image/svg+xml'
                                        }
                                    ]
                                }
                            ]
                        }

                    ]
                }
            ]
        }
        toolbarsContainers.forEach(container => {
            if (container.lastElementChild.className !== 'btn-toolbar') {
                Portfolio.builder(toolbarDom, container, null)
            }
        })
    }
}
