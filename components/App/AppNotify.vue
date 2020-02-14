<template>
    <div class="app-notify" :class="{ 'app-notify--active' : isActive }" v-if="isActive">
        {{ type }} : {{ text }}
    </div>
</template>

<script>
const DEFAULT_TYPE = 'success'
const DEFAULT_IS_ACTIVE = false

export default {
    data() {
        return {
            isActive: DEFAULT_IS_ACTIVE,
            type: DEFAULT_TYPE,
            text: ''
        }
    },
    created() {
        this.startHandleShowNotify()
    },
    beforeDestroy() {
        this.stopHandleShowNotify()
    },
    methods: {
        startHandleShowNotify() {
            this.$root.$on('showNotify', this.onShowNotify)
        },
        stopHandleShowNotify() {
            this.$root.$off('showNotify', this.onShowNotify)
        },
        onShowNotify(notify) {
            this.showNotify(notify)
            setTimeout(() => {
                this.hideNotify()
            }, 2000)
        },
        showNotify(notify) {
            this.isActive = true
            this.type = notify.type
            this.text = notify.text
        },
        hideNotify() {
            this.isActive = false
            this.type = DEFAULT_TYPE
            this.text = ''
        }
    }
}
</script>

<style lang="scss">
.app-notify {
    display: none;
    position: fixed;
    bottom: $main_offset;
    right: $main_offset;
    padding: $main_offset;
    background: greenyellow;

    &--active {
        display: block;
    }
}
</style>