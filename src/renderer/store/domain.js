export default {
  namespaced: true,
  state: () => ({
    scope: 'https',
    domain: '',
    persistent: ''
  }),
  mutations: {
    setScope (state, scope) {
      state.scope = scope
    },
    setDomain (state, domain) {
      state.domain = domain
    }
  },
  getters: {
    domain: state => state.domain,
    hostname: (state) => {
      return `${state.scope}://${state.domain}`
    }
  }
}
