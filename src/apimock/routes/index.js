import { accounts } from "./accounts"
import { todos } from "./todos"

export const routes = function () {
  accounts(this), todos(this)
}
