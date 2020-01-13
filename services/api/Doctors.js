// import { HTTP } from '~/plugins/modules/axios'

// export default {
//     /**
//      * Get doctor by id
//      * @param {String} doctorId
//      * @return {Promise} responseData
//      */
//     async loadDoctor(doctorId) {
//         return new Promise ((resolve, reject) => {
//             HTTP.get('/doctors', { params: { id: doctorId } })
//                 .then(response => {
//                     console.log('loadDoctor response: ', response)
//                 })
//                 .catch(error => {
//                     console.log('loadDoctor error: ', error)
//                 })
//         })
//     },
// }