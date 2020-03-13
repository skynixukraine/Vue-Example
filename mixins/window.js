export default {
    data(){
        return {
            windowWidth  : null,
            windowHeight : null,
            scrollTop    : null,
        }
    },
    mounted(){
        this.$nextTick(() => {
            window.addEventListener("resize", this.handleResize);
            window.addEventListener("scroll", this.handleScroll);
            this.handleResize();
            this.handleScroll();
        })
    },
    beforeDestroy(){
        window.removeEventListener("resize", this.handleResize);
        window.removeEventListener("scroll", this.handleScroll);
    },
    methods : {
        handleResize(){
            this.windowWidth  = window.innerWidth;
            this.windowHeight = window.innerHeight;
        },
        handleScroll(){
            this.scrollTop = window.pageYOffset;
        },
    },
}