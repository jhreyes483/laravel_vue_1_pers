<style>
body {
    font-size: 14px;
}

.alert-100 {
    animation-name: parpadeo;
    animation-duration: 1s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;

}

@-moz-keyframes parpadeo {
    0% {
        opacity: 1.0;
    }

    50% {
        opacity: 0.0;
    }

    100% {
        opacity: 1.0;
    }
}



@-webkit-keyframes parpadeo {
    0% {
        opacity: 1.0;
    }

    50% {
        opacity: 0.0;
    }

    100% {
        opacity: 1.0;
    }
}

@keyframes parpadeo {
    0% {
        opacity: 1.0;
    }

    50% {
        opacity: 0.0;
    }

    100% {
        opacity: 1.0;
    }

}


.btn-circle {
    border-radius: 100%;
    height: 2.5rem;
    width: 2.5rem;
    font-size: 1rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
}

.btn-circle.btn-sm,
.btn-group-sm>.btn-circle.btn {
    height: 1.8rem;
    width: 1.8rem;
    font-size: 0.75rem;
}

.btn-circle.btn-lg,
.btn-group-lg>.btn-circle.btn {
    height: 3.5rem;
    width: 3.5rem;
    font-size: 1.35rem;
}
</style>


<template>
    <div>


        <div class="container">
            <div class="row justify-content-center">
                <!-- 
                <div class="col-12 col-md-5 mx-2 my-3 card shadow">
                    <div class="my-4 card-body">
                        <label for="">Guardar toma </label>
                        <v-select v-model.trim="medicine_id" :options="medicines" :reduce="item => item.id" label="name"
                            placeholder="Selecciona medicina">
                            <template slot="no-options">
                                Seleccione medicina a registrar
                            </template>
</v-select>
</div>


<div class=" text-center my-3 mb-5">
    <input type="button" value="guardar" class="btn btn-primary col-10" @click="saveLog()">
</div>
</div>

-->


                <div class="col-12 col-md-4 mx-2 my-3 card shadow">
                    <div class="my-4 card-body">
                        <label for="">Buscar agenda por fecha</label>
                        <!--
                                :value-zone="57" :zone="57"
                             -->
                        <datetime v-model="final_date" title="Fecha de inicio" input-class="form-control"
                            placeholder="Fecha de inicio." name="start_time" type="date" :value-zone="timezone"
                            :zone="timezone" :auto="true" :flow="['date']">
                            <template slot="button-cancel">
                                Cancelar
                            </template>
                            <template slot="button-confirm">
                                Confirmar
                            </template>
                        </datetime>
                    </div>


                    <div class=" text-center my-3 mb-5 row">
                        <div class="col-md-6">
                            <input type="button" value="Buscar" class="btn btn-primary col-10" @click="sendSearch()">
                        </div>
                        <div class="col-md-6">
                            <input type="button" value="Todos" class="btn btn-warning col-10" @click="saveLogAllDay()">
                        </div>
                        
                    </div>
                </div>



            </div>



            <div class="col-md-4 my-4">

            </div>
        </div>

        <div class="col-md-12 my-8 table table-striped my-4 mx-auto card card-body  shadow border">
            <v-client-table ref="worehouse_table" :columns="columns" :data="rows" :options="options_table">
                <template slot="ya_tome" slot-scope="props">
                    <span v-if="props.row.ya_tome == 0">
                        <div class="text-success ">
                            <strong class="alert-100">pendiente </strong>
                        </div>
                    </span>
                    <span v-if="props.row.ya_tome == 1">
                        <strong> Ya tomo </strong>
                    </span>
                </template>

                <template slot="option" slot-scope="props">
                    <button @click="saveLog(props.row.medicine_id, props.row.ya_tome)" v-bind:class="{
                        'btn-dark': props.row.ya_tome,
                        'btn-success': !props.row.ya_tome
                    }" class="btn btn-circle" data-bs-toggle="tooltip" data-bs-placement="right" title="Regitrar">
                        <i class="fa fa-check" aria-hidden="true"></i>
                    </button>
                    <button @click="openModalWithMedicines(props.row.medicine_id)" class="btn btn-circle btn-primary"
                        title="Ver detalles">
                        <i class="fa fa-eye" aria-hidden="true"></i>
                    </button>
                    <button v-if="props.row.several_per_day > 0" @click="getNumberOfShotsPerDay(props.row.medicine_id)"
                        v-bind:class="{
                            'btn-dark': props.row.ya_tome,
                            'btn-success': !props.row.ya_tome
                        }"
                        
                        class="btn btn-circle" title="Mas de una toma en un día">
                        <i class="fa fa-sticky-note" aria-hidden="true"></i>
                    </button>
                </template>

            </v-client-table>
        </div>

        <div class="col-md-12 my-8 table table-striped my-4 mx-auto card card-body  shadow border">
            <v-client-table ref="worehouse_table" :columns="columnsFinance" :data="rowsFinance"
                :options="options_table">
                <template slot="days_restantes" slot-scope="props">
                    <span v-if="props.row.investment_type_id == 1">
                        {{ props.row.days_restantes }}
                    </span>
                </template>
                <template slot="term" slot-scope="props">
                    <span v-if="props.row.investment_type_id == 1">
                        {{ props.row.term }}
                    </span>
                </template>




                <template slot="retiro" slot-scope="props">
                    <span v-if="props.row.retiro == 0">
                        <div class="text-success ">
                            <strong class="">en proceso</strong>
                        </div>
                    </span>
                    <span v-if="props.row.retiro == 1">
                        <div class="text-danger ">
                            <strong class="alert-100">OJO retirar hoy</strong>
                        </div>
                    </span>
                </template>



                <template slot="pago" slot-scope="props">
                    <div class="d-flex">
                        <input type="number" class="form-control form-control-sm me-2" placeholder="Valor"
                            v-model.number="pagosInputs[props.row.id]" :key="'pago-input-' + props.row.id"
                            style="width: 100px;" />
                        <button @click="savePago(props.row.id, pagosInputs[props.row.id])"
                            class="btn btn-success btn-sm" title="Registrar pago">
                            <i class="fa fa-check" aria-hidden="true"></i>
                        </button>
                        <button @click="openModalWithMovement(props.row.id)" class="btn btn-info btn-sm"
                            title="Ver detalles">
                            <i class="fa fa-eye" aria-hidden="true"></i>
                        </button>
                    </div>
                </template>


            </v-client-table>

            <div class="row justify-content-center">
                <div class="col-12 col-md-8 mx-2 my-3 card shadow">
                    <h5>Resumen financiero</h5>
                    <p><strong>Total invertido:</strong> ${{ totalInversion.toLocaleString('es-CO') }}</p>
                    <p><strong>Ganancia total obtenida:</strong> ${{ totalGanancia.toLocaleString('es-CO') }}</p>
                    <p><strong>Capital total:</strong> ${{ totalCapital.toLocaleString('es-CO') }}</p>
                </div>
            </div>

        </div>

        <button class="button_action" @click.prevent="openModal()"></button>


        <button v-permissions="{ permiso: 'table.medication7ddd' }">test permisions</button>
        <button class="btn btn-sm btn-warning" v-permissions="{ permiso: 'table.medication7' }">test permisions</button>


        <div class="my-4 col-md-11 mx-auto card card-body  shadow border ">
            <Progress :progress="progress" :name="name" @getComplements="getProgress"></Progress>
        </div>

        <DetailMovements ref="ModalDetail" @confirm="handleConfirm" />
        <DetailMedicines ref="ModalDetailMedicines" @confirm="handleConfirm" />
        <DetailLeafMedicines ref="ModalDetailLeafMedicines" @confirm="handleConfirm" />

        <CardFoor :props="card"></CardFoor>

        <main class="py-4">
            <div class="container">
                <router-view></router-view>
            </div>
        </main>
    </div>

</template>



<script>
import Progress from "../General/Progress.vue";
import CardFoor from "../General/CardFoor.vue";
import DetailMovements from './components/DetailMovements.vue';
import DetailMedicines from './components/DetailMedicines.vue'
import DetailLeafMedicines from './components/DetailLeafMedicines.vue';
export default {
    components: {
        Progress,
        CardFoor,
        DetailMovements,
        DetailMedicines,
        DetailLeafMedicines

    },

    data() {
        return {
            totalInversion: 0,
            totalGanancia: 0,
            totalCapital: 0,
            pagosInputs: {},
            final_date: new Date(),
            timezone: "America/Bogota",
            name: ["Disponivilidad"],
            progress: [],
            card: [],
            search: '',

            medicine_id: null,
            final_date: null,
            data_save: [],
            medicines: [],
            rows: [],
            columns: [
                'medicine_id',
                'medicine_name',
                'ultima_toma',
                'interval_days',
                'proxima_toma',
                'quantity',
                'descript',
                'hora',
                'user_name',
                'ya_tome',
                'option'
            ],


            rowsFinance: [],
            columnsFinance: [
                'name',
                'type_name',
                'entity',
                'status',
                'valor',
                'created_at',
                'expire',
                'term',
                'days_true',
                'days_restantes',
                'profit_obtained',
                'retiro',
                'pago'
            ],

            view_mode: 'table',
            options_table: {
                headings: {
                    //  'medicine_id': 'id',
                    'name': 'descripción',
                    'type_name': 'tipo',
                    'entity': 'entidad',
                    'valor': 'valor',
                    'status': 'estado',
                    'created_at': 'apertura',
                    'expire': 'vence',
                    'term': 'dias plazo',
                    'days_true': 'dias transcurridos',
                    'days_restantes': 'dias restantes',
                    // 'descript': 'desc',
                    'profit_obtained': 'ganancia obtenida',
                    'retiro': 'finaliza',
                    'pago': 'registrar pago',


                }
            },
            filterable: false,
            perPage: 15,
            perPageValues: [],
            filterBy: '',
            sortBy: 'medicine_name',
            sortDesc: false

        }
    },


    mounted() {
        this.getInvestments()
        this.getProgress()
        this.getComplements()
        // this.getToken()

    },
    methods: {
        getToken() {
            console.log(localStorage.getItem('access_token'), 'getToken')
        },
        openModal(refName = 'ModalDetail') {
            //this.$refs.ModalDetail.open();
            const modal = this.$refs[refName];
            if (modal && typeof modal.open === 'function') {
                modal.open();
            } else {
                console.error(`No se encontró el modal o no tiene un método "open": ${refName}`);
            }
        },
        openLeafDetails(){},
        handleConfirm() {
            // lógica cuando el modal se confirma
        },

        savePago(id, value) {
            console.log("pago", { value, id })
            if (!value || isNaN(value)) {
                this.$swal({
                    icon: 'error',
                    text: 'Debe ingresar un value válido.',
                });
                return;
            }

            const data_save = {
                investment_id: id,
                value: value
            };

            axios.post("/api/finance/savePago", data_save)
                .then(res => {
                    this.$swal({
                        icon: 'success',
                        text: 'Pago registrado correctamente.',
                    });
                    // Opcional: limpiar input
                    this.$set(this.pagosInputs, id, null);
                    this.getInvestments(); // refresca tabla si es necesario
                })
                .catch(err => {
                    this.$swal({
                        icon: 'error',
                        text: 'Error al registrar el pago.',
                    });
                });
        },
        openModalWithMovement(id) {
            // Llama la API para obtener detalles del movimiento
            axios.post('/api/finance/getPagosByInvestment', { investment_id: id })
                .then(res => {
                    if (res.data.transaction.status) {
                        this.$refs.ModalDetail.setData(res.data.data)
                        this.$refs.ModalDetail.open()
                    } else {
                        this.$swal({
                            icon: 'error',
                            text: 'No se pueden cargar movimientos',

                        });
                    }

                    // this.$refs.ModalDetail.setData(res.data.data); // Asegúrate que setData esté en el modal
                    this.$refs.ModalDetail.open();
                })
                .catch(err => {
                    this.$swal({
                        icon: 'error',
                        text: 'No se pudo cargar el detalle....',
                    });
                    this.$refs.ModalDetail.open();
                    console.log(err)
                });
        },
        openModalWithMedicines(id) {
            // Llama la API para obtener detalles del movimiento
            axios.post('/api/medic/getByMedicines', { medicine_id: id })
                .then(res => {
                    if (res.data.transaction.status) {
                        this.$refs.ModalDetailMedicines.setData(res.data.data)
                        this.$refs.ModalDetailMedicines.open()
                    } else {
                        this.$swal({
                            icon: 'error',
                            text: 'No se pueden cargar movimientos',

                        });
                    }
                })
                .catch(err => {
                    this.$refs.ModalDetailMedicines.open()
                    this.$swal({
                        icon: 'error',
                        text: 'No se pudo cargar el detalle....',
                    });
                    // this.$refs.ModalDetail.open();
                    console.log(err)
                });
        },
        getNumberOfShotsPerDay(id){
            axios.post('/api/medic/getNumberOfShotsPerDay', { medicine_id: id })
                .then(res => {
                    if (res.data.transaction.status) {
                        this.$refs.ModalDetailLeafMedicines.setData(res.data.data)
                        this.$refs.ModalDetailLeafMedicines.open()
                    } else {
                        this.$swal({
                            icon: 'error',
                            text: 'No se pueden cargar movimientos',

                        });
                    }
                })
                .catch(err => {
                    this.$refs.ModalDetailLeafMedicine.open()
                    this.$swal({
                        icon: 'error',
                        text: 'No se pudo cargar el detalle....',
                    });
                    // this.$refs.ModalDetail.open();
                    console.log(err)
                });
        },
        getInvestments() {
            axios.post("/api/finance/getInvestments")
                //post('/api/times_zones/getComplement',{time_zone_id:this.wr.time_zone_id})
                .then(res => {
                    var data = res.data.data
                    this.rowsFinance = data
                    this.calculateTotal();
                    console.log(this.rowsFinance, 'finanzas')



                }).catch(err => {
                    loading.hide()
                    //console.log(res, 'false')
                })
        },

        sendSearch() {
            var data_search = {
                date: this.final_date

            }
            axios.post("/api/medic/search", data_search)
                .then(res => {

                    this.getProgress()
                    this.getComplements()


                }).catch(err => {
                    alert('error')
                    // loading.hide()
                    //console.log(res, 'false')
                })

            //date = new Date( this.final_date );
            // this.final_date = date.toISOString().substring(0, 10);
        },

        saveLogAllDay(id = false, ya_tome = false) {

            if (id && ya_tome) {
                this.$swal({
                    icon: 'error',
                    text: 'Ya habia registrado.',
                });
                return false;
            }


            var data_save = {
                date: (this.final_date ? this.final_date : null)
            }

            axios.post("/api/medic/save_log_all_day", data_save)
                .then(res => {

                    this.$swal({
                        icon: 'success',
                        text: 'Guardo correctamente.',
                    });
                    this.medicine_id = null
                    this.getProgress()
                    this.getComplements()

                }).catch(err => {
                    this.$swal({
                        icon: 'danger',
                        text: 'Error al registrar',
                    });
                })
        },

        saveLog(id = false, ya_tome = false) {

            if (id && ya_tome) {
                this.$swal({
                    icon: 'error',
                    text: 'Ya habia registrado.',
                });
                return false;
            }


            var data_save = {
                medicine_id: (id ? id : this.medicine_id),
                date: (this.final_date ? this.final_date : null)
            }

            axios.post("/api/medic/save_log", data_save)
                .then(res => {

                    this.$swal({
                        icon: 'success',
                        text: 'Guardo correctamente.',
                    });
                    this.medicine_id = null
                    this.getProgress()
                    this.getComplements()

                }).catch(err => {
                    this.$swal({
                        icon: 'danger',
                        text: 'Error al registrar',
                    });
                })
        },
        calculateTotal() {

            let totalInversion = 0;
            let totalGanancia = 0;
            let totalCapital = 0;

            this.rowsFinance.forEach(item => {
                let valor = item.valor;
                let ganancia = item.profit_obtained;

                // Si viene como string, limpia los caracteres especiales
                if (typeof valor === 'string') {
                    valor = valor.replace(/[^0-9]/g, '');
                }

                if (typeof ganancia === 'string') {
                    ganancia = ganancia.replace(/[^0-9]/g, '');
                }

                // Asegúrate de convertirlos a número
                const cleanValor = Number(valor) || 0;
                const cleanGanancia = Number(ganancia) || 0;
                console.log(cleanGanancia)
                totalInversion += cleanValor;
                totalGanancia += cleanGanancia;
            });
            this.totalGanancia = totalGanancia;
            this.totalInversion = totalInversion;
            this.totalCapital = totalInversion + totalGanancia;
        },
        getProgress() {
            var data_save = {
                medicine_id: this.medicine_id
            }
            axios.post("/api/general/progress_bar", data_save)
                .then(res => {
                    if (res.data.transaction.status) {
                        this.progress = res.data.data;
                        this.progress_title = 'Disponivilidad';
                        console.log(this.progress, 'step progress 11');

                    } else {
                        this.$swal({
                            icon: 'error',
                            text: 'No se pudo cargar la barra.',

                        });
                    }

                }).catch(err => {
                    this.$swal({
                        icon: 'error',
                        text: 'No se pudo cargar la barra 1.',

                    });
                    // loading.hide()
                    //console.log(res, 'false')
                })
        },

        sendSearch() {
            this.getComplements()
        },

        getComplements() {


            let loading = this.$loading.show({
                container: this.$refs.createTimeZoneCity
            })
            var data_search = {
                date: (this.final_date ? this.final_date : null)
            }


            axios.post("/api/medic/all", data_search)
                //post('/api/times_zones/getComplement',{time_zone_id:this.wr.time_zone_id})
                .then(res => {
                    loading.hide()
                    console.log(res.data.data, 'progress');
                    //this.cities = res.data.data.cities
                    //this.cities = res.data.data.filter_cities;
                    //  va = res.data.data
                    // data = res.data.data;
                    //console.log(data ,'step 2');
                    var data = res.data.data
                    this.rows = data.logs
                    this.medicines = data.medicines
                    this.card = data.card
                    console.log('step 3');
                    console.log(this.rows, 'this.rows')
                    this.medicines = data.medicines
                    this.users = data.users
                    this.availability = data.availability
                    this.procedure = data.procedure


                }).catch(err => {
                    loading.hide()
                    //console.log(res, 'false')
                })

        }
    }
}



</script>
