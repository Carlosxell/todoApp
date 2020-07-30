<template>
  <div class="c-todoBox">
    <button class="c-todoBox_btnIcon"
            @click="excludeTodo(todo.id)"
            title="Excluir quadro de tarefas">
      <svg class="c-todoBox_icon--close m-icon--xs">
        <use :xlink:href="`#${closeIcon.id}`" />
      </svg>
    </button>

    <button class="c-todoBox_btnIcon"
            @click="editTodo"
            title="Excluir quadro de tarefas">
      <svg class="c-todoBox_icon--edit m-icon--xs">
        <use :xlink:href="`#${editIcon.id}`" />
      </svg>
    </button>

    <div class="c-todoBox_content">
      <h4 class="c-todoBox_title">{{ dataTodo.title }}</h4>
      <p class="c-todoBox_desc">{{ dataTodo.description }}</p>
    </div>
  </div>
</template>

<script>
  import closeIcon from '../assets/icons/close.svg?sprite';
  import editIcon from '../assets/icons/edit.svg?sprite';
  import { deleteTodo } from '../services/todo-service';

  export default {
    name: 'TodoBox',
    props: {
      dataTodo: {
        type: Object,
        default: () => {},
      },
    },
    data: () => {
      return {
        closeIcon,
        editIcon,
      };
    },
    methods: {
      editTodo() {
        this.$emit('OnEditTodo', { ...this.dataTodo });
      },
      async excludeTodo(id) {
        await deleteTodo(id).then(res => {
          if (res.data.ok) { this.$emit('OnRemoveTodo', id); }
        });
      },
    }
  }
</script>

<style lang="scss">
  @import '../assets/css/_utilities/_exports';

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
