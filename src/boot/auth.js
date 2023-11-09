import { VueJwtAuth, AxiosHttpDriver } from '@mspiderv/vuejwtauth'

export default ({ Vue, store, router }) => new VueJwtAuth({
  Vue,
  router,
  store,
  options: { // optional
    drivers: {
      http: new AxiosHttpDriver({
        // Your API URL here
        apiBaseURL: 'http://127.0.0.1:3000/api/'
      })
    }
  }
})
