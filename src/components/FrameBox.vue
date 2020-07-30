<template>
  <div class="c-frameBox">
    <div class="c-frameBox_secActions">
      <router-link class="c-frameBox_btnIcon"
                   :to="{ name: 'Frame', params: { id: dataFrame.id } }"
                   title="Visualizar tarefas">
        <svg class="c-frameBox_icon--list m-icon">
          <use :xlink:href="`#${listIcon.id}`" />
        </svg>
      </router-link>

      <button class="c-frameBox_btnIcon"
              @click="editFrame(dataFrame)"
              title="Editar quadro de tarefas">
        <svg class="c-frameBox_icon--edit m-icon">
          <use :xlink:href="`#${editIcon.id}`" />
        </svg>
      </button>

      <button class="c-frameBox_btnIcon"
              @click="excludeFrame"
              title="Excluir quadro de tarefas">
        <svg class="c-frameBox_icon--close m-icon">
          <use :xlink:href="`#${closeIcon.id}`" />
        </svg>
      </button>
    </div>

    <h4 class="c-frameBox_title">{{ dataFrame.title }}</h4>
  </div>
</template>

<script>
  import closeIcon from '../assets/icons/close.svg?sprite';
  import editIcon from '../assets/icons/edit.svg?sprite';
  import listIcon from '../assets/icons/list.svg?sprite';
  import { deleteFrame } from '../services/frame-service';

  export default {
    name: 'FrameBox',
    props: {
      dataFrame: {
        type: Object,
        default: () => {}
      },
    },
    data: () => {
      return {
        editIcon,
        listIcon,
        closeIcon,
      };
    },
    methods: {
      async editFrame() {
        this.$emit('OnEditFrame', { ...this.dataFrame });
      },
      async excludeFrame() {
        await deleteFrame(this.dataFrame.id).then(res => {
          if (res.data.ok) { this.$emit('OnExcludeFrame', this.dataFrame.id); }
        });
      },
    },
  }
</script>

<style lang="scss">
  @import '../assets/css/_utilities/_exports';

  .c-frameBox {
    align-items: center;
    background-color: $color-white;
    border-radius: pxToRem(6);
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    min-height: pxToRem(112);
    position: relative;
    text-align: center;
    @include grabcursor();

    &_title {
      color: darken($color-dark, 4%);
      font-size: pxToRem(16);
      font-weight: 500;
    }

    &_secActions {
      align-items: center;
      display: flex;
      justify-content: flex-end;
      width: 100%;
    }

    &_btnIcon {
      background-color: transparent;
      border-radius: 50%;
      border: none;
      cursor: pointer;
      height: pxToRem(24);
      margin: 0 pxToRem(4);
      outline: none;
      padding: 0;
      width: pxToRem(24);

      &:focus,
      &:active {
        outline: none;
      }
    }

    &_icon {
      &--list {
        fill: $color-gray;
      }

      &--edit {
        fill: $color-lightBlue;
      }

      &--close {
        fill: $color-danger;
      }
    }
  }
</style>
