const DEFAULT_COUNTDOWN = 60
const DEFAULT_COUNTDOWN_INTERVAL_ID = null

export default {
    beforeDestroy() {
        clearInterval(this.countdownIntervalId)
    },

    data() {
        return {
            countdown: DEFAULT_COUNTDOWN,
            countdownIntervalId: DEFAULT_COUNTDOWN_INTERVAL_ID
        }
    },

    methods: {
        startCountDown() {
            this.countdownIntervalId = setInterval(() => {
                if (this.countdown > 0) {
                    this.countdown = this.countdown--
                }
            }, 1000)
        }
    },
}