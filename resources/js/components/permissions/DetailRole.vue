<template>
    <div>

        <h1>Administracón de roles</h1>

        <div class="card">
            <div class="card-body mt-3">
                Rol : {{ rol.name }} <br>
                Creación : {{ rol.created_at }}
                <hr>
            </div>
        </div>


        <TableHasPermissions 
        url_table = "/api/permissions/getTableRolePermissions" 
        url_add_permisions = "/api/permissions/add/"
        url_remove_permisions = "/api/permissions/delete/"
        entity ="rol" 
        ></TableHasPermissions>



    </div>
</template>
<script>
import TableHasPermissions from "./TableHasPermissions.vue";
export default {
    name: 'DetailRole',
    components: {   
        TableHasPermissions
    },
    data(){
        return{
            rol : {}
        }
    },

    mounted(){
        console.log('mounted')
        this.getRole()
    },

    methods:{
        getRole(){
            let loader = this.$loading.show();
            axios.get('/api/get_role/' + this.$route.params.id).then(res => {
                //this.preload = false

                if (res.data.transaction) {
                    this.rol = res.data.data.role
                    console.log(this.rol)

                    loader.hide()
                } else {
                    this.$swal({
                        icon: 'error',
                        text: 'error get rol'
                    })
                }
            }).catch(error => {
                loader.hide()
                console.log(err)
                this.$swal({
                    icon: 'error',
                    text: error
                })
            })


        },
    },
   


}
</script>