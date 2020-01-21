export default function ({ store, redirect }) {
    if (!store.getters['user/IS_USER_LOGIN']) {
        return redirect('/')
    }
}