import { HTTP } from '~/plugins/modules/axios'

export default {
    /**
     * Load Doctors
     * @return {Promise}
     */
    async loadDoctors(requestConfig) {
        return new Promise ((resolve, reject) => {
            HTTP.get("/doctors", {"params": requestConfig})
                .then(response => {
                    const responseData = {
                        success: true,
                        status: response.status,
                        data: response.data.data,
                        message: 'Doctors success loaded.',
                    }
                    resolve(responseData)
                })
                .catch(error => {
                    let message = ''

                    if (error.response.status === 500) {
                        message = "Internal technical error was happened."
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