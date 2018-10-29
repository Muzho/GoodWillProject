import Api from '@/services/Api'

export default {
  PropertyTypes () {
    return Api().get('PropertyTypes')
  },
  PropertyCategories () {
    return Api().get('PropertyCategories')
  }
}
