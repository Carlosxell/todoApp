<template>
  <div class="modal" :class="{ 'is-active': dataModal }">
    <div class="modal-background" @click="closeModal"></div>
    <button class="modal-close is-large" @click="closeModal" aria-label="close"></button>

    <div class="c-cardModal modal-content">
      <form class="card c-formTodo">
        <div class="card-content">
          <form @submit.prevent="updateOrPostTodo" novalidate>
            <input class="c-formTodo_input input is-small"
                   type="text"
                   v-model="dataForm.title"
                   placeholder="Nome da tarefas">
            <textarea class="c-formTodo_desc input is-small"
                      placeholder="Descrição"
                      v-model="dataForm.description"></textarea>
            <button class="c-formTodo_btn button is-small is-primary"
                    :class="{ 'is-loading': sending }">{{ dataForm.editing ? 'Atualizar' : 'Cadastrar' }}</button>
          </form>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import { setTodo, updateTodo } from "../services/todo-service";

  export default {
    name: 'ModalTodo',
    props: {
      dataModal: {
        type: Boolean,
        default: () => false,
      },
      dataFrameInfo: {
        type: Object,
        default: () => { return {}; },
      },
      dataForm: {
        type: Object,
        default: () => {
          return {
            editing: false,
            title: '',
            description: '',
          }
        },
      },
    },
    data: () => {
      return {
        sending: false,
      };
    },
    methods: {
      closeModal() {
        this.$emit('onCloseModal');
      },
      async updateOrPostTodo() {
        const { editing } = this.dataForm;
        const finalCountDown = () => this.sending = false;

        this.sending = true;

        if (!editing) {
          const objToSend = { ...this.dataForm, frame_id: this.dataFrameInfo.id, open: true, order: this.dataFrameInfo.todos.length +1 };

          await setTodo(objToSend).then(res => {
            this.$emit('OnAddTodo', { ...res.data })
            this.closeModal();
          }).finally(finalCountDown);
        } else {
          const objToSend = { frame_id: this.dataFrameInfo.id, ...this.dataForm, };

          await updateTodo(objToSend).then(res => {
            this.$emit('OnUpdateTodo', { ...this.dataForm, ...res.data });
            this.closeModal();
          }).finally(finalCountDown)
        }
      },
    },
  }
</script>

<style lang="scss">
  @import '../assets/css/_utilities/_exports';

  .c-cardModal {
    border-radius: pxToRem(6);
    max-width: pxToRem(300);
    margin: 0 auto;
    min-height: pxToRem(212);

    @media(min-width: pxToRem(568)) {
      max-width: pxToRem(412);
    }

    @media(min-width: pxToRem(768)) {
      max-width: pxToRem(568);
      min-height: pxToRem(300);
    }
  }
</style>
