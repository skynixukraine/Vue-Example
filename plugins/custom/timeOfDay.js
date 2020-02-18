import Vue from 'vue'

export default ({ app }) => {
    const today = new Date()
    const currentHours = today.getHours()
    let timeOfDay = ''

    if (currentHours > 23 && currentHours <= 3) {
        timeOfDay = 'night'
    } else if (currentHours <= 9) {
        timeOfDay = 'morning'
    } else if (currentHours <= 17) {
        timeOfDay = 'afternoon'
    } else if (currentHours <= 22) {
        timeOfDay = 'evening'
    }
    
    Vue.prototype.$timeOfDay = timeOfDay
    app.timeOfDay = timeOfDay
}