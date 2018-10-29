AuthenticationController = require('../Controllers/AuthenticationController/AuthenticationController')
AuthenticationPolicy = require('../Policies/Authentication/AuthenticationPolicy')
CountryController = require('../Controllers/LocalityControllers/CountryController')
CountryPolicy = require('../Policies/LocalityPolicies/CountryPolicy')
RegionController = require('../Controllers/LocalityControllers/RegionControllers')
RegionPolicy = require('../Policies/LocalityPolicies/RegionsPolicies')
CityController = require('../Controllers/LocalityControllers/CityController')
CityPolicy = require('../Policies/LocalityPolicies/CityPolicies')
AreaController = require('../Controllers/LocalityControllers/AreaController')
AreaPolicy = require('../Policies/LocalityPolicies/AreaPolicy')
FeaturesController = require('../Controllers/FeatureFacilityControllers/FeaturesController')
FeaturesPolicy = require('../Policies/FeatureFacilityPolicies/FeaturesPolicy')
FacilityController = require('../Controllers/FeatureFacilityControllers/FacilityController')
FacilityPolicy = require('../Policies/FeatureFacilityPolicies/FacilityPolicy')
OwnerController = require('../Controllers/OwnershipController/Ownershipcontroller')
OwnerPolicy = require('../Policies/OwnershipPolicy/Ownershippolicy')
WhenNeededController = require('../Controllers/WhenNeeded/WhenNeeded')
imageUploadController = require('../Controllers/ImageUpload/imageUpload')
multi_imageUpload = require('../Controllers/ImageUpload/multi_imageUpload')
LandController = require('../Controllers/Properties/Land/Landcontroller')
LandPolicy = require('../Policies/Properties/Land/LandPolicy')
singlePropController = require('../Controllers/SinglePropController/SinglePropController')
singlePropPolicy = require('../Policies/SingleProp/SinglePropPolicy')

module.exports = (app) => {
	app.use((req, res, next) => {
		res.header("Access-Control-Allow-Origin", "*")
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
		next()
	}),
		app.post('/registerUser',
		AuthenticationPolicy.registerUser,
		AuthenticationController.registerUser),
		app.post('/userLogin',
		AuthenticationPolicy.userLogin,
		AuthenticationController.userLogin),
		app.post('/AddCountry',
			CountryPolicy.AddCountry,
			CountryController.AddCountry),
		app.get('/Countries',	CountryController.Countries),
		app.delete('/delete_country/:country_id',
			CountryPolicy.delete_country,
			CountryController.delete_country),
		app.put('/edit_country',
			CountryPolicy.edit_country,
			CountryController.edit_country),
		app.post('/AddRegion',
			RegionPolicy.AddRegion,
			RegionController.AddRegion),
		app.get('/Regions',	RegionController.Regions),
		app.delete('/delete_region/:region_id/:country_id',
			RegionPolicy.delete_region,
			RegionController.delete_region),
		app.put('/edit_region',
			RegionPolicy.edit_region,
			RegionController.edit_region),
		app.post('/AddCity',
			CityPolicy.AddCity,
			CityController.AddCity),
		app.get('/Cities',	CityController.Cities),
		app.delete('/delete_city/:city_id/:region_id',
			CityPolicy.delete_city,
			CityController.delete_city),
		app.put('/edit_city',
			CityPolicy.edit_city,
			CityController.edit_city),
		app.post('/AddArea',
			AreaPolicy.AddArea,
			AreaController.AddArea),
		app.get('/Areas',	AreaController.Areas),
		app.delete('/delete_area/:area_id/:city_id',
			AreaPolicy.delete_area,
			AreaController.delete_area),
		app.put('/edit_area',
			AreaPolicy.edit_area,
			AreaController.edit_area),
		app.post('/AddFeature',
			FeaturesPolicy.AddFeature,
			FeaturesController.AddFeature),
		app.get('/features', FeaturesController.Features),
		app.get('/prop_features/:propType', FeaturesController.prop_features),
		app.delete('/delete_feature/:feature_id/:category',
			FeaturesPolicy.delete_feature,
			FeaturesController.delete_feature),
		app.put('/edit_feature',
			FeaturesPolicy.edit_feature,
			FeaturesController.edit_feature),
		app.post('/AddFacility',
			FacilityPolicy.AddFacility,
			FacilityController.AddFacility),
		app.get('/facilities', FacilityController.Facilities),
		app.get('/prop_facilities/:propType', FacilityController.prop_facilities),
		app.delete('/delete_facility/:facility_id/:category',
			FacilityPolicy.delete_facility,
			FacilityController.delete_facility),
		app.put('/edit_facility',
			FacilityPolicy.edit_facility,
			FacilityController.edit_facility),
		app.post('/AddOwner',
			OwnerPolicy.AddOwner,
			OwnerController.AddOwner),
		app.get('/owners', OwnerController.Owners),
		app.delete('/delete_owner/:owner_id',
			OwnerPolicy.delete_owner,
			OwnerController.delete_owner),
		app.put('/edit_owner',
			OwnerPolicy.edit_owner,
			OwnerController.edit_owner),
		app.get('/singleUserAccount/:userID',
			OwnerPolicy.singleUserAccount,
			OwnerController.singleUserAccount),
		app.get('/PropertyTypes', WhenNeededController.PropertyTypes),
		app.get('/PropertyCategories', WhenNeededController.PropertyCategories),
		app.post('/singleImageUpload', imageUploadController.singleImageUpload),
		app.post('/multiImageUpload', multi_imageUpload.multi_ImageUpload),
		app.post('/AddLand',
			LandPolicy.AddLand,
			LandController.AddLand),
		app.get('/lands', LandController.Lands),
		app.delete('/delete_prop/:prop_id',
			LandPolicy.delete_land,
			LandController.delete_land),
		app.put('/edit_prop',
			LandPolicy.edit_land,
			LandController.edit_land),
		app.post('/addMultiple', LandController.addMultiple),
		app.get('/singleProp/:propID',
			singlePropPolicy.SingleProp,
			singlePropController.SingleProp)
}
