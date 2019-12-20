<template>
    <div class="container" :style="cssProperties">
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: {
        maxWidth: {
            type: Number,
            default: 0
        }
    },
    computed: {
        cssProperties() {
            let properties = {}

            if (this.maxWidth) {
                properties['max-width'] = `${this.maxWidth}px`
            }

            return properties
        }
    }
}
</script>

<style lang="scss">
.container {
    width: 100%;
    max-width: 1160px;
    padding: 0 20px;
    margin-right: auto;
    margin-left: auto;
}
</style>