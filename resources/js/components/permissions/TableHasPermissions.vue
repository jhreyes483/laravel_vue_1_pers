<template>
    <div class="mt-3">
        <h4> Edición de permisos {{ entity }} </h4>
        <v-server-table 
            ref="reference_table" 
            :url="url_table" 
            :columns="columns" 
            :options="{
                headings,
                sortable: [],
                filterable: false,
                requestFunction,
                perPage: 3,
                /* perPageValues: [3, 5, 10] */
            }">

            <template slot="options" slot-scope="props" class="border-b">
                <div v-if="props.row.entity_has_permission">
                    <button :style="{ color: '#FFF' }"
                    @click="removePermission(props.row)"
                        class="btn  btn-danger btn-sm" style="width: 130px; padding: 10px;">
                        <i class="far fa-edit ml-1">Eliminar</i>
                    </button>
                </div>
                <div v-if="!props.row.entity_has_permission">
                    <button :style="{ color: '#FFF' }"
                    @click="addPermision(props.row)"
                    class="btn  btn-success btn-sm" style="width: 130px; padding: 10px;">
                    <i class="far fa-edit ml-1">Asignar
                    </i>
                </button>
                </div>
            </template>

            <template slot="entity_has_permission" slot-scope="props" class="border-b">
                <span class="badge" v-bind:class="{
                    'bg-success' : props.row.entity_has_permission ,
                    'bg-warning' :  !props.row.entity_has_permission
                }" >
                
                <span v-if="props.row.entity_has_permission">
                    Tiene el permiso
                </span>
                <span v-if="!props.row.entity_has_permission">
                    No tiene permiso
                </span>
                </span>
            </template>
        </v-server-table>
    </div>
</template>

<script>
export default {
    name: 'TableHasPermissions',
    props: ['url_table','loaded','entity','url_add_permisions','url_remove_permisions'],
    data() {
        return {
            filter: {},
            columns: [
                "name",
                "entity_has_permission",
                "options"
            ],
            headings: {
                "name": "Nombre",
                "entity_has_permission" : "Estado",
                "options": "Modificar"
            }
        }
    },
    methods: {
        removePermission(row){
            let data = {
                entity : this.entity,
                entity_identity: this.$route.params.id,
                guard_name : row.guard_name,
                name : row.name
            }
            axios.post(this.url_remove_permisions, data)
                .then(res => {
                if (res.data.transaction) {
                    console.log(res, 'remove')
                    this.refreshPageTable();
                    this.$swal({
                        icon: 'success',
                        text: 'Guardo correctamente.',
                    });
                }

                }).catch(err => {
                    this.$swal({
                        icon: 'error',
                        text: 'no guardo.',
                    });
                    console.log(err, 'erro remove')
                    loading.hide()
            })
        },

        addPermision(row){
            let data = {
                entity           : this.entity,
                entity_identity  : this.$route.params.id,
                guard_name       : row.guard_name,
                name             : row.name
            }
            axios.post(this.url_add_permisions , data)
                .then(res => {
                if (res.data.transaction) {
                    console.log(res, 'remove')
                    this.refreshPageTable();
                    this.$swal({
                        icon: 'success',
                        text: 'Guardo correctamente.',
                    });
                }

                }).catch(err => {
                    this.$swal({
                        icon: 'error',
                        text: 'no guardo.',
                    });
                    console.log(err, 'erro remove')
                    loading.hide()
            })
        },

        requestFunction(data) {
            if (data.query == '') {
                // this.loader = this.$loading.show();
            }
            data = {
                ...data,
                filter: this.filter,
                entity_id :  this.$route.params.id
            };

            return axios.post(this.url_table, data).catch((e) => {
                console.log(e, 'eeerr')

               // this.loader.hide()
            });
        },
        refreshPageTable(){
            if(this.$refs.reference_table){
                this.$refs.reference_table.setPage(this.$refs.reference_table.Page)
            }
        },

    }
}
</script>