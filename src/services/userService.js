const backendlessPath = `${process.env.REACT_APP_BACKENDLESS_BASE_URL}`;

export function getCommentatorById(userId) {
    return fetch(`${backendlessPath}/api/data/Users/${userId}?property=objectId&property=username&property=profilePicPublicId`)
        .then(res => res.json())
        .catch(err => console.log(err));
}

export function getById(userId) {
    return fetch(`${backendlessPath}/api/data/Users/${userId}`)
        .then(res => res.json())
        .catch(err => console.log(err));
}

export function registerUser(userData) {
    uploadProfilePic(userData.image)
        .then(res => {
                delete userData.image;
                userData.profilePicPublicId = res.url?.substring(res.url.indexOf("upload/") + 7).split(".")[0];
                return registerUserBackendless(userData);
            }
        );
}

export async function login({username, password}) {
    let res = await fetch(`${backendlessPath}/api/users/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'login': username,
            'password': password
        })
    });

    let json = await res.json();

    if (res.ok) {
        return json;
    } else {
        throw json;
    }
}

const uploadProfilePic = (file) => {

    let formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', `${process.env.REACT_APP_CLOUDINARY_USER_PRESET}`);

    return fetch(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUDNAME}/image/upload`, {
        method: 'POST',
        body: formData
    })
        .then(res => res.json())
        .catch(err => console.log(err.json()));
}

const registerUserBackendless = (userData) => {
    fetch(`${backendlessPath}/api/data/Users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
        .then(res => res.json())
        .catch(err => console.log(err.json()));
}

export const editUser = (userData, userId, userToken) => {
    return uploadProfilePic(userData.image)
        .then(res => {
            delete userData.image;
            userData.profilePicPublicId = res.url?.substring(res.url.indexOf("upload/") + 7).split(".")[0];
            return fetch(`${backendlessPath}/api/data/Users/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'user-token': userToken
                },
                body: JSON.stringify(userData)
            })
                .then(res => res.json())
                .catch(err => console.log(err.json()));
        });
}

export const logout = (userToken) => {
    return fetch(`${backendlessPath}/api/users/logout`, {
        headers: {
            'user-token': userToken
        }
    })
        .then(res => res)
        .catch(err => console.log(err));
}