<template>
  <div class="container">
    <div class="content">
      <form @submit.prevent="addTask">
        <div class="form-control">
          <label for="task">Task description:</label>
          <input id="task" type="text" v-model="taskDescription" />
          <button class="btn-add">add task</button>
        </div>
      </form>
      <div>
          <TaskList
            :tasks="tasks"
            @delete="handleDelete"
            @complete="handleComplete"
          />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import TaskList from './components/TaskList.vue';
import Task from 'src/types/Task';



export default defineComponent({
  components: { TaskList },
  setup() {
        const tasks = ref<Task[]>([]);
        const taskDescription = ref('');

        const getData = async () => {
            const res = await fetch('http://localhost:3000/tasks');
            const data = await res.json();
            tasks.value = data;
        }

        const addTask = async () => {
          const res = await fetch('http://localhost:3000/tasks', {
            method: 'POST',
            headers: {
              'content-type': 'application/json;charset=UTF-8',
            },
            body: JSON.stringify({ description: taskDescription.value, completed: false })
          });

          const { data } = await res.json();

          tasks.value.push(data.task);

          taskDescription.value = '';

        }

        const handleDelete = (id: number) => {
          const taskId = tasks.value.findIndex(task => task.id === id);
          tasks.value.splice(taskId, 1);
        }

        const handleComplete = (id: number, completedStatus: boolean) => {
          const task = tasks.value.find(task => task.id === id);
          if (task) {
            task.completed = completedStatus;
          }
        }

        getData();

        return { tasks, taskDescription, addTask, handleDelete, handleComplete }; 
  },
})
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  align-items: center;

}

.content {
  width: 75%;
}

form {
  margin-top: 64px;
  margin-bottom: 64px;
}

.form-control {
  display: flex;
  gap: 16px;
  align-items: center;
  font-size: 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid #333;
}

.form-control input{
  height: 30px;
  padding: 5px;
}

.btn-add {
  background-color: rgb(39, 136, 255);
  color: #fff;
}

</style>
