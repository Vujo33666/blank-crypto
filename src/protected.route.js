import Cookies from "js-cookie";
import React from "react";
import {BrowserRouter as Router, Switch, Route, Redirect, useHistory} from "react-router-dom";
import auth from "./auth";

const ProtectedRoute = ({component: Component, userAddress, ...rest}) =>{
    return(
        <Route {...rest} render={
            (props)=>{
                if(Cookies.get('user')==="YouLoggedIn"){
                    return <Component {...props} userAddress={userAddress}/>
                }
                else{
                    return <Redirect to={{
                        pathname: "/",
                        state: {
                            from: props.location
                        }
                    }}/>
                }
            }
        } 
        />
    );
}

export default ProtectedRoute;
