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

                <div v-for="(rol, index) in roles" :key="index">
                    <input 
                    type="checkbox" 
                    :id="`rol-${rol.id}`" 
                    v-model="usuarioRoles[rol.id]"
                     class="form-check-label" />
                    <label :for="`rol-${rol.id}`">
                        {{ rol.name }}
                    </label>
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
            user : {}
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
            // Envía la solicitud con los roles seleccionados
            console.log(this.usuarioRoles, 'this.usuarioRole')
            let rolesSeleccionados = Object.keys(this.usuarioRoles).filter(
                (rolId) => this.usuarioRoles[rolId]
            );
            console.log(rolesSeleccionados, 'rolesSeleccionados')
            console.log("Roles Seleccionados:", rolesSeleccionados);

            let loader = this.$loading.show()
            let data = {
                rolesSelected : rolesSeleccionados,
                user_id : this.$route.params.id
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
