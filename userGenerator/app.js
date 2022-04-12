const app = Vue.createApp({
  data() {
    return {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@gmail.com',
      gender: 'male',
      picture: 'https://randomuser.me/api/portraits/men/10.jpg',
    };
  },
  methods: {
    async getUser() {
      const response = await fetch('https://randomuser.me/api');
      const { results } = await response.json();
      const { name, gender, email, picture } = results[0];
      this.firstName = name.first;
      this.lastName = name.last;
      this.email = email;
      this.gender = gender;
      this.picture = picture.large;
    },
  },
});

app.mount('#app'); // mounts to div on index.html with id app
