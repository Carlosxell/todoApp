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
          <router-link class="button is-small"
                       :to="{ name: 'Home' }">Voltar</router-link>

          <button class="c-formTodo_btnAdd button is-small is-primary"
                  @click="openCloseModal"
                  type="button">Adicionar tarefa</button>
        </div>

        <div class="c-cardLists_content">
          <draggable :list="frame.todos"
                     @change="todosChanged">
            <TodoBox @OnRemoveTodo="excludeTodo"
                     @OnEditTodo="editTodo"
                     :data-todo="todo"
                     :key="ind"
                     v-for="(todo, ind) in frame.todos" />
          </draggable>

          <p class="c-frameNoResults" v-if="!frame.todos.length">Nenhuma task cadastrada</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import draggable from 'vuedraggable';
  import { getFrameById } from '../services/frame-service';
  import ModalTodo from '../components/ModalTodo';
  import TodoBox from '../components/TodoBox';

  export default {
    name: 'FrameTasks',
    components: { TodoBox, draggable, ModalTodo },
    data() {
      return {
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
        this.form = { editing: true, ...todo };
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
      excludeTodo(id) {
        this.frame.todos = this.frame.todos.filter(item => item.id !== id)
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

  .c-frameNoResults {
    font-size: pxToRem(18);
    text-align: center;
  }
</style>
