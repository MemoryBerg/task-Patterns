class ShowPosts {
    constructor(post) {
        this.post = post
    }

    setInfoToShow(title, text) {
        let postTitle = document.getElementById('post-title')
        postTitle.innerText = title;
        let postDescription = document.getElementById('post-description')
        postDescription.innerText = text;
    }
}