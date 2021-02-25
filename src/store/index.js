import { createStore } from 'vuex'

import dogsModule from './dogs/index.js'
import usersModule from './users/index.js'
import authModule from './auth/index.js'

const store = createStore({
  modules: {
    dogs: dogsModule,
    users: usersModule,
    auth: authModule,
  },
})

export default store
