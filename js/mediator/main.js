let post = document.getElementById('post')

let showPosts = new ShowPosts(post);

let mainMediator = new Mediator(showPosts);
mainMediator.setPosts(showPosts);

let horizontalMenu = new Menu(orientationNames.horizontal, menuNodes.horizontal);
let verticalMenu = new Menu(orientationNames.vertical, menuNodes.vertical);

horizontalMenu.setMediator(mainMediator);
verticalMenu.setMediator(mainMediator);

horizontalMenu.addListenersToClick(horizontalMenu);
verticalMenu.addListenersToClick(verticalMenu)
