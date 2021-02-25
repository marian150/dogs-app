<template>
  <li>
    <base-card>
      <img :src="url" alt="Avatar" />
      <div class="wrapper">
        <div class="container">
          <h4>
            <a :href="url">See picture</a>
          </h4>
          <p>{{ breed }}</p>
        </div>
        <base-button v-if="!isLiked" @click="toggleLike">Like</base-button>
        <base-button class="unlike" v-else @click="toggleLike"
          >Unlike</base-button
        >
      </div>
    </base-card>
  </li>
</template>

<script>
export default {
  props: ['url'],
  data() {
    return {
      isAuthenticated: false,
    }
  },
  computed: {
    breed() {
      const index = this.url.indexOf('/', 31)
      return this.url.slice(30, index)
    },
    isLiked() {
      if (!this.isAuthenticated) {
        return false
      } else {
        const userId = localStorage.getItem('userId')
        const user = this.$store.getters['users/users'].find(
          (u) => u.userId == userId
        )
        if (typeof user.likes === 'undefined') {
          return
        } else {
          return !!user.likes.find((dog) => dog == this.url)
        }
      }
    },
  },
  methods: {
    toggleLike() {
      if (!this.isAuthenticated) {
        this.$router.replace('/login')
      } else {
        if (this.isLiked) {
          this.$store.dispatch('users/removeLike', {
            userId: localStorage.getItem('userId'),
            url: this.url,
          })
        } else {
          this.$store.dispatch('users/newLike', {
            userId: localStorage.getItem('userId'),
            url: this.url,
          })
        }
      }
    },
  },
  beforeMount() {
    this.isAuthenticated = this.$store.getters['auth/isAuthenticated']
  },
}
</script>

<style scoped>
li {
  list-style: none;
}
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  border-radius: 5px;
  width: 100%;
}

.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

img {
  border-radius: 5px 5px 0 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.2);
}

.container {
  padding: 2px 16px;
}
.wrapper {
  display: flex;
  justify-content: space-between;
}
.unlike:hover {
  background-color: #fb9a40;
}
@media only screen and (max-width: 768px) {
  .card {
    max-width: fit-content;
  }
}
</style>
