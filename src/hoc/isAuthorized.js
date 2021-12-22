import {useContext} from "react";
import {AuthContext} from "../contexts/AuthContext";
import {Navigate} from "react-router-dom";

export const isAuthorized = (Component) => {

    const HOComponent = (props) => {

        const {isAuthorized} = useContext(AuthContext);

        return (<>
                {isAuthorized
                    ? <Component {...props}/>
                    : <Navigate to="/login"/>}
            </>)
    }

    return HOComponent;
}