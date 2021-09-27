import VuexPersistence from 'vuex-persist'

export default ({ store }) => {
  new VuexPersistence({
    modules: ['domain'],
    reducer: (state) => {
      return {
        domain: {
          persistent: state.domain.persistent
        }
      }
    },
    storage: window.localStorage
  }).plugin(store)
}
