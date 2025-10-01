"use client"

import type React from "react"
import { createContext, useContext, useState, type ReactNode } from "react"

export type UserRole = "admin" | "subscriber" | "demo"

interface User {
    id: string
    name: string
    email: string
    role: UserRole
    avatar?: string
}

interface RoleContextType {
    user: User | null
    setUser: (user: User | null) => void
    hasPermission: (permission: string) => boolean
}

const RoleContext = createContext<RoleContextType | undefined>(undefined)

export const useRole = () => {
    const context = useContext(RoleContext)
    if (context === undefined) {
        // console.log("error")
        // throw new Error("useRole must be used within a RoleProvider")
    }
    return context
}

interface RoleProviderProps {
    children: ReactNode
}

export const RoleProvider: React.FC<RoleProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>({
        id: "1",
        name: "Admin User",
        email: "admin@toolinger.com",
        role: "admin",
        avatar: "/placeholder.svg?height=40&width=40",
    })

    const hasPermission = (permission: string): boolean => {
        if (!user) return false

        const permissions = {
            admin: ["seo_management", "user_management", "analytics", "settings", "content_management"],
            subscriber: ["analytics", "basic_tools"],
            demo: ["basic_tools"],
        }

        return permissions[user.role]?.includes(permission) || false
    }

    return <RoleContext.Provider value={{ user, setUser, hasPermission }}>{children}</RoleContext.Provider>
}
