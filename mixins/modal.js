export default {
    methods : {
        openModal(name, modalMessageHTML, modalTitle, modalRedirect){
            this.$el.ownerDocument.body.style.overflow = "hidden";
            this.$store.commit("modals/SET_CURRENT_ACTIVE_MODAL", name);
            modalTitle && this.$store.commit("modals/SET_MODAL_TITLE", modalTitle);
            modalMessageHTML && this.$store.commit("modals/SET_MODAL_MESSAGE_HTML", modalMessageHTML);
            modalRedirect && this.$store.commit("modals/SET_MODAL_REDIRECT", modalRedirect);

            this.$nextTick(() => {
                this.$modal.show(name);
            })
        },
        closeModal(name){
            this.$el.ownerDocument.body.style.overflow = "auto";
            this.$store.commit("modals/SET_CURRENT_ACTIVE_MODAL", "");
            this.$modal.hide(name);
        },
    },
}