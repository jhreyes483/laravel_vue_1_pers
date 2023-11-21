import Vue from 'vue';
const bg = {}
bg.install = () => {
    Vue.directive('bg', {
        inserted(el, b, vnode) {

            if (b.value) {
                if (b.value.split('#')[0] == "") {
                    el.style.background = b.value
                }else{
                    el.style.background = `rgba(${ b.value})`
                }

            }

        },
        componentUpdated(el, b, vnode) {
            if (b.value) {
                if (b.value.split('#')[0] == "") {
                    el.style.background = b.value
                }else{
                    el.style.background = `rgba(${ b.value})`
                }
            }

        },
        update(el, b, vnode) {
            if (b.value) {
                if (b.value.split('#')[0] == "") {
                    el.style.background = b.value
                }else{
                    el.style.background = `rgba(${ b.value})`
                }
            }
        }
    })
}
export default bg;
