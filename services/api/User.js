import { HTTP } from '~/plugins/modules/axios'

export default {
    /**
     * Register User
     * @param {Object} registerData
     * @return {Promise} responseData
     */
    async registerUser(registerData) {
        return new Promise ((resolve, reject) => {
            HTTP.post('/doctors/register', registerData)
                .then(response => {
                    const responseData = {
                        success: true,
                        status: response.status,
                        data: response.data.data,
                        message: 'User success registered',
                    }
                    resolve(responseData)
                })
                .catch(error => {
                    let message = ''
                    let errors = {}

                    if (error.response.status === 422) {
                        message = 'There are some validation errors.'
                        errors = error.response.data.errors
                    }
                    if (error.response.status === 500) {
                        message = 'Internal technical error was happened.'
                    }
                    
                    const responseData = {
                        success: false,
                        status: error.response.status,
                        message,
                        errors,
                    }
                    reject(responseData)
                })
        })
    },

    /**
     * Login User
     * @param {Object} loginData
     * @return {Promise} responseData
     */
    async loginUser(loginData) {
        return new Promise ((resolve, reject) => {
            HTTP.post('/doctors/login', loginData)
                .then(response => {
                    const responseData = {          
                        success: true,
                        status: response.status,
                        data: response.data.data,
                        message: 'User success login',
                    }
                    resolve(responseData)
                })
                .catch(error => {
                    const responseData = {
                        success: false,
                        status: error.response.status,
                        message: error.response.data.message,
                        errors: error.response.data.errors
                    }
                    reject(responseData)
                })
        })
    },

    /**
     * Load User By Id
     * @param {Object} {id, token}
     * @return {Promise}
     */
    async loadUser({id, token}) {
        return new Promise ((resolve, reject) => {
            HTTP.get(`/doctors/${id}`, { headers: {'Authorization': `Bearer ${token}`} })
                .then(response => {
                    const responseData = {          
                        success: true,
                        status: response.status,
                        data: response.data.data,
                        message: 'User success loaded',
                    }
                    resolve(responseData)
                })
                .catch(error => {
                    let message = ''

                    if (error.response.status === 401) {
                        message = 'Invalid signature: unauthenticated.'
                    }
                    if (error.response.status === 403) {
                        message = 'Current user has not permissions to do this action.'
                    }
                    if (error.response.status === 404) {
                        message = 'Resource not found.'
                    }
                    if (error.response.status === 500) {
                        message = 'Internal technical error was happened.'
                    }

                    const responseData = {
                        success: false,
                        status: error.response.status,
                        message,
                    }
                    reject(responseData)
                })
        })
    },

    /**
     * Verify User Email
     * @param {Object} verifyData
     * @return {Promise} none or Error Object
     */
    async verifyUserEmail(verifyData) {
        return new Promise ((resolve, reject) => {
            HTTP.get('/doctors/verify-email', { params: verifyData })
                .then(response => {
                    const responseData = {          
                        success: true,
                        status: response.status,
                        message: 'Email is verify',
                    }
                    resolve(responseData)
                })
                .catch(error => {
                    let message = ''

                    if (error.response.status === 304) {
                        message = 'An e-mail already verified.'
                    }
                    if (error.response.status === 401) {
                        message = 'Invalid signature: unauthenticated.'
                    }
                    if (error.response.status === 404) {
                        message = 'Resource not found.'
                    }
                    if (error.response.status === 500) {
                        message = 'Something went wrong, please try again later.'
                    }

                    const responseData = {
                        success: false,
                        status: error.response.status,
                        message,
                    }

                    reject(responseData)
                })
        })
    },

    /**
     * Resend Verify Email
     * @param {Object} verifyData
     * @return {Promise} none or Error Object
     */
    async sendEmailVerifyLink(requestData) {
        return new Promise ((resolve, reject) => {
            HTTP.post('/doctors/send-email-verification-link', requestData)
                .then(response => {
                    console.log('sendEmailVerifyLink response: ', response);
                    resolve(response)
                })
                .catch(error => {
                    console.log('sendEmailVerifyLink error: ', error);
                    reject(error)
                })
        })
    },
}