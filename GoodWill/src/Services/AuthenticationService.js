import Api from '@/services/Api'

export default {
  Register (credentials) {
    return Api().post('AdminRegister', credentials)
  },
  Login (credentials) {
    return Api().post('userLogin', credentials)
  },
  editUserProfile (credentials) {
    return Api().post('editUserProfile', credentials)
  },
  changeUsername (credentials) {
    return Api().post('changeUsername', credentials)
  },
  changeUserPassword (credentials) {
    return Api().post('changeUserPassword', credentials)
  }
}
