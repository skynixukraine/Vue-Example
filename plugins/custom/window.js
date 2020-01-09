import Vue from 'vue'

// options
const DEFAULT_WINDOW_WIDTH = null
const DEFAULT_WINDOW_HEIGHT = null
const DEFAULT_SCROLL_TOP_POSITION = null

let options = {
    windowWidth: DEFAULT_WINDOW_WIDTH,
    windowHeight: DEFAULT_WINDOW_HEIGHT,
    scrollTopPosition: DEFAULT_SCROLL_TOP_POSITION,
}



export default ({ app }) => {
    // set initial values
    options.windowWidth = window.innerWidth
    options.windowHeight = window.innerHeight
    options.scrollTopPosition = window.pageYOffset

    // set listeners
    window.addEventListener('resize', onWindowResize)
    window.addEventListener('scroll', onWindowScroll)

    // functions
    const onWindowResize = (event) => {
        options.windowWidth = event.target.innerWidth
        options.windowHeight = event.target.innerHeight

        Vue.prototype.$window = options
        app.window = options
    }

    const onWindowScroll = (event) => {
        options.scrollTop = event.target.pageYOffset

        Vue.prototype.$window = options
        app.window = options
    }

    Vue.prototype.$window = options
    app.window = options
}