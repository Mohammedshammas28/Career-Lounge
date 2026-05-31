export const ADMIN_SESSION_COOKIE = "admin_session"
export const ADMIN_LOGIN_PATH = "/admin/login"
export const ADMIN_DASHBOARD_PATH = "/admin"

export const adminAuthConfig = {
    username: process.env.ADMIN_USERNAME || "admin",
    password: process.env.ADMIN_PASSWORD || "change-this-password",
    sessionToken: process.env.ADMIN_SESSION_TOKEN || "change-this-session-token",
}

export function isValidAdminSession(token) {
    return Boolean(token) && token === adminAuthConfig.sessionToken
}
