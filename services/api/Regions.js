import { HTTP } from '~/plugins/modules/axios'

export default {
    /**
     * Load Regions
     * @return {Promise}
     */
    async loadRegions() {
        return new Promise ((resolve, reject) => {
            HTTP.get('/regions')
                .then(response => {
                    const responseData = {       
                        success: true,
                        status: response.status,
                        data: response.data.data,
                        message: 'Regions success loaded.',
                    }
                    resolve(responseData)
                })
                .catch(error => {
                    let message = ''

                    if (error.response.status === 500) {
                        message = 'Entschuldigung. Leider ist ein Fehler aufgetreten. Versuchen Sie es später erneut.'
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