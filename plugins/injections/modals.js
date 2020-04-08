import Vue from "vue";

export default ({app}, inject) =>{
    const OPTIONS = {
        defaultModal                     : "default-modal",
        contactModals                    : "contact-modal",
        registerSuccess                  : "register-success",
        personalInfoChangeEmail          : "personal-info-change-email",
        personalInfoChangePassword       : "personal-info-change-password",
        diagnosticChatConfirmEnquire     : "diagnostic-chat-confirm-enquire",
        personalInfoConfirmDeleteAccount : "personal-info-confirm-delete-account",
        chatConfirmCodeMobile            : "confirm-code-modal",
        sendFindings                     : "send-findings",
        openImageModal                   : "open-image-modal",
        beforeChat                       : "before-chat",
    };

    app.modals            = OPTIONS;
    Vue.prototype.$modals = OPTIONS;
}