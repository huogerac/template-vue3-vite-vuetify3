import { defineStore } from "pinia"
import todosApi from "@/api/todos.api.js"

export const usetodosStore = defineStore("todosStore", {
  state: () => ({
    tasks: [],
    tasksLoading: false,
  }),
  actions: {
    async getTasks() {
      this.tasksLoading = true
      const response = await todosApi.getTasks()
      this.tasks = response.tasks
      this.tasksLoading = false
    },
    async addNewTask(tarefa) {
      const newTask = await todosApi.addNewTask(tarefa.title)
      return newTask
    },
  },
})
