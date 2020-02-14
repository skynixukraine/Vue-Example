import Vue from 'vue'

export default ({ app }, inject) => {
    const OPTIONS = {
        names: {
            token: 'oh-token',
            tokenId: 'oh-token-id',
        },
        path: {
            root: '/',
        },
        getSecondsBetweenTwoData(dateStart, dateEnd) {
            const differenceInTime = dateEnd.getTime() - dateStart.getTime()
            const differenceInSeconds = Math.trunc(differenceInTime / 1000)
            return differenceInSeconds
        }
    }

    Vue.prototype.$cookie = OPTIONS
    app.cookie = OPTIONS
}