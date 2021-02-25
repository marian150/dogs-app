<template>
  <div class="card">
    <form @submit.prevent="submitForm">
      <div class="form-control">
        <label for="email">E-Mail</label>
        <input v-model.trim="email" id="email" type="email" />
      </div>
      <div class="form-control">
        <label for="password">Password</label>
        <input v-model.trim="password" id="password" type="password" />
      </div>
      <p style="color: red;" v-if="!!error">{{ error }}</p>
      <base-button>Login</base-button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      error: '',
    }
  },
  methods: {
    async submitForm() {
      try {
        await this.$store.dispatch('auth/login', {
          email: this.email,
          password: this.password,
        })
        this.$router.replace(`/dogs`)
      } catch (err) {
        this.error = err.message || 'Failed to register, try again later.'
      }
    },
  },
}
</script>

<style scoped>
.card {
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  margin: 2rem auto;
  max-width: 40rem;
}
form {
  margin: 1rem;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus {
  border-color: #fb9a40;
  background-color: #a3f3eb;
  outline: none;
}

button {
  margin: 0 !important;
}
</style>
