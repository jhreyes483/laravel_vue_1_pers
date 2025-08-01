<template>
    <div class="modal fade" id="ModalDetailMedicines" tabindex="-1" role="dialog" ref="modal">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Detalle de {{ tipo }}</h5>
                    <button type="button" class="btn-close" @click="close()" aria-label="Close"></button>
                </div>

                <div class="modal-body">
                    <table v-if="items.length" class="table table-sm table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Fecha</th>
                                <th>Día</th>
                                <th>Intervalo (días)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in items" :key="item.id">
                                <td>{{ item.id }}</td>
                                <td>{{ item.medicine_name }}</td>
                                <td>{{ formatDate(item.created_at) }}</td>
                                <td>{{ item.dia_semana }}</td>
                                <td>{{ item.interval_days }}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div v-else class="text-muted">No hay registros disponibles.</div>
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
    name: 'DetailMedicines',
    data() {
        return {
            items: [],
            tipo: '',
            modalInstance: null
        };
    },
    methods: {
        setData(data) {
            this.items = data.items || [];
            this.tipo = data.tipo || '';
        },
        formatDate(fecha) {
            const options = {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
            };
            return new Date(fecha).toLocaleString('es-CO', options);
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
