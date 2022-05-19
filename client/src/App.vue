<template>
  <div>
    <ul>
      <li v-for="task in tasks" :key="task.id">
        <TaskItem :task="task" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import TaskItem from './components/TaskItem.vue';

interface Task {
  id: number;
  description: string;
  completed: boolean;
}

export default defineComponent({
  components: {TaskItem},
  setup() {

    const tasks = ref<Task[]>([]);

    const getData = async () => {
      const res = await fetch('http://localhost:3000/tasks');
      const data = await res.json();
      tasks.value = data;
    }

    getData();

    return { tasks };

  },
})
</script>

<style scoped>

</style>
