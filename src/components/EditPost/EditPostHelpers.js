const errorMessages = {
    length:"Length must be between 3-25 characters!",
    description:"Length must be at least 20 characters!"
};

export const validateInput = (e,errors,setErrors) => {
    if (e.target.value.length < 3 || e.target.value.length > 25) {
        setErrors({...errors, [e.target.id]: errorMessages.length});
    } else {
        setErrors({...errors, [e.target.id]: ''});
    }
}

export const validateTextArea = (e, errors, setErrors) => {
    if (e.target.value.length < 20 && e.target.value.length!==0) {
        setErrors({...errors, [e.target.id]: errorMessages.description});
    } else {
        setErrors({...errors, [e.target.id]: ''});
    }
}

