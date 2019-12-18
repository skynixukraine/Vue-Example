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
        bg: {
            type: String,
            default: '',
        },
        bgImage: {
            type: String,
            default: '',
        },
    },
    computed: {
        cssProperties() {
            let properties = {}

            if (this.padding) {
                properties['padding-top'] = `${this.padding}px`
                properties['padding-bottom'] = `${this.padding}px`
            }
            if (this.bg) {
                properties['background-color'] = `${this.bg}`
            }
            if (this.bgImage) {
                properties['background-image'] = `url('${this.bgImage}')`
            }

            return properties
        }
    }
}
</script>

<style lang="scss">
.section {
    padding-top: 80px;
    padding-bottom: 80px;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
}
</style>
