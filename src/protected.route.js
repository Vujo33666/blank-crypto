import Cookies from "js-cookie";
import React from "react";
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";

const ProtectedRoute = ({component: Component, userAddress, ...rest}) =>{
    return(
        <Route {...rest} render={
            (props)=>{
                if(Cookies.get("address")){
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
