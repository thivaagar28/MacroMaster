import { createContext, useEffect, useReducer, useRef } from "react";
import { validateToken } from "../utils/jwt";
import { setSession, resetSession} from '../utils/session'
import axiosInstance from '../services/axios';


const initialState = {
    isAuthenticated : false,
    isInitialized : false,
    user: null
};

export const AuthContext = createContext({
    ...initialState,
    login: () => Promise.resolve(),
    logout: () => Promise.resolve()
});

const handlers ={
    INITIALIZE: (state, action) =>{
        const {isAuthenticated, user} = action.payload;
        return{
            ...state, /* return previous state */
            isAuthenticated,
            isInitialized: true,
            user,
        }
    },
    LOGIN: (state, action) =>{
        const{user} = action.payload;
        return{
            ...state, /* return previous state */
            isAuthenticated : true,
            user,
        }
    },
    LOGOUT: (state) =>{
        return {
            ...state,
            isAuthenticated : false,
            user : null
        };
    },
}

/* Main reducer to call the appropriate action above */
const reducer = (state, action) => handlers[action.type] ? handlers[action.type](state, action) : state;

export const AuthProvider = (props) => {
    const {children} = props;
    const [state, dispatch] = useReducer(reducer, initialState)
    const isMounted = useRef(false);

    useEffect(() => {
        if(isMounted.current) return // return if the use effect is already executed once
        
        const initialize =  async () =>{
            try{
                // but there is a redundancy where the access token is retrieved from the local storage then validated and then the access token is passed to set back in the localstorage?? bad2,)
                const accessToken = localStorage.getItem("accessToken")
                const refreshToken = localStorage.getItem("refreshToken");
                if (accessToken && validateToken(accessToken)){ // when there is token already present and still valid
                    setSession(accessToken);
                    const response = await axiosInstance.get("/users/me");
                    const {data: user} = response;
                    dispatch({ 
                        type:"INITIALIZE", 
                        payload:{
                            isAuthenticated : true, 
                            user,
                        }});
                } else if (refreshToken){
                    const response = await axiosInstance.post('/auth/refresh', refreshToken); // need to validate the response
                    const newAccessToken = response.data.access_token;
                    const newRefreshToken = response.data.refresh_token;
                    if(newAccessToken && newRefreshToken && validateToken(newAccessToken)){
                        setSession(newAccessToken, newRefreshToken);
                        const response_refresh = await axiosInstance.get("/users/me");
                        const {data: user} = response_refresh;
                        dispatch({ 
                        type:"INITIALIZE", 
                        payload:{
                            isAuthenticated : true, 
                            user,
                        }});
                    } else{
                        dispatch({ 
                            type:"INITIALIZE", 
                            payload:{
                                isAuthenticated : false, 
                                user: null,
                        }});
                    }
                } else {
                    dispatch({ 
                        type:"INITIALIZE", 
                        payload:{
                            isAuthenticated : false, 
                            user: null,
                    }});
                }
            } catch (error){
                resetSession();
                dispatch({ 
                    type:"INITIALIZE", 
                    payload:{
                        isAuthenticated : false, 
                        user: null,
                    }});
            }
        };

        initialize();

        isMounted.current = true; /*prevent the use effect from firing twice*/
    }, []);

    const getTokens = async (email, password) => {
        const formData = new FormData();
        formData.append("username", email);
        formData.append("password", password);
        try{
            // Session setup here
            const response = await axiosInstance.post("/auth/login", formData);
            setSession(response.data.access_token, response.data.refresh_token);
        }
        catch(error){
            throw error;
        }
    };

    const login = async (email, password) => {
        try{
            await getTokens(email, password);
            const response = await axiosInstance.get("/users/me");
            const {data : user} = response;
            dispatch({
                type: "LOGIN",
                payload: {
                    user
                },
            });
        } catch(error){
            return Promise.reject(error) ;
        }
    }

    const logout = () =>{
        resetSession();
        dispatch({type:"LOGOUT"});
    };

    return (
        <AuthContext.Provider value={{...state, login, logout}}>  {/* Elements rerender on the state chnages and login and logout */}
            {children}
        </AuthContext.Provider>
    )
}

export const AuthConsumer = AuthContext.Consumer;