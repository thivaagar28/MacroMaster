import axiosInstance from '../services/axios';

export const setSession = (accessToken, refreshToken = null) =>{
    if(accessToken){
        //save access token in local storage
        localStorage.setItem("accessToken", accessToken);
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`; // authorization header which can access the protected api calls
    } else{
        //remove accesstoken from local storage
        localStorage.removeItem("accessToken");
        delete axiosInstance.defaults.headers.common["Authorization"];
    }
    if (refreshToken){
        // save refresh token in local storage
        localStorage.setItem("refreshToken", refreshToken);
    }
}

export const resetSession = () =>{
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    delete axiosInstance.defaults.headers.common["Authorization"];
}

// all these supposedly should choose system memory rather than saving it in local storage

