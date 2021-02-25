<template>
  <the-header></the-header>
  <router-view></router-view>
</template>

<script>
import TheHeader from './components/UI/TheHeader.vue'
export default {
  components: { TheHeader },
  async beforeMount() {
    this.$store.dispatch('auth/autoLogin')
    await this.fetchUsers()
  },
  methods: {
    async fetchUsers() {
      await this.$store.dispatch('users/fetchUsers')
    },
  },
  computed: {
    didAutoLogout() {
      return this.$store.getters['auth/didLogout']
    },
  },
  watch: {
    didAutoLogout(newValue, oldValue) {
      if (newValue && newValue !== oldValue) {
        this.$router.replace('/dogs')
      }
    },
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

html {
  font-family: 'Roboto', sans-serif;
}
body {
  margin: 0;
}
</style>
