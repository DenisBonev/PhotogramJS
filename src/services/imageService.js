

export const uploadImagePost = (imageData) =>{

   return uploadImageCloudinary(imageData.image)
        .then(res=>
            uploadImageBackendless({
                url:res.url,
                title:imageData.title,
                description:imageData.description
            }));
}

const uploadImageBackendless = ({url,title,description}) =>{
    return fetch(`${process.env.REACT_APP_BACKENDLESS_BASE_URL}/api/data/posts`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        url,title,description
    })
});
};


const uploadImageCloudinary = (file) => {

    let formData = new FormData();
    formData.append('file',file);
    formData.append('upload_preset',`${process.env.REACT_APP_CLOUDINARY_PRESET}`);

    return fetch(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUDNAME}/image/upload`, {
        method: 'POST',
        body: formData
    }).then(res => res.json());
}