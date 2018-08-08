import Api from '@/services/Api'

export default {
  Login (credentials) {
    return Api().post('Login', credentials)
  }/* ,
  Logout (credentials) {
    return Api().put('Logout/' + credentials.userID)
  },
  checkAccountStatus (credentials) {
    return Api().get('checkAccountStatus/' + credentials.userID)
  },
  UploadImage (credentials) {
    return Api().post('ImageUpload', credentials)
  },
  registerUser (credentials) {
    return Api().post('registerUser', credentials)
  },
  registeredUsers () {
    return Api().get('registeredUsers')
  },
  singleUser (credentials) {
    return Api().get('singleUser/' + credentials.userID)
  },
  registerJobCategory (credentials) {
    return Api().post('registerJobCategory', credentials)
  },
  registeredJobCategories () {
    return Api().get('registeredJobCategories')
  },
  JobPost (credentials) {
    return Api().post('JobPost', credentials)
  },
  postedJobs () {
    return Api().get('postedJobs')
  },
  singleJob (credentials) {
    return Api().get('singleJob/' + credentials.jobID)
  },
  activeUsers () {
    return Api().get('activeUsers')
  },
  applications () {
    return Api().get('applications')
  },
  jobApplicants (credentials) {
    return Api().get('jobApplicants/' + credentials.jobID)
  },
  jobApplicant (credentials) {
    return Api().get('jobApplicant/' + credentials.applicant)
  },
  jobRecruitement (credentials) {
    return Api().post('jobRecruitement', credentials)
  },
  checkifRecruited (credentials) {
    return Api().get('checkifRecruited/' + credentials.applicant)
  },
  selectedApplicants (credentials) {
    return Api().get('selectedApplicants/' + credentials.jobID)
  } */
}
