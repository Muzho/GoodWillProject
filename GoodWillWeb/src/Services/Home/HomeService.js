import Api from '@/services/Api'

export default {
  properties (credentials) {
    return Api().get('lands')
  }
}
