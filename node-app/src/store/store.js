const state = {
  isAdmin: false
}

const getters = {
  getIsAdmin: state => state.isAdmin,
}

const actions = {
  setIsAdmin ({ commit }) {
    commit('setIsAdmin')
  },

  noAdmin({ commit }) {
    commit('noAdmin')
  }
}

const mutations = {
  setIsAdmin (state) {
    state.isAdmin = true
    console.log(state.isAdmin)
    localStorage.setItem('isAdmin', state.isAdmin)
  },

  noAdmin (state) {
    state.isAdmin = false
    console.log(state.isAdmin)
    localStorage.setItem('isAdmin', state.isAdmin)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
