<template>
    <div class="page">
        <div class="section">
            <div class="container">
                <h1>Download Conclusions</h1>
            </div>
        </div>
    </div>
</template>

<script>

    import modal from "~/mixins/modal";
    import validator from "~/mixins/validator";
    import Conclusion from "~/services/api/Conclusion";
    import diagnosticChatApi from "~/services/api/DiagnosticChat";

    export default {
        head(){
                return {title : this.$t("page-conclusions.head.title")}
            },
        async fetch({app, store, params: { token }, error}){
            // if token exist and user empty - load User object
            if(app.$cookies.get(app.cookie.names.token) && store.getters['user/USER'] === null){
                await store.dispatch("user/LOAD_USER", {
                    id    : app.$cookies.get(app.cookie.names.tokenId),
                    token : app.$cookies.get(app.cookie.names.token)
                }).catch(error => {
                    app.$cookies.remove(app.cookie.names.token);
                    app.$cookies.remove(app.cookie.names.tokenId);
                });
            }
        },
        mixins     : [
            modal
        ],
        mounted() {

            if (!this.$route.params.token) {
                this.$router.replace(this.$routes.hautarzt.path);
                return;
            }

            this.hashValidate(this.performData());
            this.$root.$on("submitConclusion", this.submitConclusion);
        },
        methods    : {
            performData() {
                let data = new FormData();
                data.append("hash", this.$route.params.token);
                return data;
            },
            hashValidate(data) {
                this.$store.dispatch('conclusion/LOAD_AND_SAVE_ENQUIRE_VALIDATE_HASH', data).then((response) => {
                    this.$store.commit("user/SET_USER_ENQUIRE_ID", response.data.id);
                    this.sendSMS(response.data.id);
                }).catch((error) => {
                    this.openModal(this.$modals.defaultModal, error.message, "Etwas ist schief gelaufen!");
                });
            },
            sendSMS(enquireId){
                diagnosticChatApi.sendSmsCode(enquireId).then((response) => {
                    this.openModal(this.$modals.chatConfirmCodeMobile,
                        "Confirm code",
                        "Wir haben einen Bestätigungscode an Ihre Telefonnummer gesendet. Bitte geben Sie diesen Code unten ein:");

                }).catch((error) => {
                    this.openModal(this.$modals.defaultModal, error.message, "Etwas ist schief gelaufen!");
                });
            },
            submitConclusion() {
                this.$store.dispatch('conclusion/LOAD_CONCLUSION_PDF', {
                    id           : this.$store.state.user.userEnquireId,
                    requestData  : {access_token : this.$store.state.enquires.enquireAccess.access_token},
                }).then((response) => {
                    this.downloadPDF(response.conclusion, response.name);
                    this.$router.replace(this.$routes.home.path);
                }).catch((error) => {
                    this.openModal(this.$modals.defaultModal, error.message, "Etwas ist schief gelaufen!");
                });
            },
            downloadPDF(pdf, name) {
                const linkSource = `data:application/pdf;base64,${pdf}`;
                const downloadLink = document.createElement("a");

                downloadLink.href = linkSource;
                downloadLink.download = name;
                downloadLink.click();
            },
        },
        beforeDestroy(){
            this.closeModal(this.$modals.defaultModal);
            this.$root.$off("submitConclusion", this.submitConclusion);
        }
    }
</script>