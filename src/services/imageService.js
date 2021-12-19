export const likePost = (postId, userId) => {
    fetch(`${process.env.REACT_APP_BACKENDLESS_BASE_URL}/api/data/posts/${postId}/likes`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({objectId: userId})
    }).then(res=>res.json())
        .catch(err=>console.log(err));
}

export const unlikePost = (postId, userId) => {
    fetch(`${process.env.REACT_APP_BACKENDLESS_BASE_URL}/api/data/posts/${postId}/likes`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({objectId: userId})
    }).then(res=>res.json())
        .catch(err=>console.log(err));
}

export const getAll = () => {
    return fetch(`${process.env.REACT_APP_BACKENDLESS_BASE_URL}/api/data/posts`)
        .then(res => res.json());
}

export const getById = (postId) => {
    return fetch(`${process.env.REACT_APP_BACKENDLESS_BASE_URL}/api/data/posts/${postId}`)
        .then(res => res.json());
}

export const getIfUserLikedPost = (postId, userId) => {
    return fetch(`${process.env.REACT_APP_BACKENDLESS_BASE_URL}/api/data/posts/${postId}/likes?where=objectId='${userId}'`)
        .then(res => res.json());
}

export const uploadImagePost = (imageData, userToken) => {
    return uploadImageCloudinary(imageData.image)
        .then(res =>
            uploadImageBackendless({
                url: res.url,
                title: imageData.title,
                description: imageData.description,
                userToken: userToken
            }));
}

const uploadImageBackendless = ({url, title, description, userToken}) => {
    return fetch(`${process.env.REACT_APP_BACKENDLESS_BASE_URL}/api/data/posts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'user-token': userToken
        },
        body: JSON.stringify({
            url, title, description
        })
    });
};


const uploadImageCloudinary = (file) => {

    let formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', `${process.env.REACT_APP_CLOUDINARY_POST_PRESET}`);

    return fetch(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUDNAME}/image/upload`, {
        method: 'POST',
        body: formData
    }).then(res => res.json());
}