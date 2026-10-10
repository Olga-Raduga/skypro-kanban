import { computed, ref } from 'vue'
const TOKEN_KEY = 'skypro-token'
const USER_KEY = 'skypro-user'
function readUser() {
    try {
        return JSON.parse(localStorage.getItem(USER_KEY) || 'null')
    } catch {
        return null
    }
}
const token = ref(localStorage.getItem(TOKEN_KEY) || '')
export const currentUser = ref(readUser())
export const isAuthenticated = computed(() => Boolean(token.value))
export function getToken() {
    return localStorage.getItem(TOKEN_KEY) || ''
}
export function hasSession() {
    return Boolean(getToken())
}
export function setSession(user) {
    if (!user?.token) {
        throw new Error('Сервер не вернул токен авторизации')
    }
    token.value = user.token
    localStorage.setItem(TOKEN_KEY, user.token)
    const safeUser = {
        id: user.id,
        login: user.login,
        name: user.name
    }
    currentUser.value = safeUser
    localStorage.setItem(USER_KEY, JSON.stringify(safeUser))
}
export function clearSession() {
    token.value = ''
    currentUser.value = null
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
}
