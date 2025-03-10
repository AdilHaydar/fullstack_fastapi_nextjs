"use client"
import { useState, useContext } from "react"
import AuthContext from "../context/AuthContext"
import axios from "axios"

const Login = () => {
    const { login } = useContext(AuthContext)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [registerUsername, setRegisterUsername] = useState("")
    const [registerPassword, setRegisterPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        login(username, password)
    }

    const handleRegister = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post("http://localhost:8000/auth", {
                username: registerUsername,
                password: registerPassword,
            })
            if (response.status === 201) {
                login(registerUsername, registerPassword)
            } else {
                setError("Failed to register")
                console.log("Failed to register:", response)
            }
        } catch (error) {
            console.error("Failed to register:", error)
            setError("Failed to register")
        }
    }

    return (
        <div className="container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
                {error && <div>{error}</div>}
            </form>
            <h2 className="mt-5">Register</h2>
            <form onSubmit={handleRegister}>
                <div className="mb-3">
                    <label htmlFor="registerUsername" className="form-label">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        id="registerUsername"
                        placeholder="Username"
                        value={registerUsername}
                        onChange={(e) => setRegisterUsername(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="registerPassword" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="registerPassword"
                        placeholder="Password"
                        value={registerPassword}
                        onChange={(e) => setRegisterPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
        </div>
    )
}

export default Login