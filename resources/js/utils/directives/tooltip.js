import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import { can } from '../functions/auth'

const tooltip = {}
tooltip.install = (Vue) => {
    Vue.directive('tooltip', {
        inserted(el, b) {
            if (can(["xxxxxxxxxxxxx"])) {
                if (typeof b.value == 'object') {
                    tippy(el, {
                        content:
                        `
                            <div>
                                <p><b>DOC:</b> ${ b.value.doc } <p>
                                <p> <b>Pemiso necesario: </b> ${ b.value.permission } </p>
                            </div>
                            ` ,
                        allowHTML: true,
                        // duration: [100, 200],
                        delay: [1000,0],
                        interactiveBorder: 30,
                        interactive:true
                    })
                }else{
                    tippy(el, {
                        content:
                        `
                            <div>
                                <p> <b>Pemiso necesario: </b> ${ b.value } </p>
                            </div>
                            ` ,
                        allowHTML: true,
                        // duration: [100, 200],
                        delay: [1000,0],
                        interactiveBorder: 30,
                        interactive:true
                    })
                }
            }
        }
    })
}
export default tooltip;
