const DEFAULT_COUNTDOWN = 60;

export default {
    data() {
        return {
            countdown: DEFAULT_COUNTDOWN
        }
    },

    methods: {
        startCountdown(number) {
            number = number === undefined ? DEFAULT_COUNTDOWN : number;

            if (!arguments[1]) {
                this.countdown = number;
            }

            if(this.countdown > 0) {
                setTimeout(() => {
                    this.countdown -= 1;
                    this.startCountdown(number, true);
                }, 1000);
            }
        }
    }
}