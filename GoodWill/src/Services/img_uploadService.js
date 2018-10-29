import Api from '@/services/Api'

export default {
  singleImageUpload (credentials) {
    return Api().post('singleImageUpload', credentials)
  },
  multiImageUpload (credentials) {
    return Api().post('multiImageUpload', credentials)
  }
}
