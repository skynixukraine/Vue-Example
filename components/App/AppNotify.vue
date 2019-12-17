<template>
    <div class="app-notify" :class="{ 'app-notify--active' : isActive }">
        {{ type }} : {{ text }}
    </div>
</template>

<script>
const defaultType = 'success'

export default {
    data() {
        return {
            isActive: false,
            type: defaultType,
            text: ''
        }
    },
    created() {
        this.$root.$on('showNotify', (notify) => {
            this.show(notify)
            setTimeout(() => {
                this.hide()
            }, 2000)
        });
    },
    methods: {
        show(notify) {
            this.isActive = true
            this.type = notify.type
            this.text = notify.text
        },
        hide() {
            this.isActive = false
            this.type = ''
            this.text = defaultType
        }
    }
}
</script>

<style lang="scss">
.app-notify {
    display: none;
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 20px;
    background: greenyellow;

    &--active {
        display: block;
    }
}
</style>