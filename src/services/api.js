import { getToken } from './session.js'
const API_BASE_URL = 'https://wedev-api.sky.pro/api'
async function request(path, options = {}) {
    const {
        method = 'GET',
        body,
        auth = true
    } = options
    const headers = {
        Accept: 'application/json'
    }

    if (auth) {
        const token = getToken()
        if (!token) {
            throw new Error('Войдите в аккаунт, чтобы продолжить')
        }
        headers.Authorization = `Bearer ${token}`
    }
    let response
    try {
        response = await fetch(`${API_BASE_URL}${path}`, {
            method,
            headers,
            ...(body !== undefined
                ? { body: JSON.stringify(body) }
                : {})
        })
    } catch {
        throw new Error(
            'Не удалось связаться с сервером. Проверьте интернет и попробуйте снова'
        )
    }
    const text = await response.text()
    let data = {}
    if (text) {
        try {
            data = JSON.parse(text)
        } catch {
            data = {}
        }
    }
    if (!response.ok) {
        throw new Error(
            data.error ||
            data.message ||
            `Ошибка сервера: ${response.status}`
        )
    }
    return data
}
export function registerUser({ login, name, password }) {
    return request('/user', {
        method: 'POST',
        auth: false,
        body: { login, name, password }
    })
}
export function loginUser({ login, password }) {
    return request('/user/login', {
        method: 'POST',
        auth: false,
        body: { login, password }
    })
}
export async function getTasksRequest() {
    const data = await request('/kanban')
    return data.tasks || []
}
export async function getTaskRequest(id) {
    const data = await request(`/kanban/${encodeURIComponent(id)}`)
    return data.task
}
export function createTaskRequest(task) {
    return request('/kanban', {
        method: 'POST',
        body: task
    })
}
export function updateTaskRequest(id, task) {
    return request(`/kanban/${encodeURIComponent(id)}`, {
        method: 'PUT',
        body: task
    })
}
export function deleteTaskRequest(id) {
    return request(`/kanban/${encodeURIComponent(id)}`, {
        method: 'DELETE'
    })
}
