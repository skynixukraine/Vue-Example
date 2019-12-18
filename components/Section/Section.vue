<template>
    <div class="section" :style="cssProperties">
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: {
        padding: {
            type: Number,
            default: 0,
        },
        paddingTop: {
            type: Number,
            default: 0,
        },
        paddingBottom: {
            type: Number,
            default: 0,
        },
        bg: {
            type: String,
            default: '',
        },
        bgImage: {
            type: String,
            default: '',
        },
        fullscreen: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        cssProperties() {
            let properties = {}

            if (this.padding) {
                properties['padding-top'] = `${this.padding}px`
                properties['padding-bottom'] = `${this.padding}px`
            }
            if (this.paddingTop) {
                properties['padding-top'] = `${this.paddingTop}px`
            }
            if (this.paddingBottom) {
                properties['padding-bottom'] = `${this.paddingBottom}px`
            }
            if (this.bg) {
                properties['background-color'] = `${this.bg}`
            }
            if (this.bgImage) {
                properties['background-image'] = `url('${this.bgImage}')`
            }
            if (this.fullscreen) {
                properties['min-height'] = '100vh'
            }

            return properties
        }
    }
}
</script>

<style lang="scss">
.section {
    padding-top: 112px;
    padding-bottom: 112px;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
