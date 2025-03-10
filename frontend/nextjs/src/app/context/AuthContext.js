"use client"

import { createContext, useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [error, setError] = useState(null)
    const router = useRouter()

    const login = async (username, password) => {
        try {
            const formData = new FormData()
            formData.append("username", username)
            formData.append("password", password)
            const response = await axios.post("http://localhost:8000/auth/token", formData, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            })
            axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.access_token}`
            localStorage.setItem("token", response.data.access_token)
            setUser(response.data)
            router.push("/")
        } catch (error) {
            console.log("Loggin Failed", error)
            setError(error.response.data.message)
        }
    }

    const logout = async () => {
        // await axios.post("/api/logout")
        setUser(null)
        delete axios.defaults.headers.common["Authorization"]
        router.push("/login")
    }

    return (
        <AuthContext.Provider value={{ user, error, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}


export default AuthContext