import Api from '@/services/Api'

export default {
  property (credentials) {
    return Api().get('singleProp/' + credentials.propID)
  },
  PropFacFea (credentials) {
    return Api().get('SinglePropFacFea/' + credentials.propID)
  },
  propOwner (credentials) {
    return Api().get('PropOwner/' + credentials.propID)
  },
  propImages (credentials) {
    return Api().get('propImages/' + credentials.propID)
  },
  changeOwner (credentials) {
    return Api().put('changeOwner/' + credentials.owner + '/' + credentials.propID)
  },
  singleImageUpload (credentials) {
    return Api().post('singleImageUpload', credentials)
  },
  multiImageUpload (credentials) {
    return Api().post('multiImageUpload', credentials)
  },
  changeTileImage (credentials) {
    return Api().post('changeTileImage', credentials)
  },
  addPropertyImages (credentials) {
    return Api().post('addPropertyImages', credentials)
  },
  deletePropertyFacility (credentials) {
    return Api().delete('deletePropFacility/' + credentials.propID + '/' + credentials.facilityID)
  },
  deletePropertyFeature (credentials) {
    return Api().delete('deletePropFeature/' + credentials.propID + '/' + credentials.featureID)
  },
  editProperty (credentials) {
    return Api().put('editSingleProperty', credentials)
  },
  addPropertyFeatures (credentials) {
    return Api().post('addPropertyFeatures', credentials)
  },
  addPropertyFacilities (credentials) {
    return Api().post('addPropertyFacilities', credentials)
  },
  removeImage (credentials) {
    return Api().delete('removeImage/' + credentials.propID + '/' + credentials.imageID)
  }
}
