"use client"

import { getMe, logOutUser, } from "@/app/api/auth.Api"
import { createContext, useContext, useEffect, useState, ReactNode } from "react"
import toast from "react-hot-toast"

interface User {
    firstName: string
    lastName: string
    email: string
    role?: string
    avatar?: string
    status?: string
}

interface UserContextType {
    user: User | null
    isLoading: boolean
    loggedIn: boolean
    logout: () => Promise<void>
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [loggedIn, setLoggedIn] = useState(false)

    useEffect(() => {
        const fetchUser = async () => {
            setIsLoading(true)
            try {
                const token = localStorage.getItem("toolinger")
                if (token) {
                    const userData = await getMe()

                    if (userData?.statusCode == 200) {
                        setUser({
                            firstName: userData?.data?.firstName,
                            lastName: userData?.data?.lastName,
                            email: userData?.data?.email,
                            avatar: userData?.data?.avatar,
                            role: userData?.data?.role,
                            status: userData?.data?.status,

                        })
                        setLoggedIn(true)
                    } else {
                        setUser(null)
                        setLoggedIn(false)
                    }
                } else {
                    setUser(null)
                    setLoggedIn(false)
                }
            } catch (error) {
                setUser(null)
                setLoggedIn(false)
            } finally {
                setIsLoading(false)
            }
        }

        fetchUser()
    }, [])

    const logout = async () => {
        setIsLoading(true)
        try {
            await logOutUser()
        } catch (error) {
            // Optionally handle error
        } finally {
            localStorage.removeItem("toolinger")
            toast.success("Logout successful")
            setUser(null)
            setLoggedIn(false)
            setIsLoading(false)
            // Redirect to home page after logout
            window.location.href = "/"
        }
    }

    return (
        <UserContext.Provider value={{ user, isLoading, loggedIn, logout }}>
            {children}
        </UserContext.Provider>
    )
}

export function useUserContext() {
    const context = useContext(UserContext)
    if (context === undefined) {
        throw new Error("useUserContext must be used within a UserProvider")
    }
    return context
}