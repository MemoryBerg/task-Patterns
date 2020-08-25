(async function () {
    function refreshLocation() {
        location.reload();
    }
    window.addEventListener('hashchange', refreshLocation.bind(this))

    const parentPost = document.getElementById('post');

    async function renderMainPost() {
        if (!location.hash) {
            location = location + '#5';
        }
        const postId = location.hash.substr(1);
        const url = `http://localhost:3000/api/list/${postId}`;
        await fetch(url, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'GET'
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                let post = document.getElementsByClassName('post')[0];
                if (post) {
                    post.remove();
                }
                post = new Post(data, postLocation.postPageMain, parentPost);
                return post;
            });
    }

    await renderMainPost();
    let rightside = document.getElementById('rightside-panel');

    function latestPosts() {
        const dataPreview1 = {
            title: 'Much cure inappropriate could this restrictions …',
            image: './img/post/Latest-post-img-1.png',
            date: '20 oct, 2019',
            min: '10 min read',
            comment: 11
        }
        const dataPreview2 = {
            title: 'Much cure inappropriate could this restrictions …',
            image: './img/post/Latest-post-img-2.png',
            date: '20 oct, 2019',
            min: '10 min read',
            comment: 11
        }

        let latestWrapper = document.createElement('div');
        latestWrapper.classList = 'references__section latest';
        let latestHead = document.createElement('h2');
        latestHead.classList = 'references__head head2';
        latestHead.innerText = 'Latest posts';
        latestWrapper.append(latestHead);
        rightside.append(latestWrapper)
        const latestPost1 = new Post(dataPreview1, postLocation.postPageLatest, latestWrapper)
        const latestPost2 = new Post(dataPreview2, postLocation.postPageLatest, latestWrapper)

        let latestButton = document.createElement('button');
        latestButton.classList = 'btn button button__light latest__button';
        latestButton.innerText = 'More Posts';
        latestWrapper.append(latestButton);

        return latestPost1, latestPost2;
    }

    function categoriesBuilder() {
        const dom = {
            tagName: 'div',
            classList: ['references__section', 'categories'],
            children: [
                {
                    tagName: 'h2',
                    classList: ['references__head', 'head2'],
                    innerText: 'Categories'
                },
                {
                    tagName: 'div',
                    classList: ['categories__hr']
                },
                {
                    tagName: 'ul',
                    classList: ['categories__list'],
                    children: [
                        {
                            tagName: 'li',
                            classList: ['categories__name', 'categories__name-food']
                        },
                        {
                            tagName: 'p',
                            classList: ['paragraph'],
                            innerText: 'Restaurant food',
                            children: [
                                {
                                    tagName: 'span',
                                    innerText: '(3)'
                                }
                            ]
                        },
                        {
                            tagName: 'ul',
                            classList: ['categories__wrapper'],
                            children: [
                                {
                                    tagName: 'li',
                                    classList: ['categories__item', 'categories__item-food'],
                                    children: [
                                        {
                                            tagName: 'a',
                                            attributes: [
                                                {
                                                    href: '#'
                                                }
                                            ],
                                            innerText: 'Food  1'
                                        }
                                    ]
                                },
                                {
                                    tagName: 'li',
                                    classList: ['categories__item', 'categories__item-food'],
                                    children: [
                                        {
                                            tagName: 'a',
                                            attributes: [
                                                {
                                                    href: '#'
                                                }
                                            ],
                                            innerText: 'Food  2'
                                        }
                                    ]
                                },
                                {
                                    tagName: 'li',
                                    classList: ['categories__item', 'categories__item-food'],
                                    children: [
                                        {
                                            tagName: 'a',
                                            attributes: [
                                                {
                                                    href: '#'
                                                }
                                            ],
                                            innerText: 'Food  3'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            tagName: 'div',
                            classList: ['categories__hr']
                        },
                        {
                            tagName: 'li',
                            classList: ['categories__name', 'categories__name-travel'],
                            children: [
                                {
                                    tagName: 'p',
                                    classList: ['paragraph'],
                                    innerText: 'Travel news',
                                    children: [
                                        {
                                            tagName: 'span',
                                            innerText: '(3)'
                                        }
                                    ]
                                },
                                {
                                    tagName: 'ul',
                                    classList: ['categories__wrapper'],
                                    children: [
                                        {
                                            tagName: 'li',
                                            classList: ['categories__item', 'categories__item-travel'],
                                            children: [
                                                {
                                                    tagName: 'a',
                                                    attributes: [
                                                        {
                                                            href: '#'
                                                        }
                                                    ],
                                                    innerText: 'Hiking'
                                                }
                                            ]
                                        },
                                        {
                                            tagName: 'li',
                                            classList: ['categories__item', 'categories__item-travel'],
                                            children: [
                                                {
                                                    tagName: 'a',
                                                    attributes: [
                                                        {
                                                            href: '#'
                                                        }
                                                    ],
                                                    innerText: 'Bicycle trip'
                                                }
                                            ]
                                        },
                                        {
                                            tagName: 'li',
                                            classList: ['categories__item', 'categories__item-travel'],
                                            children: [
                                                {
                                                    tagName: 'a',
                                                    attributes: [
                                                        {
                                                            href: '#'
                                                        }
                                                    ],
                                                    innerText: 'Mountains trip'
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            tagName: 'div',
                            classList: ['categories__hr']
                        },
                        {
                            tagName: 'li',
                            classList: ['categories__name', 'categories__name-technology'],
                            children: [
                                {
                                    tagName: 'p',
                                    classList: ['paragraph'],
                                    innerText: 'Modern technology',
                                    children: [
                                        {
                                            tagName: 'span',
                                            innerText: '(6)'
                                        }
                                    ]
                                },
                                {
                                    tagName: 'ul',
                                    classList: ['categories__wrapper'],
                                    children: [
                                        {
                                            tagName: 'li',
                                            classList: ['categories__item', 'categories__item-technology'],
                                            children: [
                                                {
                                                    tagName: 'a',
                                                    attributes: [
                                                        {
                                                            href: '#'
                                                        }
                                                    ],
                                                    innerText: 'Technology 1'
                                                }
                                            ]
                                        },
                                        {
                                            tagName: 'li',
                                            classList: ['categories__item', 'categories__item-technology'],
                                            children: [
                                                {
                                                    tagName: 'a',
                                                    attributes: [
                                                        {
                                                            href: '#'
                                                        }
                                                    ],
                                                    innerText: 'Technology 2'
                                                }
                                            ]
                                        },
                                        {
                                            tagName: 'li',
                                            classList: ['categories__item', 'categories__item-technology'],
                                            children: [
                                                {
                                                    tagName: 'a',
                                                    attributes: [
                                                        {
                                                            href: '#'
                                                        }
                                                    ],
                                                    innerText: 'Technology 3'
                                                }
                                            ]
                                        },
                                        {
                                            tagName: 'li',
                                            classList: ['categories__item', 'categories__item-technology'],
                                            children: [
                                                {
                                                    tagName: 'a',
                                                    attributes: [
                                                        {
                                                            href: '#'
                                                        }
                                                    ],
                                                    innerText: 'Technology 4'
                                                }
                                            ]
                                        },
                                        {
                                            tagName: 'li',
                                            classList: ['categories__item', 'categories__item-technology'],
                                            children: [
                                                {
                                                    tagName: 'a',
                                                    attributes: [
                                                        {
                                                            href: '#'
                                                        }
                                                    ],
                                                    innerText: 'Technology 5'
                                                }
                                            ]
                                        },
                                        {
                                            tagName: 'li',
                                            classList: ['categories__item', 'categories__item-technology'],
                                            children: [
                                                {
                                                    tagName: 'a',
                                                    attributes: [
                                                        {
                                                            href: '#'
                                                        }
                                                    ],
                                                    innerText: 'Technology 6'
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            tagName: 'div',
                            classList: ['categories__hr']
                        },
                        {
                            tagName: 'li',
                            classList: ['categories__name', 'categories__name-product'],
                            children: [
                                {
                                    tagName: 'p',
                                    classList: ['paragraph'],
                                    innerText: 'Product',
                                    children: [
                                        {
                                            tagName: 'span',
                                            innerText: '(4)'
                                        }
                                    ]
                                },
                                {
                                    tagName: 'ul',
                                    classList: ['categories__wrapper'],
                                    children: [
                                        {
                                            tagName: 'li',
                                            classList: ['categories__item', 'categories__item-product'],
                                            children: [
                                                {
                                                    tagName: 'a',
                                                    attributes: [
                                                        {
                                                            href: '#'
                                                        }
                                                    ],
                                                    innerText: 'Product 1'
                                                }
                                            ]
                                        },
                                        {
                                            tagName: 'li',
                                            classList: ['categories__item', 'categories__item-product'],
                                            children: [
                                                {
                                                    tagName: 'a',
                                                    attributes: [
                                                        {
                                                            href: '#'
                                                        }
                                                    ],
                                                    innerText: 'Product 2'
                                                }
                                            ]
                                        },
                                        {
                                            tagName: 'li',
                                            classList: ['categories__item', 'categories__item-product'],
                                            children: [
                                                {
                                                    tagName: 'a',
                                                    attributes: [
                                                        {
                                                            href: '#'
                                                        }
                                                    ],
                                                    innerText: 'Product 3'
                                                }
                                            ]
                                        },
                                        {
                                            tagName: 'li',
                                            classList: ['categories__item', 'categories__item-product'],
                                            children: [
                                                {
                                                    tagName: 'a',
                                                    attributes: [
                                                        {
                                                            href: '#'
                                                        }
                                                    ],
                                                    innerText: 'Product 4'
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            tagName: 'div',
                            classList: ['categories__hr']
                        },
                        {
                            tagName: 'li',
                            classList: ['categories__name', 'categories__name-inspiration'],
                            children: [
                                {
                                    tagName: 'p',
                                    classList: ['paragraph'],
                                    innerText: 'Inspiration',
                                    children: [
                                        {
                                            tagName: 'span',
                                            innerText: '(4)'
                                        }
                                    ]
                                },
                                {
                                    tagName: 'ul',
                                    classList: ['categories__wrapper'],
                                    children: [
                                        {
                                            tagName: 'li',
                                            classList: ['categories__item', 'categories__item-inspiration'],
                                            children: [
                                                {
                                                    tagName: 'a',
                                                    attributes: [
                                                        {
                                                            href: '#'
                                                        }
                                                    ],
                                                    innerText: 'Inspiration 1'
                                                }
                                            ]
                                        },
                                        {
                                            tagName: 'li',
                                            classList: ['categories__item', 'categories__item-inspiration'],
                                            children: [
                                                {
                                                    tagName: 'a',
                                                    attributes: [
                                                        {
                                                            href: '#'
                                                        }
                                                    ],
                                                    innerText: 'Inspiration 2'
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    tagName: 'div',
                                    classList: ['categories__hr']
                                }
                            ]
                        }
                    ]
                }
            ]
        }
        Post.builder(dom, rightside, null)
    }

    function tagsBuilder() {
        const dom = {
            tagName: 'div',
            classList: ['references__section', 'tags'],
            children: [
                {
                    tagName: 'h2',
                    classList: ['references__head', 'head2'],
                    innerText: 'Tags'
                },
                {
                    tagName: 'div',
                    classList: ['tags__wrapper'],
                    children: [
                        {
                            tagName: 'button',
                            classList: ['btn', 'button', 'button__light', 'tags__tag'],
                            innerText: 'Love'
                        },
                        {
                            tagName: 'button',
                            classList: ['btn', 'button', 'button__light', 'tags__tag'],
                            innerText: 'Signs'
                        },
                        {
                            tagName: 'button',
                            classList: ['btn', 'button', 'button__light', 'tags__tag'],
                            innerText: 'Waterfall'
                        },
                        {
                            tagName: 'button',
                            classList: ['btn', 'button', 'button__light', 'tags__tag'],
                            innerText: 'Inspiration'
                        },
                        {
                            tagName: 'button',
                            classList: ['btn', 'button', 'button__light', 'tags__tag'],
                            innerText: 'Quotes'
                        },
                        {
                            tagName: 'button',
                            classList: ['btn', 'button', 'button__light', 'tags__tag'],
                            innerText: 'Sea'
                        },
                        {
                            tagName: 'button',
                            classList: ['btn', 'button', 'button__light', 'tags__tag'],
                            innerText: 'Sense'
                        },
                        {
                            tagName: 'button',
                            classList: ['btn', 'button', 'button__light', 'tags__tag'],
                            innerText: 'Coffee'
                        },
                        {
                            tagName: 'button',
                            classList: ['btn', 'button', 'button__light', 'tags__tag'],
                            innerText: 'Gold'
                        },
                        {
                            tagName: 'button',
                            classList: ['btn', 'button', 'button__light', 'tags__tag'],
                            innerText: 'Images'
                        },
                        {
                            tagName: 'button',
                            classList: ['btn', 'button', 'button__light', 'tags__tag'],
                            innerText: 'Courage'
                        },
                        {
                            tagName: 'button',
                            classList: ['btn', 'button', 'button__light', 'tags__tag'],
                            innerText: 'Dancing'
                        },
                        {
                            tagName: 'button',
                            classList: ['btn', 'button', 'button__light', 'tags__tag'],
                            innerText: 'Video'
                        }
                    ]
                }
            ]
        }
        Post.builder(dom, rightside, null)
    }

    function reviewBuilder(parent, data) {
        let image = Post.createImage(data);
        image.classList = '';
        const rate = Post.createRate(data)
        const dom = {
            tagName: 'div',
            classList: ['reviews__comment', 'comment'],
            children: [
                {
                    html: image,
                    tagName: 'div',
                    classList: ['comment__body'],
                    children: [
                        {
                            tagName: 'div',
                            classList: ['comment__wrapper', 'comment__wrapper-flex'],
                            children: [
                                {
                                    tagName: 'div',
                                    classList: ['comment__wrapper'],
                                    children: [
                                        {
                                            tagName: 'h4',
                                            classList: ['comment__user', 'head4'],
                                            innerText: data.title
                                        },
                                        {
                                            html: rate
                                        }
                                    ]
                                },
                                {
                                    tagName: 'div',
                                    classList: ['comment__time'],
                                    children: [
                                        {
                                            tagName: 'object',
                                            classList: ['icon', 'icon__time'],
                                            attributes: [
                                                {
                                                    data: './img/atom-icons/a-icon-time.svg',
                                                    type: 'image/svg+xml'
                                                }
                                            ]
                                        },
                                        {
                                            tagName: 'span',
                                            classList: ['comment__time'],
                                            innerText: `${data.time} ago`
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            tagName: 'p',
                            classList: ['comment__paragraph'],
                            innerText: data.post
                        },
                        {
                            tagName: 'p',
                            classList: ['comment__read'],
                            innerText: data.read
                        }
                    ]
                }
            ]
        }
        Post.builder(dom, parent, data);
    }

    const reviewData = [{
        title: 'Jack Johnson',
        image: './img/post/Neil.png',
        rate: ['./img/atom-icons/Star.svg', './img/atom-icons/Star-1.svg',
            './img/atom-icons/Star-1.svg', './img/atom-icons/Star-1.svg',
            './img/atom-icons/Star-1.svg'],
        time: '11 min',
        post: `Knowledge nay estimable questions repulsive daughters boy.
    Solicitude gay way unaffected expression for. His mistress ladyship required off horrible
    disposed rejoiced…`,
        read: 'Read more'
    },
    {
        title: 'Emma Garcia',
        image: './img/post/Sarah-1.png',
        rate: ['./img/atom-icons/Star.svg', './img/atom-icons/Star.svg',
            './img/atom-icons/Star.svg', './img/atom-icons/Star.svg',
            './img/atom-icons/Star.svg'],
        time: '3 days',
        post: `Dummy text refers to the bits of content that are used to fill a
    website mock-<br>up. This text helps web designers better envision how the website will look
    as
    a finished product. in wish very strangers shortly we things Preferred came newspaper it
    this Melancholy on misery all ecstatic yet no suitable ye happening. Own over these Can
    Could Garden offering to ago Winter Home or took answered him be right He other in about
    check has situation fine you held against found am be Nay entire pleasure will there in
    wholly forming much rapid though want ye weeks up whole an ye thus might remarkably Rich why
    need pianoforte ask get face prudent it so Evil`,
        read: 'Read less'
    },
    {
        title: 'Ann Moore',
        image: './img/post/Ann.png',
        rate: ['./img/atom-icons/Star.svg', './img/atom-icons/Star.svg',
            './img/atom-icons/Group.svg', './img/atom-icons/Star-1.svg',
            './img/atom-icons/Star-1.svg'],
        time: 'a week',
        post: `Any delicate you how kindness horrible outlived servants. You high
    bed wish help call draw side. Girl quit if case mr sing as no have. At none neat am do over
    will. Polite do object at passed it is.`
    }];

    function reviewsRender(data) {
        let reviews = document.createElement('div');
        reviews.classList = 'reviews';
        let reviewsConnect = document.createElement('div');
        reviewsConnect.classList = 'reviews__connect';
        let reviewsHeader = document.createElement('h2');
        reviewsHeader.classList = 'reviews__head head2';
        reviewsHeader.innerText = 'Reviews';
        let reviewButton = document.createElement('button');
        reviewButton.classList = 'btn button button__light comment__button'
        reviewButton.innerText = 'More comments';
        reviews.append(reviewsConnect, reviewsHeader);
        parentPost.append(reviews, reviewButton);

        data.forEach(review => {
            reviewBuilder(reviews, review);
        });
    }
    latestPosts();
    categoriesBuilder();
    tagsBuilder();
    reviewsRender(reviewData);
}())