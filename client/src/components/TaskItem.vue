<template>
    <div class="task">
        <h2>{{ task.description }}</h2>
        <p>{{ task.completed }}</p>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: ['task'],
    setup() {
        
    },
})
</script>

<style scoped>

</style>