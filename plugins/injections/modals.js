import Vue from "vue";

export default ({app}, inject) => {
    const OPTIONS = {
        defaultModal    : "default-modal",
        contactModals   : "contact-modal",
        registerSuccess : "register-success",
    };

    app.modals            = OPTIONS;
    Vue.prototype.$modals = OPTIONS;
}