<template>
  <div class="modal fade" id="ModalDetailMovements" tabindex="-1" role="dialog" ref="modal">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Detalle de movimientos</h5>
          <button type="button" class="btn-close" @click="close()" aria-label="Close"></button>
        </div>

        <div class="modal-body">
          <slot>
            Contenido del modal.
          </slot>
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
