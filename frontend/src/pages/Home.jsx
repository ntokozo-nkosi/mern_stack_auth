import "js-cookie"
import { Link, useNavigate } from "react-router-dom"
import useAuth from "../customHooks/useAuth"

// eslint-disable-next-line react/prop-types
export default function Home({user}){
    const {isAuth, currentUser, isLoading} = useAuth()
    const navigate = useNavigate()


    if (isLoading){
        return <h1>Fetching Data...</h1>
    }
    
    if (isAuth) {
        return (
            <>
                <h1>Welcome to Your Dashboard, {user} </h1>
            </>
        )
    } else {
        navigate("/login")
    }
    
}