import Vue from 'vue'
import Vuex from 'vuex'
// import axios from 'axios'
import {get } from './services/api'
Vue.use(Vuex)
const store = new Vuex.Store({
        state: {
            warehouses: [],
            permissions: [],
            roles:[],
            statuses:[],
            user:null,
    }

    /*
    {

    state: {
    warehouses: [],
    permissions: [],
    roles:[],
    statuses:[],
    user:null,
    status_order:{
        order_creada :4,
        order_recibida :3,
        order_rechazada :5,
        order_pendiente :6,
        order_cancelada :13,
        order_confirmada :16,
        order_alistada :17,
        order_camino :18,
        order_entregada :19,
        order_devuelta :20,
        order_salida_parcial :21,
        order_entregada_parcial :22,
        order_no_salio :23,
        order_revision:24,
        order_devolucion_conforme:26,
        order_devolucion_no_conforme:27,
        order_edit_order:58,
    },
    module_documentation:{},
    warehousesCountryActive: [],
    time_zone:'America/Bogota',
    urlMultiwarehouseDetail:"/gateway/order_detail_mw/",
    git_branch_name: ""
    },
    mutations: {
    setWarehouses(state, data) {
        state.warehouses = data;
    },
    setPermissions(state, data) {
        state.permissions = data
        localStorage.setItem('permissions', JSON.stringify(data)) //actualiza los permisos para que la directiva "can" los pueda utilizar
    },
    setRoles(state, data) {
        state.roles = data
        localStorage.setItem('roles', JSON.stringify(data)) //actualiza los permisos para que la directiva "can" los pueda utilizar
    },
    setUser(state, data) {
        state.user = data
        localStorage.setItem("user", JSON.stringify(data))
    },
    setWarehousesCountryActive(state, data) {
        state.warehousesCountryActive = data
    },
    setStatuses(state, data){
        state.statuses = data
    },
    setModuleDocumentation(state, data){
        state.module_documentation = data
    },
    setTimeZone(state, data){
        state.time_zone = data
    },
    setGitBranch(state, data){
        state.git_branch_name = data
    }

    },
    actions: {
    getWarehouses({
        commit
    }) {
        axios.get('/api/logistic/get_warehouses')
            .then(res => {
                commit('setWarehouses', res.data.data)
                commit('setUser', res.data.data[0].user)
            })
            .catch(err => {
                // window.error = error
            })
    },


    getPermissions({ commit }) {
        axios.get('/api/users/getPermissions')
            .then(res => {
                if (res.data.transaction.status) {
                    commit('setPermissions', res.data.data.permissions)
                    commit('setRoles', res.data.data.roles)
                    commit('setGitBranch', res.data.data.git_branch_name)
                }
            })
            .catch(err => {
                // window.error = err
                // console.log(err);
            })

    },
    getWarehousesCountryActive({ commit }) {
        axios.post('/api/products/get_warehouses_country_active')
            .then(res => {
                if (res.data.transaction.status) {
                    commit('setWarehousesCountryActive', res.data.data.warehouses)
                }
            })
            .catch(err => {
                console.log(err);
            })
    },
    getModuleDocumentation ({ commit }, route_name) {
        if (route_name == "ModulesDocumentation") {
            return
        }

        console.log(route_name);
        axios.get('/api/modules_documentation/get_module_documentation/' + route_name)
            .then(resp => {

                commit('setModuleDocumentation', resp.data.data ? resp.data.data : {})
                // this.module_documentation = resp.data.data ? resp.data.data : {};
            }).catch(error => {
                console.log('==================ERROR==================');
                console.log(error);
                console.log('====================================');
            });
    },
    getTimeZone({ commit }) {
        axios.post('/api/get_time_zone')
            .then(res => {
                if (res.data.transaction.status) {
                    commit('setTimeZone', res.data.data)
                }
            })
            .catch(err => {
                console.log(err);
            })
    },


    }


    })
    }

     */

})
export default store
