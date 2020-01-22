export default function ({ app, redirect }) {
    if (!app.$cookies.get(app.cookie.names.token)) {
        redirect('/')
    }
}