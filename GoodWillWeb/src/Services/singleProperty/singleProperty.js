import Api from '@/services/Api'

export default {
  property (credentials) {
    return Api().get('singleProp/' + credentials.propID)
  },
  PropFacFea (credentials) {
    return Api().get('SinglePropFacFea/' + credentials.propID)
  },
  propImages (credentials) {
    return Api().get('propImages/' + credentials.propID)
  }
}
