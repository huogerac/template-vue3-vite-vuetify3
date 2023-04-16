import api from "./config.js"
import apiHelpers from "./helpers.js"

export default {
  getTasks: async () => {
    const response = await api.get("/api/todos/tasks/list")
    return response.data
  },
  addNewTask: async (description) => {
    const response = await api.post(
      "/api/todos/tasks/add",
      apiHelpers.dataToForm({ description })
    )
    return response.data
  },
}
