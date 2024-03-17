//we create the authorize router there.
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/store";

export const AuthorizeUser = ({children})=>{
    let token = localStorage.getItem('token');
    if(!token){
        return <Navigate to='/' replace={true} />
    }
    return children;
}

// user can only access the password page if the user have username
export const ProtectRoute = ({children})=>{
    const username = useAuthStore.getState().auth.username;
    if(!username ){
        return <Navigate to='/username' replace={true} />
    }    
    return children;
}



