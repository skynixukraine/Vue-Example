<template>
    <div class="advantage-card">
        <header class="advantage-card__header">
            <div class="advantage-card__round">
                <div class="advantage-card__round-inner">
                    <!-- <img class="advantage-card__image" :src="advantage.icon" :alt="advantage.text"> -->
                    <video class="" :src="advantage.video" type="video/mp4" autoplay loop webkit-playsinline playsinline muted></video>
                </div>
            </div>
        </header>
        <div class="advantage-card__main">
            <p class="advantage-card__text" v-html="text"></p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        advantage: {
            type: Object,
            required: true
        }
    },
    computed: {
        text: function(){
            const separator = this.advantage.text.indexOf('&');
            if (separator){
                return this.advantage.text.slice(0, separator + 1 ) + "<br>" + this.advantage.text.slice(separator + 1)
            } else {
                return this.advantage.text;
            }
        }
    }
}
</script>

<style lang="scss">
.advantage-card {
    text-align: center;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    
    &__header {
        display: flex;
        justify-content: center;
        margin-bottom: 18px;
    }

    &__round {
        width: 164px;
        height: 164px;
        background: $color-white;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: -1;

        &-inner {
            width: 152px;
            height: 152px;
            border: 3px solid #0F44B2;
            background: $color-white;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: hidden;
            background: transparent;
            z-index: -1;


            video{
                width: 304px;
                height: 304px;
                background: $color-white;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                // border: 3px solid #0F44B2;
                z-index: -1;
            }
        }
    }

    &__text {
        font-family: $TheAntiquaB;
        font-size: 20px;
        line-height: 1.3;
        color: $color-white;
    }
}
</style>