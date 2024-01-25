import Api from '@/services/Api'

export default {
    index (params) {
        return Api().get('historys', {
            params: params
        })
    },
    post (history) {
        return Api().post('historys', history)
    }
}
