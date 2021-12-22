const errorMessages = {
    length:"Length must be between 2-25 characters!",
    username:"Username can contain letters, digits, . and _ only!",
    email:"Email is not valid!",
    password:"Password should be at least 8 characters long!",
    description:"Length must be at least 30 characters!"
};

export const validateInput = (e,errors,setErrors) => {
    if (e.target.value.length < 2 || e.target.value.length > 25) {
        setErrors({...errors, [e.target.id]: errorMessages.length});
    } else {
        setErrors({...errors, [e.target.id]: ''});
    }
}

export const validateTextArea = (e, errors, setErrors) => {
    if (e.target.value.length < 30 && e.target.value.length!==0) {
        setErrors({...errors, [e.target.id]: errorMessages.description});
    } else {
        setErrors({...errors, [e.target.id]: ''});
    }
}

export const validateUsername = (e, errors, setErrors) =>{
    const regex = /[A-Za-z0-9]+(_||\\.)?[A-Za-z0-9]+/;
    if (!regex.test(e.target.value)){
        setErrors({...errors,username:errorMessages.username});
    }else {
        setErrors({...errors,username: ''});
    }
}

export const validateEmail = (e, errors, setErrors) => {
    const regex = /[A-Za-z0-9\._]+@[a-z]+\.[a-z]+/gm
    if (!regex.test(e.target.value)){
        setErrors({...errors,email:errorMessages.email});
    }else {
        setErrors({...errors,email:''});
    }
}

export const validatePassword = (e, errors, setErrors) =>{
    if (e.target.value.length<8){
        setErrors({...errors,password:errorMessages.password});
    }else {
        setErrors({...errors,password: ''});
    }
}

