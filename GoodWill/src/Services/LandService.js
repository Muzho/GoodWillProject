import Api from '@/services/Api'

export default {
  AddLand (credentials) {
    return Api().post('AddLand', credentials)
  },
  singleImageUpload (credentials) {
    return Api().post('singleImageUpload', credentials)
  },
  multiImageUpload (credentials) {
    return Api().post('multiImageUpload', credentials)
  },
  properties (credentials) {
    return Api().get('lands')
  },
  delete_prop (credentials) {
    return Api().delete('delete_prop/' + credentials.prop_id)
  },
  edit_prop (credentials) {
    return Api().put('edit_prop', credentials)
  }
}
