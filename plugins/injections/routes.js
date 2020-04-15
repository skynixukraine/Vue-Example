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
            path : "/anamnese"
        },
        datenschutzGmbh         : {
            path : "/datenschutz-gmbh"
        },
        datenschutzHautarzt         : {
            path : "/datenschutz-hautarzt"
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
        patient             : {
            path : "/patient"
        },
        vorlagen            : {
            path : "/vorlagen"
        },
        terms               : {
            path : "/agb"
        },
        datenschutzGmbh               : {
            path : "/datenschutz-gmbh"
        },
        arztvertrag               : {
            path : "/arztvertrag"
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
        },
        kontakt             : {
            path : "/kontakt"
        },
        resetPassword             : {
            path : "/reset-password"
        },
        NewPassword             : {
            path : "/new-password"
        }
    };

    Vue.prototype.$routes = OPTIONS;
    app.routes            = OPTIONS;
}