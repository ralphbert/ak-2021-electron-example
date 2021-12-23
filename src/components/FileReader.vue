<template>
  <div class="file-reader">
    <div class="row">
      <div class="col">
        <div
            class="dropzone"
            :class="{ 'dragging': isDragging }"
            @drop.prevent.stop="onDrop"
            @dragover.prevent="onDragOver"
            @dragleave.prevent="onDragLeave"
            @dragenter.prevent="onDragEnter"
            @click="open"
        >
          DROP FILE HERE or CLICK
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {FileHandler} from "@/services/file-handler";

export default {
  name: "FileReader",
  data() {
    return {
      isDragging: false,
      files: [],
    }
  },
  methods: {
    async open() {
      const file = await window.api.open();
      this.$emit('fileSelected', file);
    },
    onDragEnter() {
      this.isDragging = true;
    },
    onDragLeave() {
      this.isDragging = false;
    },
    onDragOver() {
    },
    onDrop(event) {
      event.preventDefault();
      event.stopPropagation();
      this.isDragging = false;
      FileHandler.fromDropEvent(event).then(
          file => this.$emit('fileSelected', file),
          (error) => {
            console.log('error', error);
            this.$emit('fileSelected', null)
          },
      );
    }
  }
}
</script>

<style scoped lang="scss">
.file-reader {
  position: relative;
}

.dropzone {
  border: 1px dashed gray;
  border-radius: 1rem;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: #efefef;
  }

  &.dragging {
    border: 1px solid blue;
  }
}
</style>
