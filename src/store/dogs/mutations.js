export default {
  chooseBreed(state, payload) {
    state.chosenBreed = payload
  },
  fetchDogs(state, payload) {
    state.dogs = payload
  },
}
