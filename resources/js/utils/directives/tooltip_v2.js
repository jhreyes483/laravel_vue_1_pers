import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';

const tooltip_v2 = {}
tooltip_v2.install = (Vue) => {    
    Vue.directive('tooltip-v2', {
        inserted(el, b) {
            tippy(el, {
                content: b.value.content, 
                allowHTML: true,
                duration: [100, 200],
                interactiveBorder: 30,
                interactive:true
            })            
        }
    })
}
export default tooltip_v2;
