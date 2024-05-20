require('./bootstrap');
import vue from 'vue'
window.Vue = vue;

import App from './components/App.vue';

//importamos Axios
import VueAxios from 'vue-axios';
import axios from 'axios';

//Importamos y configuramos el Vue-router
import VueRouter from 'vue-router';
import {routes} from './routes';
import { verificarPermiso } from './utils/utils';
import  {existToken } from './utils/functions/auth';


Vue.use(VueRouter);
Vue.use(VueAxios, axios);

const router = new VueRouter({
    mode: 'history',
    routes: routes
});

/*  directiva de permisos */
Vue.directive('permissions', {
    bind(el, binding, vnode) {
      const permisoBuscado = binding.value.permiso;
      // Verificar el permiso usando la función de verificación
      const tienePermiso = verificarPermiso(permisoBuscado);
      // Modificar el elemento según el resultado
      if (!tienePermiso) {
        el.style.display = 'none';  // Ocultar el elemento si no tiene el permiso
      }
    },
  });
/********************** */

/** persistencia de token en todas las peticiones **/
 var token = localStorage.getItem('access_token');
 if(token){
    axios.defaults.headers.common['Authorization'] = 'Bearer '+ token; 
 }

/********************** dependences ***************************/
import * as VueGoogleMaps from 'vuejs-google-maps';
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';

import {
    ClientTable,ServerTable, Event
} from 'vue-tables-2';
/* Loader */
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css'; 
/*******/

import { Datetime } from 'vue-datetime'
import sha1 from 'js-sha1'
window.sha1 = sha1
import 'vue-datetime/dist/vue-datetime.css'


//wizard
import VueFormWizard from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
Vue.use(VueFormWizard)


//Sweetalert2
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
const optionsSweetalert2 = {
    confirmButtonColor: '#653F90',
    // cancelButtonColor: '#ff7674',
};


Vue.use(VueSweetalert2, optionsSweetalert2);

import VueMoment from 'vue-moment'
import momentTimezone from 'moment-timezone'
import moment from 'moment'
require('moment/locale/es')
momentTimezone.tz("America/Bogota")


Vue.use(VueMoment, {
    moment,
})

//Directivas personalizadas
import can from './utils/directives/can'
import bg from './utils/directives/bg'
import tooltip from './utils/directives/tooltip'
import permission from './utils/directives/permission'

Vue.router = router;
Vue.use(VueRouter);

Vue.use(ClientTable, {
    perPage: 15,
    texts: {
        count: "Montrando del {from} al {to} de {count} Registros|{count} Registros|1 Registro",
        first: "First",
        last: "Last",
        filter: "",
        records:"......",
        filterPlaceholder: "Buscar registro",
        limit: "",
        page: "Page:",
        noResults: "Sin resultados",
        filterBy: "{column}",
        loading: "Cargando...",
        defaultOption: "Todas",
        columns: "Columns"
    }

});


Vue.use(ServerTable,{
    perPage: 15,
    texts: {
        count: "Mostrando del {from} al {to} de {count} Registros|{count} Registros|1 Registro",
        first: "First",
        last: "Last",
        filter: "",
        records:"......",
        filterPlaceholder: "Buscar registro",
        limit: "",
        page: "Page:",
        noResults: "Sin resultados",
        filterBy: "{column}",
        loading: "Cargando...",
        defaultOption: "Todos",
        columns: "Columnas"
    }

})


import VueCurrencyFilter from 'vue-currency-filter'
Vue.use(VueCurrencyFilter, {
    symbol: 'LC ', // El símbolo, por ejemplo €
    thousandsSeparator: ',', // Separador de miles
    fractionCount: 0, // ¿Cuántos decimales mostrar?
    fractionSeparator: '.', // Separador de decimales
    symbolPosition: '', // Posición del símbolo. Puede ser al inicio ('front') o al final ('') es decir, si queremos que sea al final, en lugar de front ponemos una cadena vacía ''
    symbolSpacing: true // Indica si debe poner un espacio entre el símbolo y la cantidad
})


Vue.use(Loading, {
   // height: '1000px',
   // width: '1000px',
    color: '#000000',
    loader: 'spinner',
})



import VueToast from 'vue-toast-notification';
// Import one of available themes
import 'vue-toast-notification/dist/theme-default.css';



import VueLayers from 'vuelayers'
import 'vuelayers/lib/style.css' // needs css-loader

Vue.use(VueLayers, {
    dataProjection: 'EPSG:4326',
})


/// Metodos globales
import log from './utils/mixins/log'
Vue.mixin(log)

Vue.component('v-select', vSelect)
Vue.component('Datetime', Datetime)

import VModal from 'vue-js-modal';
Vue.use(VModal);
Vue.use(Event)

/******************************************/
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if ( existToken() ) {
            next(); 
        } else {
            next('/'); 
        }
    } else {
        next(); 
    }
});

//finalmente, definimos nuestra app de Vue
const app = new Vue({
    el: '#app',
    router: router,
    render: h => h(App),
});
