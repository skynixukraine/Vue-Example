export default {
    data : function(){
        return {
            runAnimation : '',
            endLocation  : 0,
            increments   : 0
        }
    },

    methods : {
        smoothScroll(anchor, duration){
            const startLocation = window.pageYOffset;
            this.endLocation    = anchor.offsetTop;
            const distance      = this.endLocation - startLocation;
            this.increments   = distance / (duration / 45);
            this.runAnimation = setInterval(() => this.animateScroll(), 10);
        },

        animateScroll(){
            window.scrollBy(0, this.increments);
            this.stopAnimation(this.increments, this.endLocation);
        },
        stopAnimation(increments, endLocation){
            const travelled = window.pageYOffset;
            if(travelled >= endLocation - 48){
                clearInterval(this.runAnimation);
            }
        },
        scrollToElement(event){
            event.preventDefault();
            // Get anchor link and calculate distance from the top
            const dataID     = event.target.getAttribute('href');
            const dataTarget = document.querySelector(dataID);
            if(dataTarget){
                // Scroll to the anchor
                this.smoothScroll(dataTarget, 800);
            }
        }
    }
}