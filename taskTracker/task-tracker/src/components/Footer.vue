<template>
  <footer>
    <p>Copyright &copy; 2021</p>
    <router-link v-show="onHomePage" to="/about">About</router-link>
  </footer>
</template>

<script>
export default {
  name: 'MyFooter',
  computed: {
    onHomePage() {
      return this.$route.path === '/';
    },
  },
};
</script>

<style scoped>
a {
  color: #333;
}

footer {
  margin-top: 30px;
  text-align: center;
}
</style>
