<template>
  <form @submit.prevent="submitForm" autocomplete="off">
    <input
      @keydown.down="goDown"
      @keydown.up="goUp"
      @keydown.enter="chooseValueEnter"
      @blur="toggleAutocomplete"
      @focus="toggleAutocomplete"
      v-model="searchedBreed"
      type="text"
      name="search"
      placeholder="Search by breed.."
      ref="sBar"
    />
    <div
      v-if="searchBarFocused"
      id="autocom-div"
      :class="breeds.length > 7 ? 'autocom' : ''"
      ref="autocom"
    >
      <ul>
        <li
          v-for="(breed, index) in breeds"
          :key="index"
          :class="index == currentFocus ? 'active' : ''"
          :ref="breed"
          @mousedown="chosenSearchValue(breed)"
        >
          {{ breed }}
        </li>
      </ul>
    </div>
  </form>
</template>

<script>
export default {
  emits: ['submit-form'],
  data() {
    return {
      isFocused: false,
      searchBarFocused: false,
      searchedBreed: '',
      currentFocus: -1,
    }
  },
  methods: {
    submitForm() {
      this.$emit('submit-form', this.searchedBreed)
      const input = this.$refs['sBar']
      input.blur()
    },
    toggleAutocomplete() {
      this.currentFocus = -1
      this.searchBarFocused = !this.searchBarFocused
    },
    chosenSearchValue(breed) {
      this.searchedBreed = breed
      this.submitForm()
    },
    chooseValueEnter() {
      if (this.currentFocus !== -1) {
        this.searchedBreed = this.breeds[this.currentFocus]
      }
    },
    goDown() {
      if (this.currentFocus === this.breeds.length - 1) {
        this.currentFocus = 0
      } else {
        this.currentFocus++
      }
    },
    goUp() {
      if (this.currentFocus === 0) {
        this.currentFocus = this.breeds.length - 1
      } else {
        this.currentFocus--
      }
    },
  },
  computed: {
    breeds() {
      return this.$store.getters['dogs/breeds'].filter((breed) =>
        breed.includes(this.searchedBreed)
      )
    },
  },
  watch: {
    searchedBreed() {
      this.currentFocus = -1
    },
    currentFocus() {
      const li = this.$refs[`${this.breeds[this.currentFocus]}`]
      const div = this.$refs['autocom']
      if (typeof li !== 'undefined') {
        div.scrollTop = li.offsetTop - 50
      }
    },
  },
}
</script>

<style scoped>
form {
  width: 100%;

  height: 6rem;
}

input[type='text'] {
  font-size: 1rem;
  height: 3rem;
  width: 20rem;
  border-radius: 0.7rem;
  background-color: #f1ffab;
  background-image: url('../../assets/search--v2.png');
  background-repeat: no-repeat;
  background-position: right;
  -webkit-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}

input[type='text']:focus {
  font-size: 1.5rem;
  background-position: right;
  width: 100%;
}

#autocom-div {
  border: 1px solid #d4d4d4;
  border-bottom: none;
  border-top: none;
  background: white;
  display: block;
}

.autocom {
  height: 20rem;
  overflow-y: auto;
}

ul {
  position: inherit;
  z-index: 99;
}

li:hover {
  background: #efefef;
}

li {
  background-color: white;
  list-style: none;
  padding: 10px;
  cursor: pointer;
  display: block;
  border-bottom: 1px solid #d4d4d4;
}

.active {
  background-color: #a3f3eb;
}

@media only screen and (max-width: 768px) {
  form {
    width: fit-content;
    margin: 2rem;
  }
  input[type='text']:focus {
    width: 20rem;
    font-size: 1rem;
  }
}
</style>
