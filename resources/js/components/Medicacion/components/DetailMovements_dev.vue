<template>
    <div class="modal fade" id="ModalDetailMovements" tabindex="-1" role="dialog" ref="modal">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Detalle de movimientos</h5>
                    <button type="button" class="btn-close" @click="close()" aria-label="Close"></button>
                </div>

                <div class="modal-body">
                    <div class="modal fade" id="ModalDetailMovements" tabindex="-1" role="dialog" ref="modal">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <!-- Header -->
                                <div class="modal-header">
                                    <h5 class="modal-title">Detalle de movimientos</h5>
                                    <button type="button" class="btn-close" @click="close()"
                                        aria-label="Close"></button>
                                </div>

                                <!-- Body -->
                                <div class="modal-body">
                                    <table v-if="pagos.length" class="table table-sm table-striped">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Valor</th>
                                                <th>Fecha</th>
                                                <th>Estado</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="pago in pagos" :key="pago.id">
                                                <td>{{ pago.id }}</td>
                                                <td>{{ formatPesos(pago.value) }}</td>
                                                <td>{{ formatDate(pago.created_at) }}</td>
                                                <td>
                                                    <span class="badge"
                                                        :class="pago.status == 1 ? 'bg-success' : 'bg-secondary'">
                                                        {{ pago.status == 1 ? 'Activo' : 'Inactivo' }}
                                                    </span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div v-else class="text-muted">No hay pagos registrados.</div>
                                </div>

                                <!-- Footer -->
                                <div class="modal-footer">
                                    <button class="btn btn-secondary" @click="close()">Cerrar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="modal-footer">
                    <button class="btn btn-secondary" @click="close()">Cerrar</button>
                    <button class="btn btn-primary" @click="confirm()">Guardar</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Modal } from 'bootstrap';

export default {
    name: 'DetailMovements',
    data() {
        return {
            modalInstance: null
        };
    },
    methods: {
        setData(pagos) {
            this.pagos = pagos
        },
        formatPesos(valor) {
            return new Intl.NumberFormat('es-CO', {
                style: 'currency',
                currency: 'COP',
                minimumFractionDigits: 0
            }).format(valor)
        },   
        formatDate(fecha) {
            return new Date(fecha).toLocaleString('es-CO')
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
        },
        confirm() {
            this.$emit('confirm');
            this.close();
        }
    }
};
</script>
