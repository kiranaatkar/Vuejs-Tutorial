<template>
  <header>
    <h1>{{ title }}</h1>
    <myButton
      @btn-click="$emit('toggle-add-task')"
      :text="showAddTask ? 'Close' : 'Add Task'"
      :color="showAddTask ? 'red' : 'green'"
    />
  </header>
</template>

<script>
import myButton from './Button';

export default {
  name: 'myHeader',
  props: {
    title: String,
    showAddTask: Boolean,
  },
  components: {
    myButton,
  },
};
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
</style>
