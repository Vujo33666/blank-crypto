import Cookies from "js-cookie";

class Auth{
    constructor(){
        this.authenticated = false;
    }

    login(cb){
        this.authenticated=true;
        Cookies.set("user","YouLoggedIn");
        console.log("postavljen cookie na loginpageu");
        cb();
    }

    logout(cb){
        this.authenticated=false;
        Cookies.remove("user");
        console.log("izbrisan cookie sa dashboarda");
        cb();
    }

    isAuthenticated(){
        return this.authenticated;
    }
}

export default new Auth();