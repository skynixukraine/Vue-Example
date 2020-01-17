import shareMutations from 'vuex-shared-mutations'

const PREDICATE_OPTIONS = [
    'user/SET_USER',
    'user/SET_TOKEN'
]

export default ({ store }) => {
    window.onNuxtReady(nuxt => {
        shareMutations({
            predicate: PREDICATE_OPTIONS
        })(store)
    })
}