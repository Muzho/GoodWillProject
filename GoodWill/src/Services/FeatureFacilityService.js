import Api from '@/services/Api'

export default {
  PropertyTypes () {
    return Api().get('PropertyTypes')
  },
  AddFacility (credentials) {
    return Api().post('AddFacility', credentials)
  },
  Facilities () {
    return Api().get('facilities')
  },
  delete_facility (credentials) {
    return Api().delete('delete_facility/' + credentials.facility_id + '/' + credentials.category)
  },
  edit_facility (credentials) {
    return Api().put('edit_facility', credentials)
  },
  add_feature (credentials) {
    return Api().post('AddFeature', credentials)
  },
  Features () {
    return Api().get('features')
  },
  delete_feature (credentials) {
    return Api().delete('delete_feature/' + credentials.feature_id + '/' + credentials.category)
  },
  edit_feature (credentials) {
    return Api().put('edit_feature', credentials)
  }
}
