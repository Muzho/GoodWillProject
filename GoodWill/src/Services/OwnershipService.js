import Api from '@/services/Api'

export default {
  AddOwner (credentials) {
    return Api().post('AddOwner', credentials)
  },
  Owners (credentials) {
    return Api().get('owners')
  },
  delete_owner (credentials) {
    return Api().delete('delete_owner/' + credentials.owner_id)
  },
  edit_owner (credentials) {
    return Api().put('edit_owner', credentials)
  },
  singleUserAccount (credentials) {
    return Api().get('singleUserAccount/' + credentials.userID)
  }
}
