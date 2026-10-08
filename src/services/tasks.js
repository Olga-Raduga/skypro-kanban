import { ref } from 'vue'
import {
    createTaskRequest,
    deleteTaskRequest,
    getTaskRequest,
    getTasksRequest,
    updateTaskRequest
} from './api.js'
export const tasks = ref([])
export const isTasksLoading = ref(false)
export const tasksError = ref('')
function normalizeTask(task) {
    return {
        ...task,
        id: String(task._id ?? task.id),
        title: task.title || 'Новая задача',
        topic: task.topic || 'Research',
        status: task.status || 'Без статуса',
        description: task.description || '',
        date: task.date || new Date().toISOString()
    }
}
function normalizeTasks(taskList) {
    return Array.isArray(taskList)
        ? taskList.map(normalizeTask)
        : []
}
export async function loadTasks() {
    isTasksLoading.value = true
    tasksError.value = ''
    try {
        const serverTasks = await getTasksRequest()
        tasks.value = normalizeTasks(serverTasks)
        return tasks.value
    } catch (error) {
        tasksError.value = error.message || 'Не удалось загрузить задачи'
        throw error
    } finally {
        isTasksLoading.value = false
    }
}
export async function getTaskById(id) {
    const task = await getTaskRequest(id)
    if (!task) {
        throw new Error('Задача не найдена')
    }
    return normalizeTask(task)
}
export async function createTask(task) {
    const data = await createTaskRequest(task)
    if (Array.isArray(data.tasks)) {
        tasks.value = normalizeTasks(data.tasks)
    }
    return data
}
export async function updateTask(id, task) {
    const data = await updateTaskRequest(id, task)
    if (Array.isArray(data.tasks)) {
        tasks.value = normalizeTasks(data.tasks)
    }
    return data
}
export async function deleteTask(id) {
    const data = await deleteTaskRequest(id)
    if (Array.isArray(data.tasks)) {
        tasks.value = normalizeTasks(data.tasks)
    }
    return data
}
