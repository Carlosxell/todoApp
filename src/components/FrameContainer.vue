<template>
  <div class="c-frameContainer">
    <button class="c-frameContainer_btnAdd button is-small is-primary"
            @click="openModal"
            type="button">Adicionar quadro de tarefas</button>

    <draggable class="c-frameContainer_content" :list="frames" @change="framesChanged">
      <FrameBox @OnExcludeFrame="excludeFrame"
                @OnEditFrame="editFrame"
                :data-frame="frame"
                :key="ind"
                v-for="(frame, ind) in frames" />
    </draggable>

    <div class="modal" :class="{ 'is-active': modalOpen }">
      <div class="modal-background" @click="openModal"></div>
      <button class="modal-close is-large" @click="openModal" aria-label="close"></button>

      <div class="modal-content">
        <div class="card c-cardModal">
          <div class="card-content">
            <form @submit.prevent="updateOrPostFrame" novalidate>
              <input class="input is-small"
                     type="text"
                     v-model="form.title"
                     placeholder="Nome do quadro de tarefas">
              <button class="c-frameForm_btnForm button is-small is-primary"
                      :class="{ 'is-loading': sending }">{{ form.editing ? 'Atualizar' : 'Cadastrar' }}</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { orderBy } from 'lodash';
  import draggable from 'vuedraggable';
  import { getFrames, updateFrame, setFrame } from '../services/frame-service';
  import FrameBox from "./FrameBox";

  export default {
    name: "FrameContainer",
    components: { FrameBox, draggable },
    data () {
      return {
        form: { editing: false, title: '' },
        sending: false,
        modalOpen: false,
        frames: [],
      }
    },
    methods: {
      async excludeFrame(id) {
        this.frames = this.frames.filter(item => item.id !== id);
      },
      openModal() {
        this.modalOpen = !this.modalOpen;
        this.form = this.modalOpen ? { ...this.form, order: this.frames.length + 1 } : { editing: false, title: '' };
      },
      async initData() {
        await getFrames().then(res => this.frames = orderBy(res.data, ['order']));
      },
      // eslint-disable-next-line no-unused-vars
      async framesChanged({ moved: { element, newIndex } }) {
        await updateFrame({ ...element, order: newIndex }).then((res) => console.info(res, 'item atualizado'));
      },
      editFrame(frame) {
        this.modalOpen = true;
        this.form = { editing: true, ...frame }
      },
      async updateOrPostFrame() {
        const { editing } = this.form;
        const finalCountDown = () => this.sending = false;
        const success = (res) => {
          this.frames.push({ ...res.data });
          this.openModal();
        };

        this.sending = true;

        if (editing) {
          await updateFrame({...this.form}).then(res => {
            this.frames = this.frames.map(item  => {
              return (item.id === res.data.id) ? { ...item, ...res.data } : item;
            });
            this.openModal();
          }).finally(finalCountDown);
        } else {
          await setFrame({...this.form}).then(success).finally(finalCountDown);
        }
      },
    },
    beforeMount() {
      this.initData();
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

  .c-frameForm {
    &_btnForm {
      display: block;
      margin-top: pxToRem(20);
      margin-left: auto;
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
</style>
