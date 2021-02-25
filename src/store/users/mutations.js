export default {
  newLike(state, payload) {
    state.users.forEach((user) => {
      if (user.email == payload.email) {
        if (typeof user.likes === 'undefined') {
          user.likes = [payload.url]
        } else {
          user.likes = [...user.likes, payload.url]
        }
      }
    })
  },
  removeLike(state, payload) {
    state.users.forEach((user) => {
      if (user.email == payload.email) {
        var likes = [...user.likes]
        const index = likes.indexOf(payload.url)
        likes.splice(index, 1)
        user.likes = likes
      }
    })
  },
  registerUser(state, payload) {
    state.users.push(payload)
  },
  setUsers(state, payload) {
    state.users = payload
  },
  setFetchTimestamp(state) {
    state.lastFetch = new Date().getTime()
  },
}
