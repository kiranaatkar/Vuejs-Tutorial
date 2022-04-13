<template>
  <header>
    <h1>{{ title }}</h1>
    <MyButton
      v-show="onHomePage"
      @btn-click="$emit('toggle-add-task')"
      :text="showAddTask ? 'Close' : 'Add Task'"
      :color="showAddTask ? 'red' : 'green'"
    />
  </header>
</template>

<script>
import MyButton from './Button';

export default {
  name: 'myHeader',
  props: {
    title: String,
    showAddTask: Boolean,
  },
  components: {
    MyButton,
  },
  computed: {
    onHomePage() {
      return this.$route.path === '/';
    },
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
