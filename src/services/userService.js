export function registerUser(userData){
   return  fetch(`${process.env.REACT_APP_BACKENDLESS_BASE_URL}/api/data/Users`, {
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(userData)
    }).then(res=>res.json());
}