"use client"
import { useContext, useEffect } from "react"
import { useRouter } from "next/navigation"
import AuthContext from "../context/AuthContext"


const ProtectedRoute = ({ children }) => {
    const router = useRouter()
    const { user } = useContext(AuthContext)

    useEffect(() => {
        if (!user) {
            router.push("/login")
        }
    }, [user, router])

    return user ? children : null
}

export default ProtectedRoute