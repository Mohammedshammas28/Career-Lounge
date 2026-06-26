import { NextResponse } from "next/server"
import { ADMIN_LOGIN_PATH, ADMIN_SESSION_COOKIE, isValidAdminSession } from "@/lib/admin-auth"

export function proxy(request) {
    const { pathname } = request.nextUrl
    const sessionToken = request.cookies.get(ADMIN_SESSION_COOKIE)?.value
    const isAuthed = isValidAdminSession(sessionToken)
    const isLoginPath = pathname === ADMIN_LOGIN_PATH

    if (isLoginPath && isAuthed) {
        return NextResponse.redirect(new URL("/admin", request.url))
    }

    if (!isLoginPath && !isAuthed) {
        const loginUrl = new URL(ADMIN_LOGIN_PATH, request.url)
        loginUrl.searchParams.set("from", pathname)
        return NextResponse.redirect(loginUrl)
    }

    return NextResponse.next()
}

export const config = {
    matcher: ["/admin", "/admin/:path*"],
}
