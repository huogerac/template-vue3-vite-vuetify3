import { Response } from "miragejs"
import Cookies from "js-cookie"

const getUserFromCookies = (schema) => {
  const userId = Cookies.get("sessionid")
  if (!userId) {
    return
  }
  return schema.users.find(userId)
}

export const todos = function (server) {
  server.config({
    routes() {
      this.namespace = "/api/todos/"

      this.get("/tasks/list", function (schema) {
        const loggedUser = getUserFromCookies(schema)
        if (!loggedUser) {
          return new Response(401, {}, "Header de segurança não encontrado")
        }
        return new Response(200, {}, schema.tasks.all())
      })

      this.post("/tasks/add", function (schema, request) {
        const description = request.requestBody.get("description")
        const loggedUser = getUserFromCookies(schema)
        if (!loggedUser) {
          return new Response(401, {}, "Header de segurança não encontrado")
        }
        let newTask = schema.tasks.create({
          description,
          userId: loggedUser.id,
        })
        return new Response(200, {}, newTask.attrs)
      })
    },
  })
}
