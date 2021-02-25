<template>
  <base-card class="emailCard">
    <p>{{ user.email }}</p>
  </base-card>

  <base-card :class="isLoading ? ' ' : 'container'">
    <base-spinner v-if="isLoading"></base-spinner>
    <dog-item
      v-for="like in likes"
      :key="like"
      class="cards"
      :url="like"
      :breed="breed"
    ></dog-item>
  </base-card>
</template>

<script>
import DogItem from '../components/UI/DogItem.vue'
export default {
  components: { DogItem },
  data() {
    return {
      user: {},
      isLoading: false,
    }
  },
  methods: {
    async fetchUsers() {
      await this.$store.dispatch('users/fetchUsers')
    },
  },
  computed: {
    breed() {
      return 'aaaa'
    },
    likes() {
      return this.user.likes
    },
  },
  async beforeMount() {
    this.isLoading = true
    await this.fetchUsers()
    const userId = localStorage.getItem('userId')
    this.user = this.$store.getters['users/users'].find(
      (u) => u.userId == userId
    )
    if (
      typeof this.user.likes === 'undefined' ||
      (this.user.likes.includes('') && this.user.likes.length == 1)
    ) {
      this.user.likes = []
    } else {
      this.user.likes = this.user.likes.filter((like) => like !== '')
    }
    this.isLoading = false
  },
}
</script>

<style scoped>
.emailCard {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 15rem;
  font-size: 3rem;
  flex-direction: row;
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
  }
  .container ul {
    max-width: fit-content;
    margin: 0;
  }
  .card {
    margin: 2rem 0.5rem !important;
  }
  .cards:nth-child(odd) {
    grid-column: auto;
  }
  .emailCard p {
    font-size: 2rem;
  }
}
</style>
