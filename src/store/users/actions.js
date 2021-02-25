export default {
  async newLike({ commit, getters }, payload) {
    const userId = localStorage.getItem('userId')
    const user = getters.users.find((u) => u.userId == userId)
    var likes = []
    if (typeof user.likes === 'undefined') {
      likes = [payload.url]
    } else {
      likes = [...user.likes]
      likes.push(payload.url)
    }

    const response = await fetch(
      `https://vue-dogs-258aa-default-rtdb.firebaseio.com/users/${userId}.json`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          likes: likes,
        }),
      }
    )

    const responseData = await response.json()

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to fetch')
      throw error
    }

    commit('newLike', {
      url: payload.url,
      email: user.email,
    })
  },
  async removeLike({ commit, getters }, payload) {
    const userId = localStorage.getItem('userId')
    const user = getters.users.find((u) => u.userId == userId)
    var likes = [...user.likes]
    const index = likes.indexOf(payload.url)
    likes.splice(index, 1)

    const response = await fetch(
      `https://vue-dogs-258aa-default-rtdb.firebaseio.com/users/${userId}.json`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          likes: likes,
        }),
      }
    )

    const responseData = await response.json()

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to fetch')
      throw error
    }
    commit('removeLike', {
      url: payload.url,
      email: user.email,
    })
  },
  registerUser(context, payload) {
    context.commit('registerUser', payload)
  },
  async fetchUsers(context) {
    const response = await fetch(
      `https://vue-dogs-258aa-default-rtdb.firebaseio.com/users.json`
    )

    const responseData = await response.json()

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to fetch')
      throw error
    }

    const users = []
    for (const key in responseData) {
      const user = {
        userId: responseData[key].userId,
        email: responseData[key].email,
        password: responseData[key].password,
        likes: responseData[key].likes,
      }

      users.push(user)
    }
    context.commit('setUsers', users)
    context.commit('setFetchTimestamp')
  },
}
