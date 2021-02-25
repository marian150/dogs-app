export default {
  chooseBreed(context, payload) {
    context.commit('chooseBreed', payload)
  },
  async fetchDogs(context, payload) {
    var breed = ''
    var type = ''
    var array = []
    if (payload.isSpliced) {
      const idx = payload.breed.indexOf('-')
      breed = payload.breed.slice(idx + 1, payload.breed.length)
      type = payload.breed.slice(0, idx)
    } else {
      breed = payload.breed
    }
    const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`)

    const responseData = await response.json()

    if (!response.ok) {
      const error = new Error('Unable to fetch dogs')
      throw error
    }

    if (responseData.message.length < 10) {
      context.commit('fetchDogs', responseData.message)
    } else {
      if (payload.isSpliced) {
        array = responseData.message.filter((dog) => dog.includes(type))
      }
      array = responseData.message
      const minForMin = 0
      const maxForMin = responseData.message.length - 10
      const min = Math.random() * (maxForMin - minForMin) + minForMin
      const spliced = array.splice(min, 10)
      context.commit('fetchDogs', spliced)
    }
  },
}
