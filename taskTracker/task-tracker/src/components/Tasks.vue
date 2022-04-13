<template>
  <div>
    <div :key="task.id" v-for="task in tasks">
      <MyTask
        @toggle-reminder="$emit('toggle-reminder', task.id)"
        @delete-task="$emit('delete-task', task.id)"
        :task="task"
      />
    </div>
  </div>
</template>

<script>
import MyTask from './Task.vue';
export default {
  name: 'MyTasks',
  props: {
    tasks: Array,
  },
  components: {
    MyTask,
  },
  emite: ['delete-task', 'toggle-reminder'],
};
</script>
