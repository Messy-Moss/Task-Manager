<template>
    <ul>
        <li v-for="task in tasks" :key="task.id">
            <TaskItem 
                :task="task"
                @deleteTask="handleDelete"
                @completeTask="handleComplete"
            />
        </li>
    </ul>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from 'vue'
import TaskItem from './TaskItem.vue';
import Task from 'src/types/Task';

export default defineComponent({
    components: { TaskItem },
    props: {
        tasks: {
            required: true,
            type: Array as PropType<Task[]>
        }
    },
    setup(_props, { emit }) {
        const handleDelete = async (task: Task) => {

            await fetch(`http://localhost:3000/tasks/${task.id}`, {
                method: 'DELETE'
            });

            emit('delete', task.id);
        }

        const handleComplete = async (task: Task) => {

            const res = await fetch(`http://localhost:3000/tasks/${task.id}`, {
                method: 'PATCH',
                body: JSON.stringify({ completed: !task.completed }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            });

            const data = await res.json();

            emit('complete', task.id, !task.completed);
        }

        return { handleDelete, handleComplete }
    }
})
</script>

<style scoped>

</style>