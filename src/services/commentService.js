export const getCommentsByPostId = (postId) => {
    return fetch(`${process.env.REACT_APP_BACKENDLESS_BASE_URL}/api/data/posts/${postId}/comments`)
        .then(res => res.json())
        .catch(err => console.log(err.json()));
}

export const postComment = (postId, userToken, comment) => {
    return fetch(`${process.env.REACT_APP_BACKENDLESS_BASE_URL}/api/data/comments`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "user-token": userToken
        },
        body: JSON.stringify({
            comment: comment
        })
    }).then(res => res.json())
        .then(res => {
            return fetch(`${process.env.REACT_APP_BACKENDLESS_BASE_URL}/api/data/posts/${postId}/comments`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "user-token": userToken
                },
                body: JSON.stringify({
                    objectId: res.objectId
                })
            })
                .then(res => res.json())
                .catch(err => console.log(err.json()));
        });
}