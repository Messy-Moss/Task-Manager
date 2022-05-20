<template>
    <div class="task" :class="{ completed: task.completed }">
        <h2>{{ task.description }}</h2>
        <div class="utils">
            <button class="btn-delete" @click="handleDelete">delete</button>
            <button class="btn-complete" @click="handleComplete">toggle completed</button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Task from 'src/types/Task';

export default defineComponent({
    props: {
        task: {
            required: true,
            type: Object as PropType<Task>
        }
    },
    setup(props, { emit }) {

        const handleDelete = () => {
            emit('deleteTask', props.task);
        }

        const handleComplete = () => {
            emit('completeTask', props.task);
        }

        return { handleDelete, handleComplete };
    },
})
</script>

<style scoped>
.task {
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* border: 1px solid black; */
    background-color: #eee;
    margin-bottom: 24px;
    padding: 16px 0 16px 24px;
    border-left: 10px solid crimson
}

.task .utils {
    display: flex;
    gap: 20px;
    padding-right: 16px;
}

.btn-delete {
    background-color: crimson;
    color: #fff;
    border-radius: 3px;
    font-weight: 400;
}

.btn-complete {
    background-color: rgb(0, 161, 0);
    color: #fff;
    border-radius: 3px;
    font-weight: 400;
}

.completed {
    border-left: 10px solid rgb(0, 161, 0);
}

</style>