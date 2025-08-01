<template>
    <div class="modal fade" id="ModalDetailMovements" tabindex="-1" role="dialog" ref="modal">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Detalle de movimientos:</h5> <br>
                    <button type="button" class="btn-close" @click="close()" aria-label="Close"></button>
                </div>

                <div class="modal-body">
                    <div class="mb-3">
                        <span>
                            <b>Tipo: </b> {{ investment.type_name }} <br>
                        </span>
                        <span>
                            <b>Descripción:</b> {{ investment.name }} <br>
                        </span>
                        <span>
                            <b>Entidad:</b> {{ investment.entity }} <br>
                        </span>
                    </div>
                    <div class="table-responsive">
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
                                        <span class="badge" :class="pago.status == 1 ? 'bg-success' : 'bg-secondary'">
                                            {{ pago.status == 1 ? 'Activo' : 'Inactivo' }}
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr class="fw-bold">
                                    <td colspan="1">Total</td>
                                    <td>{{ formatPesos(totalPagos) }}</td>
                                    <td colspan="2"></td>
                                </tr>
                            </tfoot>
                        </table>
                        <div v-else class="text-muted">No hay pagos registrados.</div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" @click="close()">Cerrar</button>
                    <!-- 
                    <button class="btn btn-primary" @click="confirm()">Guardar</button> 
                   -->
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
            pagos: [],
            investment: [],
            modalInstance: null
        };
    },
    computed: {
        totalPagos() {
            return this.pagos.reduce((sum, pago) => sum + parseFloat(pago.value || 0), 0);
        }
    },
    methods: {
        setData(data) {
            this.pagos = data.pagos
            this.investment = data.investment
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
