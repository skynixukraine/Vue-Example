import Vue from "vue";

export default ({app}, inject) => {
    const OPTIONS = {
        home                : {
            path : "/"
        },
        cookies             : {
            path : "/cookies"
        },
        dashboard           : {
            path : "/dashboard"
        },
        hautarzt            : {
            path : "/hautarzt"
        },
        vorteile            : {
            path : "/vorteile"
        },
        faq                 : {
            path : "/faq"
        },
        about               : {
            path : "/ueber-uns"
        },
        contact             : {
            path : "/kontakt"
        },
        authorisation       : {
            path : "/authorisation"
        },
        registrierung       : {
            path : "/registrierung"
        },
        einloggen       : {
            path : "/einloggen"
        },
        login               : {
            path : "/registrierung"
        },
        konditionen         : {
            path : "/konditionen"
        },
        studien             : {
            path : "/studien"
        },
        forschung           : {
            path : "/forschung"
        },
        datenschutz         : {
            path : "/datenschutz"
        },
        agb                 : {
            path : "/agb"
        },
        impressum           : {
            path : "/impressum"
        },
        account             : {
            path : "/account"
        },
        billing             : {
            path : "/account/billing"
        },
        personalInformation : {
            path : "/account/personal-information"
        },
        enquiries           : {
            path : "/enquiries"
        },
        terms               : {
            path : "/terms-and-conditions"
        },
        privacy             : {
            path : "/privacy-policy"
        },
        awards              : {
            path : "/auszeichnungen"
        },
        auschecken          : {
            path : "/auschecken"
        },
        conclusions         : {
            path : "/conclusions"
        }
    };

    Vue.prototype.$routes = OPTIONS;
    app.routes            = OPTIONS;
}