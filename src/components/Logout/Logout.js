import {Navigate} from "react-router-dom";
import * as userService from "../../services/userService";
import {useContext, useEffect} from "react";
import {AuthContext} from "../../contexts/AuthContext";


export default function Logout() {

    const {userData,logout} = useContext(AuthContext);


    useEffect(()=>{
        userService.logout(userData.userToken)
            .then(()=>logout());
    },[])

    return (
        <Navigate to="/"/>
    )
}