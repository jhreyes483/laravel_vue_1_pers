<template>
    <div class="modal fade" id="ModalDetailLeafMedicines" tabindex="-1" role="dialog" ref="modal">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Tomas programadas: {{ receta.length }} / {{ severalPerDay }}</h5>
                    <button type="button" class="btn-close" @click="close()" aria-label="Close"></button>
                </div>

                <div class="modal-body">
                    <div class="alert alert-info">
                        Ya has registrado <strong>{{ cantidadTomasHoy }}</strong> de <strong>{{ severalPerDay }}</strong> tareas hoy.
                    </div>

                    <div class="table-responsive">
                        <table v-if="receta.length" class="table table-sm table-striped">
                            <thead>
                                <tr>
                                    <th>Hora programada</th>
                                    <th>Medicamento</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in receta" :key="index">
                                    <td>{{ formatHour(item.hour)  }}</td>
                                    <td>{{ item.medicine_name }}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div v-else class="text-muted">No hay horarios programados.</div>
                    </div>
                </div>

                <div class="modal-footer">
                    <button class="btn btn-secondary" @click="close()">Cerrar</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Modal } from 'bootstrap';

export default {
    name: 'DetailLeafMedicines',
    data() {
        return {
            receta: [],
            cantidadTomasHoy: 0,
            severalPerDay: 0,
            modalInstance: null
        };
    },
    methods: {
        formatHour(hourString) {
            const [hour, minute] = hourString.split(':').map(Number);
            const ampm = hour >= 12 ? 'PM' : 'AM';
            let formattedHour = hour % 12 || 12; // 0 -> 12, 13 -> 1, etc.
            return `${formattedHour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')} ${ampm}`;
        },

        setData(data) {
            this.receta = data.receta || [];
            this.cantidadTomasHoy = data.cantidad_tomas_hoy || 0;
            this.severalPerDay = this.receta.length > 0 ? this.receta[0].several_per_day : 0;
        },
        open() {
            if (!this.modalInstance) {
                this.modalInstance = new Modal(this.$refs.modal);
            }
            this.modalInstance.show();
        },
        close() {
            if (this.modalInstance) {
                this.modalInstance.hide();
            }
        }
    }
};
</script>
