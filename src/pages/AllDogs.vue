<template>
  <div class="searchBar">
    <the-search-bar @submit-form="chooseBreed"></the-search-bar>
  </div>
  <section>
    <base-spinner v-if="isLoading"></base-spinner>
    <ul v-else class="container">
      <dog-item
        v-for="dog in dogs"
        :key="dog"
        class="cards"
        :url="dog"
        :breed="breed"
      ></dog-item>
    </ul>
  </section>
</template>

<script>
import DogItem from '../components/UI/DogItem.vue'
import TheSearchBar from '../components/UI/TheSearchBar.vue'
export default {
  components: { DogItem, TheSearchBar },
  data() {
    return {
      isSpliced: false,
      chosenBreed: null,
      isLoading: false,
    }
  },
  computed: {
    dogs() {
      return this.$store.getters['dogs/dogs']
    },
  },
  methods: {
    async fetchUsers() {
      await this.$store.dispatch('users/fetchUsers')
    },
    async fetchDogs() {
      const breed = this.$store.getters['dogs/chosenBreed']
      if (breed !== '') {
        if (breed.includes('-')) {
          this.isSpliced = true
        }
        await this.$store.dispatch('dogs/fetchDogs', {
          breed: breed,
          isSpliced: this.isSpliced,
        })
      }
    },
    async chooseBreed(breed) {
      this.breed = breed
      this.$store.dispatch('dogs/chooseBreed', breed)
      this.isSpliced = false
      await this.fetchDogs()
    },
  },
  async beforeMount() {
    this.isLoading = true
    await this.fetchUsers()
    console.log(this.$store.getters['users/users'])
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
    this.isLoading = false
  },
}
</script>

<style scoped>
.searchBar {
  margin: 3rem 10rem;
  position: relative;
}

.container {
  display: grid;
  grid-template-columns: 1fr 2fr 2fr 1fr;
  grid-auto-rows: minmax(25rem, auto);
  grid-gap: 2rem 2rem;
  margin: 0 3rem;
  padding: 0;
}

.cards:nth-child(odd) {
  grid-column: 2/3;
}

@media only screen and (max-width: 768px) {
  .container {
    grid-template-columns: 1fr;
    margin: 0;
  }
  .cards:nth-child(odd) {
    grid-column: auto;
  }

  .card {
    margin: auto;
    width: 100%;
  }

  .searchBar {
    height: 7rem;
    margin: 0;
  }
}
</style>
