import { useEffect, useState } from "react"
import axios from "axios"

export default function useAuth() {
    const [isAuth, setIsAuth] = useState(false)
    const [currentUser, setCurrentUser] = useState("")
    const [isLoading, setIsLoading] = useState(true)

    useEffect( ()=> {
        const isAuthenticated = async () => {
          try { 
            const {data} = await axios.get("http://localhost:5000/", {
              withCredentials:true
            })
            
            setCurrentUser(data.user)
            setIsAuth(true)
            setIsLoading(false)
    
          } catch (e) {
            console.log(e)
            setIsLoading(false)
          } 
        }
    
        isAuthenticated()

        
    }, [])

    return {isAuth, currentUser, isLoading}
    
}
