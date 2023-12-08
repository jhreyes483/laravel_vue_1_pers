<template>
    <div>
        <div>
            <h1>Control de usuarios</h1>
        </div>


        <div class="mt-3">
            <v-server-table ref="reference_table" url="/api/get_users" :columns="columns" @loaded="loaded"
                :options="{ headings, sortable: [], filterable: false, requestFunction, perPage: 3, /* perPageValues: [3, 5, 10] */ }">

                <template slot="options" slot-scope="props" class="border-b">
                    <router-link 
                    :style="{ color: '#FFF' }" 
                    :to="`/usuario/permisos-detail/${props.row.id}`"
                        class="btn  btn-primary btn-sm" 
                        style="width: 130px; padding: 10px;">
                        <i class="far fa-edit ml-1">
                        </i>
                    </router-link>
                </template>


            </v-server-table>
        </div>

    </div>
</template>
<script>
export default {
    components: {},
    data() {
        return {
            columns: [
                "name",
                "email",
                "options"
            ],
            headings: {
                "name": "Nombre",
                "email": 'Correo',
                "options": "Detalles"
            },
            filter: {},
            statuses_netsuite: [],
            loader: null,
            traceability: [],
            id_general: null,
            data_users: [],
            info_roles: [],
            info_ware: []



        }
    },
    mounted() {

    },
    methods: {
        loaded(data) {
            if (this.loader != null) {
                this.loader.hide()
            }
        },

        refreshPageTable() {
            if (this.$refs.reference_table) {
                this.$refs.reference_table.setPage(this.$refs.reference_table.Page)
            }
        },
        requestFunction(data) {
            if (data.query == '') {
                // this.loader = this.$loading.show();
            }
            data = {
                ...data,
                filter: this.filter
            };

            return axios.post('api/get_users', data).catch((e) => {

                this.loader.hide()
            });
        },

    }
}



</script>
