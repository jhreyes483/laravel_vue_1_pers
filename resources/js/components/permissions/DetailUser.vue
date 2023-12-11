<template>
    <div>
        <div>
            <h1>Detalle de usuario</h1>
        </div>

        <div class="card">
            <div class="card-body mt-3">
                Usuario : {{ user.name  }} <br>
                Correo  : {{ user.email  }}
                <hr>
                <b>Roles</b>

                <!-- ejemplo de select multiple  -->
                <v-select
                label="text"
                multiple
                :options="items"
                v-model="selected"
                :items="items">
                <template
                v-slot:item="{ item, on, attrs }">
                <h4
                v-bind="attrs" style="width: 100%;">
                <v-switch
                :value="selected.includes(item.value)"
                style="display: inline-block"/>
                {{ item.text }}
                </h4>
             </template>
            </v-select>


                <div class="m-2">
                    <div v-for="(rol, index) in roles" :key="index">
                    <span class="p-2">
                        <router-link :to="`/usuario/role-detail/${rol.id}`">
                            <i class="far fa-edit "></i>
                    </router-link>
                    </span>

                    <input 
                    type="checkbox" 
                    :id="`rol-${rol.id}`" 
                    v-model="usuarioRoles[rol.id]"
                     class="form-check-label" />
                    <label :for="`rol-${rol.id}`">
                        {{ rol.name }}
                    </label>
                   
                </div>
                </div>

                <button @click="guardarRoles" class="btn btn-primary btn-sm">Guardar</button>
            </div>
        </div>

        <TableHasPermissions 
        url_table = "/api/get_permissions" 
        url_add_permisions = "/api/permissions/add/"
        url_remove_permisions = "/api/permissions/delete/"
        entity ="user" 
        ></TableHasPermissions>



    </div>
</template>
<script>

import TableHasPermissions from "./TableHasPermissions.vue";
export default {
    components: {   
        TableHasPermissions
    },
    data() {
        return {
            roles: [],
            usuarioRoles: {}, // Roles del usuario, inicialmente "Admin" seleccionado
            user : {},

            selected: [{text: 'Option 1', value: 'a'}],
            items: [{ text: 'Option 1', value: 'a'}, { text: 'Option 2', value: 'b'}]
        };
    },



    mounted() {
        this.getUserById();
    },
    computed: {
        rolesSelectd() {

        }
    },

    methods: {
        guardarRoles() {

            
            /****** formateo de checkbox** */
            let rolesSeleccionados = Object.keys(this.usuarioRoles).filter(
                (rolId) => this.usuarioRoles[rolId]
            );
            /***************************** */
            /*** formateo de select multiple para enviar solo valores */
            let selectedOnlyValues =  this.items.map(item => item.value);
            /******************************** */


            let loader = this.$loading.show()
            let data = {
                rolesSelected      : rolesSeleccionados,
                user_id            : this.$route.params.id,
                selected_test      : this.selected,
                selectedOnlyValues : selectedOnlyValues 
            };

            axios.put( '/api/update/user/roles/', data).then(res => {
                //this.preload = false

                if (res.data.transaction) {
                    loader.hide()
                    this.getUserById();
                    this.$swal({
                        icon: 'success',
                        text: 'Actualizo roles de usuario'
                    })
                   // this.getUserById()
                } else {
                    this.$swal({
                        icon: 'error',
                        text: 'error get user'
                    })
                }
            }).catch(error => {
                loader.hide()
                console.log(err)
                this.$swal({
                    icon: 'error',
                    text: `${this.errorMessage}`
                })
            })


            // Aquí podrías enviar la solicitud con los roles al servidor
        },


        getUserById() {
            let loader = this.$loading.show()
            axios.get('/api/get_user/' + this.$route.params.id).then(res => {
                //this.preload = false

                if (res.data.transaction) {
                    loader.hide()
                    let data           = res.data.data;
                    this.user          = data.user;
                    this.roles         = data.roles;
                    this.usuarioRoles  = data.usuarioRoles;
                } else {
                    this.$swal({
                        icon: 'error',
                        text: 'error get user'
                    })
                }
            }).catch(error => {
                loader.hide()
                console.log(err)
                this.$swal({
                    icon: 'error',
                    text: `${this.errorMessage}`
                })
            })
        },


    }
}





</script>
