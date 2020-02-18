import Vue from 'vue'

export default ({ app }) => {
    const today = new Date()
    const currentHours = today.getHours()
    let timeOfDay = ''

    if (currentHours > 23 && currentHours <= 5) {
        timeOfDay = 'night'
    } else if (currentHours <= 12) {
        timeOfDay = 'morning'
    } else if (currentHours <= 18) {
        timeOfDay = 'afternoon'
    } else if (currentHours <= 23) {
        timeOfDay = 'evening'
    }
    
    Vue.prototype.$timeOfDay = timeOfDay
    app.timeOfDay = timeOfDay
}