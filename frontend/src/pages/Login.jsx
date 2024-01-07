import axios from "axios"

export default function Login(){

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const response = await axios.post("http://localhost:5000/api/auth/login",
                {
                    username: event.target.username.value,
                    password: event.target.password.value,
                }, {
                    withCredentials: true,
                })
            
            const {success} = response.data

            if (success) {
                window.location = "/"
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
                <label htmlFor="password">password</label>
                <input type="password" name="password" id="password" />
                <button>Sign up</button>
            </form>
        </>
    )
}