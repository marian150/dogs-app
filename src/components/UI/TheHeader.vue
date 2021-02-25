<template>
  <header>
    <nav>
      <ul>
        <li>
          <router-link to="/dogs">All Dogs</router-link>
        </li>
        <li v-if="isLoggedIn">
          <router-link to="/likes">My Likes</router-link>
        </li>
        <li v-if="!isLoggedIn">
          <router-link to="/signup">Signup</router-link>
        </li>
        <li v-if="!isLoggedIn">
          <router-link to="/login">Login</router-link>
        </li>
      </ul>
    </nav>
    <button @click="logout" v-if="isLoggedIn">Logout</button>
  </header>
</template>

<script>
export default {
  computed: {
    isLoggedIn() {
      return this.$store.getters['auth/isAuthenticated']
    },
  },
  methods: {
    async logout() {
      this.$store.dispatch('auth/logout')
      const breeds = this.$store.getters['dogs/breeds']
      const breed = breeds[Math.floor(Math.random() * breeds.length)]
      if (breed.includes('-')) {
        this.isSpliced = true
      }
      this.breed = breed
      await this.$store.dispatch('dogs/fetchDogs', {
        breed: breed,
        isSpliced: this.isSpliced,
      })
      this.$router.replace('/dogs')
    },
  },
}
</script>

<style scoped>
header {
  display: flex;
  background-color: #fb9a40;
  overflow: hidden;
  width: 100%;
  height: 5rem;
}

header nav {
  margin: auto;
  display: flex;
}

header ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.burger {
  display: none;
  padding: 0.2rem;
}

button {
  align-self: center;
  margin-right: 2rem;
  background-color: #f1ffab;
  text-align: center;
  padding: 0.75rem 1.5rem;
  text-decoration: none;
  font-size: 17px;
  transition: 0.3s;
  border-radius: 0.5rem;
}

button:hover {
  background-color: #a3f3eb;
  color: black;
  cursor: pointer;
}

a {
  color: #f1ffab;
  text-align: center;
  padding: 0.75rem 1.5rem;
  text-decoration: none;
  font-size: 17px;
  transition: 0.3s;
  border-radius: 0.5rem;
}

li {
  margin: 0 0.5rem;
}

/* Change the color of links on hover */
header a:hover,
header a:active,
header a.router-link-active {
  border-radius: 0.5rem;
  background-color: #a3f3eb;
  color: black;
}

@media screen and (max-width: 450px) {
  ul {
    top: 0;
    left: 0;
    margin: 0;
    max-width: fit-content;
    height: 5rem;
    position: absolute;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  ul .li {
    display: block;
  }

  button {
    margin: 1rem;
  }
}
</style>
