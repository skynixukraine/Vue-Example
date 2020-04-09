import { HTTP } from '~/plugins/modules/axios'

export default {
    /**
     * Load Titles
     * @return {Promise}
     */
    async loadDoctorTitles() {
        return new Promise ((resolve, reject) => {
            HTTP.get('/doctor-titles')
                .then(response => {
                    const responseData = {       
                        success: true,
                        status: response.status,
                        data: response.data.data,
                        message: 'Doctor Titles success loaded.',
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