const path = `${process.env.REACT_APP_BACKENDLESS_BASE_URL}`;
export function registerUser(userData){
    return  fetch(`${path}/api/data/Users`, {
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(userData)
    }).then(res=>res.json());
}

export async function login({username,password}){
    let res = await fetch(`${path}/api/users/login`, {
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            'login':username,
            'password':password
        })
    });

    let json = await res.json();

    if (res.ok){
        return json;
    }else {
        throw json;
    }
}