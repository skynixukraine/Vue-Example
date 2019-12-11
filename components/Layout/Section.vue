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
            default: 0
        }
    },
    computed: {
        cssProperties() {
            if (!this.padding) return {}
            return {
                'padding-top': `${this.padding}px`,
                'padding-bottom': `${this.padding}px`
            }
        }
    }
}
</script>

<style lang="scss">
.section {
    padding-top: 60px;
    padding-bottom: 60px;
}
</style>