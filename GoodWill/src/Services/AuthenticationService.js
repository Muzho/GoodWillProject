import Api from '@/services/Api'

export default {
  Register (credentials) {
    return Api().post('AdminRegister', credentials)
  },
  Login (credentials) {
    return Api().post('userLogin', credentials)
  }
}
