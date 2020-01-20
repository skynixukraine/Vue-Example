export default {
    methods: {
        openModal(name) {
            this.$store.commit('app/SET_CURRENT_ACTIVE_MODAL', name)
            this.$nextTick(() => {
                this.$modal.show(name)
            })
        },
        closeModal(name) {
            this.$store.commit('app/SET_CURRENT_ACTIVE_MODAL', '')
            this.$modal.hide(name)
        },
    },
}