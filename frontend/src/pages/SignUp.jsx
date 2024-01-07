import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function SignUp(){
    const navigate = useNavigate()
    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const response = await axios.post("http://localhost:5000/api/auth/signup",
                {
                    username: event.target.username.value,
                    email: event.target.email.value,
                    password: event.target.password.value,
                })
            
            const {success} = response.data

            if (success) {
                navigate("/login")
            }
            
        } catch (e) {
            alert(e.response.data.message)
        }
        
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">username</label>
                <input type="text" name="username" id="username"/>
                <br />
                <label htmlFor="email">email</label>
                <input type="text" name="email" id="email"/>
                <br />
                <label htmlFor="password">password</label>
                <input type="password" name="password" id="password" />
                <button>Sign up</button>
            </form>
        </>
    )
}