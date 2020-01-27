import { HTTP } from '~/plugins/modules/axios'

export default {
    /**
     * Load Specializations
     * @return {Promise}
     */
    async loadSpecializations() {
        return new Promise ((resolve, reject) => {
            HTTP.get('/specializations')
                .then(response => {
                    const responseData = { 
                        success: true,
                        status: response.status,
                        data: response.data.data,
                        message: 'Specializations success loaded.',
                    }
                    resolve(responseData)
                })
                .catch(error => {
                    let message = ''

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
}