<template>
  <div class="row" v-show="file">
    <div class="col-8">
      <canvas class="canvas" ref="canvas"></canvas>
    </div>
    <aside class="col" v-if="file">
      <div class="mb-3"><button class="btn btn-primary w-100" @click="grayscale">GS</button></div>
      <div class="mb-3"> <button class="btn btn-secondary w-100" @click="save">Save</button></div>
      <slot></slot>

    </aside>
  </div>
</template>

<script>
export default {
  name: "FileRenderer",
  props: {
    file: String,
  },
  data() {
    return {
      workingFile: null,
    };
  },
  computed: {
    canvas() {
      return this.$refs.canvas;
    },
    context() {
      return this.canvas?.getContext('2d');
    }
  },
  methods: {
    grayscale() {
      const imgData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
      const data = imgData.data;

      for(let i = 0; i < data.length; i += 4) {
        const red = data[i];
        const green = data[i + 1];
        const blue = data[i + 2];
        const alpha = data[i + 3];
        const pixel = (red + green + blue) / 3;

        data[i] = pixel;
        data[i + 1] = pixel;
        data[i + 2] = pixel;
        data[i + 3] = alpha;
      }

      const newImageData = new ImageData(data, this.canvas.width, this.canvas.height);
      this.context.putImageData(newImageData, 0, 0);
      this.workingFile = this.canvas.toDataURL();
      this.render();

    },
    async save() {
      const dataUrl = this.canvas.toDataURL('image/png').split(';base64,');
      await window.api.write(dataUrl[1]);
    },
    render() {
      if (this.workingFile) {
        const img = new Image();

        img.onload = () => {
          this.canvas.width = img.width;
          this.canvas.height = img.height;
          this.context.drawImage(img, 0, 0);
        }
        img.src = this.workingFile;
      } else {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      }
    }
  },
  watch: {
    file(selectedFile) {
      this.workingFile = selectedFile;
      this.render()
    }
  },
  mounted() {
    this.render();
  }
}
</script>

<style scoped>
.canvas {
  border: 1px solid gray;
  width: 100%;
  height: auto;
}
</style>
