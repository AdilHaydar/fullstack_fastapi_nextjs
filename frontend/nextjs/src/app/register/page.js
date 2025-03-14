"use client"
import { useState, useContext } from "react"
import AuthContext from "../context/AuthContext"
import axios from "axios"

const Register = () => {
    const { login } = useContext(AuthContext)
    const [error, setError] = useState("")
    const [registerUsername, setRegisterUsername] = useState("")
    const [registerPassword, setRegisterPassword] = useState("")


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

export default Register