/** The function is called each time when switching pages. */

export default function({store, app, route}){

    store.commit(
        "app/SET_IS_PERSONAL_OFFICE_PAGE",
        !!(~route.fullPath.indexOf(app.routes.dashboard.path) ||
            ~route.fullPath.indexOf(app.routes.personalInformation.path) ||
            ~route.fullPath.indexOf(app.routes.billing.path) ||
            ~route.fullPath.indexOf(app.routes.enquiries.path))
    );

    store.app.store.state.app.isNavigationActive && store.commit("app/SET_IS_NAVIGATION_ACTIVE", false);
}