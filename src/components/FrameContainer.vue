<template>
  <div class="c-frameContainer">
    <button class="c-frameContainer_btnAdd button is-small is-primary"
            @click="openModal"
            type="button">Adicionar quadro de tarefas</button>
    <draggable class="c-frameContainer_content" :list="frames">
      <div class="c-frameBox" :key="ind" v-for="(item, ind) in frames">
        <div class="c-frameBox_secActions">
          <button class="c-frameBox_btnIcon" title="Visualizar tarefas">
            <svg class="c-frameBox_icon--list m-icon--sm">
              <use :xlink:href="`#${listIcon.id}`" />
            </svg>
          </button>

          <button class="c-frameBox_btnIcon" title="Editar quadro de tarefas">
            <svg class="c-frameBox_icon--edit m-icon--sm">
              <use :xlink:href="`#${editIcon.id}`" />
            </svg>
          </button>

          <button class="c-frameBox_btnIcon"
                  @click="excludeFrame(item.id)"
                  title="Excluir quadro de tarefas">
            <svg class="c-frameBox_icon--close m-icon--sm">
              <use :xlink:href="`#${closeIcon.id}`" />
            </svg>
          </button>
        </div>

        <h4 class="c-frameBox_title">{{ item.title }}</h4>
      </div>
    </draggable>

    <div class="modal" :class="{ 'is-active': modalOpen }">
      <div class="modal-background" @click="openModal"></div>
      <div class="modal-content">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, blanditiis deleniti dolorum et laboriosam minima molestias nam nobis sapiente. Accusamus beatae esse est impedit, magnam perferendis placeat unde voluptatum! Quibusdam?
      </div>
      <button class="modal-close is-large" @click="openModal" aria-label="close"></button>
    </div>
  </div>
</template>

<script>
  import draggable from 'vuedraggable';
  import closeIcon from '../assets/icons/close.svg?sprite';
  import editIcon from '../assets/icons/edit.svg?sprite';
  import listIcon from '../assets/icons/list.svg?sprite';
  import { getFrames, deleteFrame } from '../services/frame-service';

  export default {
    name: "FrameContainer",
    components: { draggable },
    data () {
      return {
        modalOpen: false,
        editIcon,
        listIcon,
        closeIcon,
        frames: [],
      }
    },
    methods: {
      async excludeFrame(id) {
        await deleteFrame(id).then(res => {
          if (res.data.ok) { this.frames = this.frames.filter(item => item.id !== id) }
        });
      },
      openModal() {
        this.modalOpen = !this.modalOpen;
      },
      async initData() {
        await getFrames().then(res => this.frames = res.data);
      },
      async updateFrameOrder(list) {
        let listUpdated = [];

        list.map((item, ind) => {
          if (item.order !== ind) {
            item.order = ind;
            listUpdated.push({ ...item, order: ind});
          }
          return item;
        });
      },
    },
    beforeMount() {
      this.initData();
    },
    watch: {
      items: function (newVal) {
        this.updateFrameOrder(newVal);
      }
    },
  }
</script>

<style lang="scss">
  @import '../assets/css/_utilities/_exports';

  .c-frameContainer {
    background-color: $color-gris;
    border-radius: pxToRem(6);
    margin: 0 auto;
    max-width: pxToRem(768);
    padding: pxToRem(12);

    &_btnAdd {
      display: block;
      margin-left: auto;
    }

    &_content {
      display: grid;
      grid-gap: pxToRem(20);
      margin-top: pxToRem(20);
      width: 100%;

      @media(min-width: pxToRem(568)) {
        grid-template-columns: repeat(2, 1fr);
      }

      @media(min-width: pxToRem(768)) {
        grid-template-columns: repeat(3, 1fr);
      }
    }
  }

  .c-frameBox {
    align-items: center;
    background-color: $color-white;
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
      display: flex;
      justify-content: flex-end;
      width: 100%;
    }

    &_btnIcon {
      background-color: transparent;
      border-radius: 50%;
      border: none;
      cursor: pointer;
      outline: none;

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
