import Vue from 'vue';
import {can, replaceString} from '../functions/auth'



const permissions = {}
permissions.install = (Vue, opciones) => {    
    Vue.directive('can', {
        inserted(el, b, vnode) {
            let count = 0
            // let routeName = window.routerVue && replaceString(window.routerVue.history.current.name) 
            // console.log(window.routerVue);

            let pers = b.value;
                        
            pers.map(perm => {
                let is_can = can(perm, opciones)
                if (is_can) {
                    count++
                }

                // if (!exclude) {
                    // let resp = localStorage.getItem('modules_permissions')
                    // if(resp){
                    //     resp = JSON.parse(resp)
                    //     let filter = resp.filter(el => Object.keys(el)[0] == routeName)
                    //     // console.log("AAAAAAAA ",routeName);
                    //     if(filter.length > 0 && filter[0][routeName].filter(fil => fil == perm) == 0){
                    //         // console.log(filter[0][routeName], per);
                    //         filter[0][routeName].push(perm)
                    //         let modules = resp.filter(el => Object.keys(el)[0] != routeName)
                    //         modules.push(filter[0])
                    //         localStorage.setItem('modules_permissions', JSON.stringify(modules))
                    //     }
                    // }
                    
                // }
            })

            
            if (count == 0) { // Si count en igual a cero quiere decir que de los permisos que tiene el usuario no está ninguno de los que se necesitan para ver el recurso.
                el.parentNode && el.parentNode.removeChild(el);
                el.remove()
                // console.log('No tienes el permisos: ', pers);
                
            }

        }
    })
}

//Ejemplo para su utilización 
// < div id="algo" v-permissions="['create_students', 'algo', 'create_estudents']" > no mas, borrate </div>


export default permissions;