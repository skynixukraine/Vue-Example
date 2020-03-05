export default {

    methods : {
        smoothScroll(o){
            /**
             * o.anchor,
             * o.duration,
             * o.fix - indent from top of page to anchor
             * o.callback - run after animation
             * */

            const settings = {
                duration: o.duration,
                easing: {
                    outQuint: function (x, t, b, c, d) {
                        return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
                    }
                }
            };
            const body = document.body;
            const html = document.documentElement;
            let timer = null,
                percentage,
                startTime,
                nodeTop = o.fix ? o.anchor.offsetTop - o.fix : o.anchor.offsetTop,
                nodeHeight = o.anchor.offsetHeight,
                height = Math.max(
                    body.scrollHeight,
                    body.offsetHeight,
                    html.clientHeight,
                    html.scrollHeight,
                    html.offsetHeight
                ),       windowHeight = window.innerHeight,
                offset = window.pageYOffset,
                delta = nodeTop - offset,
                bottomScrollableY = height - windowHeight,
                targetY = (bottomScrollableY < delta)
                    ? bottomScrollableY - (height - nodeTop - nodeHeight + offset)
                    : delta;

            startTime = Date.now();
            percentage = 0;

            function step() {
                let yScroll,
                    elapsed = Date.now() - startTime;
                if (elapsed > settings.duration) {
                    clearTimeout(timer);
                }
                percentage = elapsed / settings.duration;
                if (percentage > 1) {
                    clearTimeout(timer);
                    if (o.callback) {
                        o.callback();
                    }
                } else {
                    yScroll = settings.easing.outQuint(0, elapsed, offset, targetY, settings.duration);
                    window.scrollTo(0, yScroll);
                    timer = setTimeout(step, 10);
                }
            }
            timer = setTimeout(step, 10);
        },
        scrollToElement(event){
            event.preventDefault();
            // Get anchor link and calculate distance from the top
            const dataID     = event.target.getAttribute('href');
            const dataTarget = document.querySelector(dataID);
            if(dataTarget){
                 // Scroll to the anchor
                 this.smoothScroll({anchor: dataTarget, duration: 800, fix:25});
            }
        }
    }
}