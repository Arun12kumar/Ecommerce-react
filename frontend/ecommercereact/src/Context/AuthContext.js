import { createContext, useState, useEffect, useRef, useCallback } from "react";
import jwt_decode from "jwt-decode";
import { useHistory } from "react-router-dom";
const swal = require('sweetalert2')

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
    const [authTokens, setAuthTokens] = useState(() =>
        localStorage.getItem("authTokens")
            ? JSON.parse(localStorage.getItem("authTokens"))
            : null
    );

    const [user, setUser] = useState(() =>
        localStorage.getItem("authTokens")
            ? jwt_decode(localStorage.getItem("authTokens"))
            : null
    );

    const [loading, setLoading] = useState(true);
    const history = useHistory();
    const logoutTimeoutRef = useRef(null);

    const loginUser = async (email, password) => {
        const response = await fetch("http://127.0.0.1:8000/api/token/", {
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                email, password
            })
        })
        
        const data = await response.json()

        if(response.status === 200){
            console.log("Logged In");
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem("authTokens", JSON.stringify(data))
            history.push("/")
            swal.fire({
                position: "center",
                icon: "success",
                title: "Login Success",
                showConfirmButton: false,
                timer: 1500
              });

            // Set a timeout for automatic logout after 1 minute
            logoutTimeoutRef.current = setTimeout(logoutUser, 300000);
        } else {    
            console.log(response.status);
            console.log("there was a server issue");
            swal.fire({
                title: "Username or passowrd does not exists",
                icon: "error",
                toast: true,
                timer: 6000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            })
        }
    }

    const logoutUser = useCallback(() => {
        clearTimeout(logoutTimeoutRef.current); // Clear the timeout to prevent automatic logout
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem("authTokens");
        history.push("/login");
        swal.fire({
            title: "You have been logged out...",
            icon: "success",
            toast: true,
            timer: 6000,
            position: 'top-right',
            timerProgressBar: true,
            showConfirmButton: false,
        });
    }, [history]);

    const registerUser = async (email, username, password, password2) => {
        const response = await fetch("http://127.0.0.1:8000/api/register/", {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                email, username, password, password2
            })
        })
        if(response.status === 201){
            history.push("/login")
            swal.fire({
                position: "center",
                icon: "success",
                title: "Login Success",
                showConfirmButton: false,
                timer: 1500
              });
        } else {
            console.log(response.status);
            console.log("there was a server issue");
            swal.fire({
                title: "An Error Occured " + response.status,
                icon: "error",
                toast: true,
                timer: 6000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            })
        }
    }

    const contextData = {
        user,
        setUser,
        authTokens,
        setAuthTokens,
        registerUser,
        loginUser,
        logoutUser,
    };

    useEffect(() => {
        if (authTokens) {
            setUser(jwt_decode(authTokens.access));
            
            // Set a timeout for automatic logout after 1 minute
            logoutTimeoutRef.current = setTimeout(logoutUser, 300000);
        }
        setLoading(false);

        // Clear the timeout if the component unmounts
        return () => {
            clearTimeout(logoutTimeoutRef.current);
        };
    }, [authTokens, loading, logoutUser]);

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    );
};
