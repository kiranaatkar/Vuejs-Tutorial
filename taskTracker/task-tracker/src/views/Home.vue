<template>
  <div>
    <AddTask v-show="showAddTask" @add-task="addTask" />
    <MyTasks @toggle-reminder="toggleReminder" @delete-task="deleteTask" :tasks="tasks" />
  </div>
</template>

<script>
import MyTasks from '../components/Tasks';
import AddTask from '../components/AddTask';

export default {
  name: 'HomePage',
  props: {
    showAddTask: Boolean,
  },
  components: {
    MyTasks,
    AddTask,
  },
  data() {
    return {
      tasks: [],
    };
  },
  methods: {
    async addTask(newTask) {
      const response = await fetch('api/tasks', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(newTask),
      });

      const data = await response.json();
      this.tasks = [...this.tasks, data];
    },

    async deleteTask(id) {
      if (confirm('Are you sure?')) {
        const response = await fetch(`api/tasks/${id}`, {
          method: 'DELETE',
        });
        if (response.status === 200) {
          this.tasks = this.tasks.filter((task) => task.id !== id);
        } else {
          alert('Error deleting task');
        }
      }
    },

    async toggleReminder(id) {
      const taskToToggle = await this.fetchTask(id);
      const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

      const response = await fetch(`api/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(updTask),
      });

      const data = await response.json();
      this.tasks = this.tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      );
    },
    async fetchTasks() {
      const response = await fetch('api/tasks');
      const data = await response.json();
      return data;
    },
    async fetchTask(id) {
      const response = await fetch(`api/tasks/${id}`);
      const data = await response.json();
      return data;
    },
  },
  async created() {
    this.tasks = await this.fetchTasks();
  },
};
</script>
