<template>
  <div class="l-page">
    <ModalTodo :data-modal="modalOpen"
               :data-form="form"
               :data-frame-info="frame"
               @OnAddTodo="addTodo"
               @OnUpdateTodo="updateTodo"
               @onCloseModal="openCloseModal" />
    <div class="card">
      <div class="c-cardLists card-content">
        <div class="c-cardLists_header">
          <button class="c-formTodo_btnAdd button is-small is-primary"
                  @click="openCloseModal"
                  type="button">Adicionar tarefa</button>
        </div>

        <div class="c-cardLists_content">
          <draggable class="c-frameContainer_content"
                     :list="frame.todos"
                     @change="todosChanged">
            <div class="c-todoBox" :key="ind" v-for="(todo, ind) in frame.todos">
              <button class="c-todoBox_btnIcon"
                      @click="excludeTodo(todo.id)"
                      title="Excluir quadro de tarefas">
                <svg class="c-todoBox_icon--close m-icon--xs">
                  <use :xlink:href="`#${closeIcon.id}`" />
                </svg>
              </button>

              <button class="c-todoBox_btnIcon"
                      @click="editTodo(todo)"
                      title="Excluir quadro de tarefas">
                <svg class="c-todoBox_icon--edit m-icon--xs">
                  <use :xlink:href="`#${editIcon.id}`" />
                </svg>
              </button>

              <div class="c-todoBox_content">
                <h4 class="c-todoBox_title">{{ todo.title }}</h4>
                <p class="c-todoBox_desc">{{ todo.description }}</p>
              </div>
            </div>
          </draggable>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import closeIcon from '../assets/icons/close.svg?sprite';
  import editIcon from '../assets/icons/edit.svg?sprite';
  import draggable from 'vuedraggable';
  import { getFrameById } from '../services/frame-service';
  // eslint-disable-next-line no-unused-vars
  import { setTodo, deleteTodo } from '../services/todo-service';
  import ModalTodo from '../components/ModalTodo';

  export default {
    name: 'FrameTasks',
    components: { draggable, ModalTodo },
    data() {
      return {
        closeIcon,
        editIcon,
        modalOpen: false,
        sending: false,
        form: {
          editing: false,
          title: '',
          description: '',
        },
        frame: {
          todos: [],
        },
      };
    },
    beforeMount() {
      this.getData();
    },
    methods: {
      openCloseModal() {
        this.modalOpen = !this.modalOpen;
        if (!this.modalOpen) {
          this.form = { editing: false, title: '', description: '' };
        }
      },
      editTodo(todo) {
        this.modalOpen = true;
        this.form = { editing: true, ...todo }
      },
      addTodo(val) {
        this.frame.todos.push(val);
      },
      updateTodo(val) {
        this.frame.todos = this.frame.todos.map(item  => {
          return (item.id === val.id) ? { ...item, ...val } : item;
        });
      },
      async getData() {
        const { id } = this.$route.params;
        await getFrameById(id).then(res => (this.frame = res.data)).catch(() => this.$router.push('/'));
      },
      async excludeTodo(id) {
        await deleteTodo(id).then(res => {
          if (res.data.ok) { this.frame.todos = this.frame.todos.filter(item => item.id !== id) }
        });
      },
      async todosChanged() {},
    },
  }
</script>

<style lang="scss">
  @import '../assets/css/_utilities/_exports';

  .c-formTodo {
    &_desc,
    &_input,
    &_btn {
      margin-top: pxToRem(12);
    }

    &_btn,
    &_btnAdd {
      display: block;
      margin-left: auto;
    }

    &_desc {
      min-height: pxToRem(56);
      resize: none;
    }
  }

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

  .c-cardLists {
    position: relative;
    padding-top: pxToRem(64);

    &_header {
      align-items: center;
      display: flex;
      height: pxToRem(64);
      left: 0;
      padding: pxToRem(12);
      position: absolute;
      right: 0;
      top: 0;
    }

    &_content {
      max-height: pxToRem(568);
      overflow-y: auto;
      @include scrollbars(pxToRem(6), $color-dark)
    }
  }

  .c-todoBox {
    margin-bottom: pxToRem(12);
    position: relative;
    padding-right: pxToRem(48);

    &_btnIcon {
      background-color: transparent;
      border: none;
      cursor: pointer;
      position: absolute;
      right: 0;

      &:first-child {
        right: pxToRem(24);
      }
    }

    &_icon {
      &--close {
        fill: $color-danger;
      }

      &--edit {
        fill: $color-lightBlue;
      }
    }

    &_title {
      font-size: pxToRem(16);
      font-weight: 500;
    }

    &_desc {
      font-size: pxToRem(12);
    }
  }
</style>
