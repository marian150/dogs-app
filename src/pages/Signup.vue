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
      <p class="error" v-if="!formIsValid">
        Please enter a valid email and password(must be at least 6 characters
        long).
      </p>
      <base-button>Signup</base-button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      formIsValid: true,
      mode: '',
      error: null,
    }
  },
  methods: {
    handleError() {
      this.error = null
    },
    async submitForm() {
      this.formIsValid = true
      if (
        this.email === '' ||
        !this.email.includes('@') ||
        this.password.length < 6
      ) {
        this.formIsValid = false
        return
      }
      try {
        await this.$store.dispatch('auth/signup', {
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

.error {
  color: red;
}
</style>
