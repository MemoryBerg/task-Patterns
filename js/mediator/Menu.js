const orientationNames = {
    horizontal: 0,
    vertical: 1
}

let menuNodes = {
    vertical: document.getElementById('menu-vertical'),
    horizontal: document.getElementById('menu-horizontal')
}

class Menu {

    constructor(orientation, menuNode) {
        this.orientation = orientation;
        this.menuNode = menuNode;
        this.mendiator;
    }

    setMediator(mediator) {
        this.mediator = mediator;
    }

    addListenersToClick(obj) {
        let menu = document.getElementById(obj.menuNode.id);
        let mediator = this.mediator;
        menu.addEventListener('click', async () => {
            let target = event.target;
            if (target.tagName === "LI") {
                const info = await getInfoToShow(getDataToRender);
                mediator.selectedPostInfo(info.title, info.text);
                activateElement(target);
            } else if (target.tagName === 'SPAN') {
                const currentAuthor = event.target.nextSibling.getAttribute('data-set');
                document.querySelectorAll(`[data-set=${currentAuthor}`).forEach(author => {
                    activateAuthor(author);
                })
            } else {
                Array.from(document.getElementsByClassName('menu__list_li-style')).forEach(section => {
                    section.classList.remove('fixed')
                })
            }
        });
    }
}

function activateAuthor(el) {
    let activeAuthors = document.getElementsByClassName('fixed');
    if (activeAuthors.length >= 2) {
        Array.from(activeAuthors).forEach(author => {
            author.classList.remove('fixed');
        })
    }
    el.classList.add('fixed')
}

let similarEls = [];

function activateElement(el) {
    Array.from(document.getElementsByClassName('active-post')).forEach(post => {
        post.classList.remove('active-post')
    })
    const currentSelector = el.parentNode.getAttribute('data-set')
    similarEls = document.querySelectorAll(`[data-set=${currentSelector}`);

    similarEls.forEach(element => {
        element.childNodes.forEach(child => {
            if (child.getAttribute('data-post') === el.getAttribute('data-post')) {
                child.classList.add('active-post');
            }
        })
    })
}
