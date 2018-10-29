import Api from '@/services/Api'

export default {
  AddCountry (credentials) {
    return Api().post('AddCountry', credentials)
  },
  Countries (credentials) {
    return Api().get('Countries')
  },
  delete_country (credentials) {
    return Api().delete('delete_country/' + credentials.country_id)
  },
  edit_country (credentials) {
    return Api().put('edit_country', credentials)
  },
  add_region (credentials) {
    return Api().post('AddRegion', credentials)
  },
  Regions () {
    return Api().get('Regions')
  },
  delete_region (credentials) {
    return Api().delete('delete_region/' + credentials.region_id + '/' + credentials.country_id)
  },
  edit_region (credentials) {
    return Api().put('edit_region', credentials)
  },
  add_city (credentials) {
    return Api().post('AddCity', credentials)
  },
  delete_city (credentials) {
    return Api().delete('delete_city/' + credentials.city_id + '/' + credentials.region_id)
  },
  edit_city (credentials) {
    return Api().put('edit_city', credentials)
  },
  cities () {
    return Api().get('Cities')
  },
  add_area (credentials) {
    return Api().post('AddArea', credentials)
  },
  delete_area (credentials) {
    return Api().delete('delete_area/' + credentials.area_id + '/' + credentials.city_id)
  },
  edit_area (credentials) {
    return Api().put('edit_area', credentials)
  },
  areas () {
    return Api().get('Areas')
  }
}
