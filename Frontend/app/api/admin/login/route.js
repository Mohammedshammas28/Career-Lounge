import { NextResponse } from "next/server"
import { ADMIN_SESSION_COOKIE, adminAuthConfig } from "@/lib/admin-auth"

export async function POST(request) {
    const body = await request.json().catch(() => ({}))
    const username = String(body.username || "").trim()
    const password = String(body.password || "")

    const expectedUsername = String(adminAuthConfig.username || "admin").trim().toLowerCase()
    const expectedEmail = String(process.env.ADMIN_EMAIL || "info@career-lounge.in").trim().toLowerCase()

    console.log("[Admin Login Debug] Attempt:", { 
        inputUsername: username, 
        inputPassword: password,
        expectedUsername, 
        expectedEmail,
        expectedPassword: adminAuthConfig.password 
    })

    if ((username.toLowerCase() !== expectedUsername && username.toLowerCase() !== expectedEmail) || password !== adminAuthConfig.password) {
        console.warn("[Admin Login Debug] Failed login credentials match")
        return NextResponse.json({ message: "Invalid admin credentials" }, { status: 401 })
    }

    console.log("[Admin Login Debug] Success! Setting cookie...")
    const response = NextResponse.json({ ok: true })
    response.cookies.set(ADMIN_SESSION_COOKIE, adminAuthConfig.sessionToken, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 8,
    })

    return response
}

