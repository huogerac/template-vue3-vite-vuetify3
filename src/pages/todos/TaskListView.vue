<template>
  <v-container class="fill-height">
    <v-row justify="center" align="center">
      <v-col cols="12">
        <v-card>
          <v-card-title class="headline"> Tasks </v-card-title>
        </v-card>
      </v-col>

      <v-col cols="12">
        <task-form :form-label="'New Task'" @new-task="addNewTask" />
      </v-col>

      <v-col v-for="item in tasks" :key="item.id" cols="12">
        <task :task="item" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "pinia"
import { useBaseStore } from "@/stores/baseStore"
import { usetodosStore } from "@/stores/todosStore"
import Task from "@/components/Task.vue"
import TaskForm from "@/components/TaskForm.vue"

export default {
  name: "TasksList",
  components: { Task, TaskForm },
  setup() {
    const baseStore = useBaseStore()
    const todosStore = usetodosStore()
    return { baseStore, todosStore }
  },
  computed: {
    ...mapState(usetodosStore, ["tasks", "tasksLoading"]),
  },
  mounted() {
    this.getTasks()
  },
  methods: {
    getTasks() {
      this.todosStore.getTasks()
    },
    async addNewTask(task) {
      const newTask = await this.todosStore.addNewTask(task)
      this.baseStore.showSnackbar(`New task added #${ newTask.id }`)
      this.getTasks()
    },
  },
}
</script>

<style scoped>
.done {
  text-decoration: line-through;
}
</style>
