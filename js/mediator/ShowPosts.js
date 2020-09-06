class ShowPosts {
    constructor(posts) {
        this.posts = posts;
    }

    setInfoToShow(id) {
        this.post && this.post.remove(false);
        const postData = this.posts.find((item) => {
            return item.id === +id
        });
        if (postData) {
            let postTitle = document.getElementById('post-title')
            postTitle.innerText = postData.title;
            let postDescription = document.getElementById('post-description')
            postDescription.innerText = postData.post;
        }
    }
}