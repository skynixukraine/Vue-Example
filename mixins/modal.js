export default {
    methods : {
        openModal(name, modalMessageHTML, modalTitle){
            console.log(name)
            this.$store.commit("modals/SET_CURRENT_ACTIVE_MODAL", name);

            modalTitle && this.$store.commit("modals/SET_MODAL_TITLE", modalTitle);
            modalMessageHTML && this.$store.commit("modals/SET_MODAL_MESSAGE_HTML", modalMessageHTML);

            this.$nextTick(() => {
                this.$modal.show(name);
            })
        },
        closeModal(name){
            this.$store.commit("modals/SET_CURRENT_ACTIVE_MODAL", "");
            this.$modal.hide(name);
        },
    },
}