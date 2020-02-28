export default {
    methods : {
        openModal(name, modalMessageHTML, modalTitle){
            this.$store.commit("app/SET_CURRENT_ACTIVE_MODAL", name);

            modalTitle && this.$store.commit("app/SET_MODAL_TITLE", modalTitle);
            modalMessageHTML && this.$store.commit("app/SET_MODAL_MESSAGE_HTML", modalMessageHTML);

            this.$nextTick(() => {
                this.$modal.show(name);
            })
        },
        closeModal(name){
            this.$store.commit("app/SET_CURRENT_ACTIVE_MODAL", "");
            this.$modal.hide(name);
        },
    },
}