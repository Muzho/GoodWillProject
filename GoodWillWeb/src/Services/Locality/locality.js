import Api from '@/services/Api'

export default {
  areaProperties (credentials) {
    return Api().get('areaProperties/' + credentials.area + '/' + credentials.category + '/' + credentials.type)
  },
  cityProperties (credentials) {
    return Api().get('cityProperties/' + credentials.city + '/' + credentials.category + '/' + credentials.type)
  },
  regionProperties (credentials) {
    return Api().get('regionProperties/' + credentials.region)
  }
}
