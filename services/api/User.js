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
                        errors: {}
                    }
                    resolve(responseData)
                })
                .catch(error => {
                    console.log('reg error: ', error.response);
                    
                    const responseData = {
                        success: false,
                        status: error.response.status,
                        data: {},
                        message: error.response.data.message,
                        errors: error.response.data.errors
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
                        errors: {}
                    }
                    resolve(responseData)
                })
                .catch(error => {
                    const responseData = {
                        success: false,
                        status: error.response.status,
                        data: {},
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
                        errors: {}
                    }
                    resolve(responseData)
                })
                .catch(error => {
                    const responseData = {
                        success: false,
                        status: error.response.status,
                        data: {},
                        message: error.response.data.message,
                        errors: error.response.data.errors
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
                    console.log('response: ', response.status);
                    
                    const responseData = {          
                        success: true
                    }
                    resolve(responseData)
                })
                .catch(error => {
                    console.log('error: ', error.response);
                    
                    const responseData = {
                        success: false
                    }
                    reject(responseData)
                })
        })
    },
}