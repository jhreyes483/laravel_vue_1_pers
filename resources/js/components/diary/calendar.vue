<template>
    <div class="contaioner">

        <h1>Agenda</h1>
        <div class="modal fade" id="ModalDia" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="tituloEvento"></h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>
                <div class="modal-body">
                    <div id="descripcionEvento">
                        <!-- aca va el modal -->
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div id="form1">
                <label for="tipo">Tipo</label>
                <select id="tipo" name="tipo" v-model="dataSave.selectedType" required class="form-select">
                    <option selected value="0">Seleccione un tipo</option>
                    <option v-for="type in types" :key="type.id" :value="type.id">{{ type.name }}</option>
                </select>

                <label for="user">Usuario</label>
                <select id="user" name="user" v-model="dataSave.selectedUser" required class="form-select">
                    <option selected value="0">Seleccione un usuario</option>
                    <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
                </select>

                <label for="date">Fecha</label>
                <input v-model="dataSave.date" type="date" id="txtFecha" name="txtFecha" class="form-control"
                    required><br>
                <label for="">Hora Inicio</label>
                <input v-model="dataSave.start" type="time" id="txtHora" name="txtHora" class="form-control"
                    required><br>
                <label for="">Hora Fin</label>
                <input v-model="dataSave.end" type="time" id="txtHora" name="txtHora" class="form-control" required><br>
                <label for="">Titulo</label>
                <input v-model="dataSave.name" type="text" id="txtTitulo" name="txtTitulo" class="form-control"
                    required><br>
                <label for=""> Color</label>
                <input v-model="dataSave.color" type="color" value="#ff0000" name="color" id="txtColor"
                    class="form-control" required><br>
                <label for=""> Descripción</label>
                <input v-model="dataSave.description" type="text" name="description" id="txtDescription"
                    class="form-control" required><br>

                <button type="button" id="btnAgregar" class="btn btn-success" @click="saveEvent()">Agregar</button>
                <button type="button" id="btnModifica" class="btn btn-success">Modificar</button>
                <button type="button" id="btnBorrar" class="btn btn-danger">Borrar</button>
                <button type="button" id="btnCerrar" class="btn btn-default" data-dismiss="modal">Cancelar</button>



            </div>
        </div>
        <div class="container mx-auto">
            <div class="row">
                <div class="col col-10 col mx-auto">
                    <div id="CalendarioWeb"></div>
                </div>
            </div>
        </div>
    </div>





</template>
<script>
import { Calendar as FullCalendar } from '@fullcalendar/vue';
//import dayGridPlugin from '@fullcalendar/daygrid';
//import interactionPlugin from '@fullcalendar/interaction';
export default {
    //  comments:{
    //     FullCalendar,
    // },
    data() {
        return {
            // calendarPlugins: [dayGridPlugin, interactionPlugin],
            //initialView: 'dayGridMonth', // Vista inicial del calendario
            dataSave: {},
            types: {},
            users: {},
            events: {},
        }
    },
    mounted() {
        this.defaultSelect();
        this.getTypes();
        this.getUsers();
        this.getEvents();

    },
    methods: {
        defaultSelect() {
            this.dataSave.selectedType = 0;
            this.dataSave.selectedUser = 0;
            this.dataSave.color = '#ff0000'
        },

        validateForm() {
            let resp = { status: true, msg: 'ok' }
            if (this.dataSave.date === '') {
                return { status: false, msg: 'la fecha es requerida' }
            }
            if (this.dataSave.start === '') {
                return { status: false, msg: 'hora inicio es requerido' }
            }
            if (this.dataSave.end === '') {
                return { status: false, msg: 'hora fin es requerido' }
            }
            if (this.dataSave.name === '') {
                return { status: false, msg: 'el titulo es requerido' }
            }
            if (this.dataSave.name === '') {
                return { status: false, msg: 'el titulo es requerido' }
            }


        },

        async getEvents() {
            await this.axios.get('/api/calendar/get_all_events/', this.blog).then(response => {
                if (response.data.status) {

                    response = response.data;
                    this.events = response.events;
                    console.log('evve-->', this.events)
                    this.laodCalendar();


                } else {
                    console.log('error al cargar users');
                }

            }).catch(error => {
                console.log(error)
            })
            return true;
        },
        async getTypes() {
            await this.axios.get('/api/calendar/get_events/', this.blog).then(response => {
                if (response.data.status) {
                    response = response.data;
                    this.types = response.typeEvents;
                } else {
                    console.log('error al cargar eventos');
                }

            }).catch(error => {
                console.log(error)
            })
        },

        async getUsers() {
            await this.axios.get('/api/calendar/get_users/', this.blog).then(response => {
                if (response.data.status) {
                    console.log('response', response)
                    response = response.data;
                    this.users = response.users;
                } else {
                    console.log('error al cargar users');
                }

            }).catch(error => {
                console.log(error)
            })
        },
        async saveEvent() {
            let validator = this.validateForm();
            console.log(validator);
            if (!validator.status) {
                this.$swal({
                    icon: 'error',
                    text: validator.msg,
                });
                return false;
            }
            await this.axios.post('/api/calendar/save/', this.dataSave).then(response => {
                if (response.data.status) {
                    this.$swal({
                        icon: 'success',
                        text: 'Creo evento.',
                    });
                } else {
                    this.$swal({
                        icon: 'danger',
                        text: 'Error al registrar.',
                    });
                }

            }).catch(err => {
                this.$swal({
                    icon: 'danger',
                    text: 'Error al registrar',
                });
            })
        },
        async udateEvent() {

        },
        async delete() {

        },
        async laodCalendar() {
/*
            let calendar = {};
            calendar.events = [];
            console.log('evenstos-->', this.events)
            console.log('#CalendarioWeb', $('#CalendarioWeb'))

            this.events.forEach(function (event) {
                calendar.events.push({
                    name: event.name,
                    descripcion: event.descripcion,
                    start: event.start,
                    color: event.color,
                    type: event.type.name
                })
            });

            $('#CalendarioWeb').fullCalendar({
                header: {
                    left: 'today,prev,next,Miboton',
                    center: 'title',
                    right: 'month, basicWeek, basicDay, agendaWeek, agendaDay'
                },
                customButtons: {
                    Miboton: {
                        text: "Boton 1",
                        click: function () {
                            alert("accion de boton");
                        }
                    }
                },
                dayClick: function (date, jsEvent, view) {
                    //   alert("valor seleccionado:" + date.format()); // dia se puede enviar a un hidden
                    // pinta el dia seleccionado
                    $(this).css('background-color', '#B4E197');
                    // $("#txtFecha").val(date.format());
                    this.date = date.format()
                    $("#ModalDia").modal();
                    // activa modal
                },
                // color de eventos
                eventSources: [{
                    // eventos
                    events: [calendar.events],
                    // COLOR DEFAULT
                    color: "black",
                    textColor: "yellow",

                }],

                // pasa la informacion de evento al modal
                eventClick: function (calEvent, jsEvent, view) {
                    f = start.split(' ');
                    // $("#btnAgregarE").prop("disabled", true);
                    f = calEvent.start._i.split(" ");
                    this.dataSave.date = f[0];
                    this.dataSave.start = f[1];
                    this.dataSave.name = calEvent.title;
                    this.dataSave.descripcion = calEvent.descripcion;
                    this.dataSave.selectedType = calEvent.type;
                    $("#modalEvento").modal();

                }
            });
        */
        }


    }
}


</script>