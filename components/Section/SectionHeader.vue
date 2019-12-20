<template>
    <header class="section-header">
        <h2 class="section-header__title" :style="cssProperties">{{ title }}</h2>
    </header>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: ''
        },
        color: {
            type: String,
            default: ''
        }
    },
    computed: {
        cssProperties() {
            let properties = {}

            if (this.color) {
                properties['color'] = this.color
            }

            return properties
        }
    }
}
</script>

<style lang="scss" scoped>
.section-header {
    
    &__title {
        text-align: center;
        margin-bottom: 48px;
    }
}
</style>