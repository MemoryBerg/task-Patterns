class Mediator {
    constructor(post) {
        this.post = post;
    }

    setPosts(newPost) {
        this.newPost = newPost;
    }

    selectedPostInfo(title, post) {
        this.title = title;
        this.post = post;

        this.newPost.setInfoToShow(this.title, this.post);
    }
}