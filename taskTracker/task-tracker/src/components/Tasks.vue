<template>
  <div>
    <div :key="task.id" v-for="task in tasks">
      <myTask
        @toggle-reminder="$emit('toggle-reminder', task.id)"
        @delete-task="$emit('delete-task', task.id)"
        :task="task"
      />
    </div>
  </div>
</template>

<script>
import myTask from './Task.vue';
export default {
  name: 'myTasks',
  props: {
    tasks: Array,
  },
  components: {
    myTask,
  },
  emite: ['delete-task', 'toggle-reminder'],
};
</script>
