<template>
  <div v-if="content">
    <img v-if="type === 'image'" :src="src" :class="mediaClass" :alt="alt" />
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: Object,
      default: undefined,
    },
    mediaClass: {
      type: String,
      default: '',
    },
  },
  computed: {
    src() {
      return this.content.fields.file.url;
    },
    alt() {
      return this.content.fields.title;
    },
    contentType() {
      return this.content.fields.file.contentType;
    },
    type() {
      return this.contentType.split('/')[0];
    },
  },
};
</script>
