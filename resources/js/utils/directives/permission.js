// import Vue from 'vue';
import {can,} from '../functions/auth'
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';



const permission = {}
permission.install = (Vue, opciones) => {    
    Vue.directive('permission', {
        inserted(el, b, vnode) {
            let count = 0

            let pers = b.value.permissions;

            // Documentación
            if (can(["xxxxxxxxxxxxx"])) {
                tooltip(el,pers, b.value.doc)
            }
                        
            pers.map(perm => {
                let is_can = can(perm, opciones)
                if (is_can) {
                    count++
                }

            })

            
            if (count == 0) { // Si count en igual a cero quiere decir que de los permisos que tiene el usuario no está ninguno de los que se necesitan para ver el recurso.
                // el.parentNode && el.parentNode.removeChild(el);
                // el.remove()
                vnode.elm.parentElement.removeChild(vnode.elm)
                // console.log('No tienes el permisos: ', pers);
                
            }

        }
    })
}


function tooltip(el, permissions, doc){

    tippy(el, {
        content:
        `
            <div>
                <p><b>DOC:</b> ${ doc } <p>
                <p> <b>Permisos necesarios: </b> ${ permissions.join() } </p>
            </div>
            ` ,
        allowHTML: true,
        duration: [100, 200],
        interactiveBorder: 30,
        interactive:true
    })
    // console.log("tooltip: ", permissions, doc);
}

//Ejemplo para su utilización
/* <li
    v-permission="{doc: 'Ver modulo de Receiver Logistica (Multibodegas).', permissions:['view_receiver_mw']}"
    class="kt-menu__item kt-menu__item--active"
    aria-haspopup="true"
>
    Algo
</li> */


export default permission;