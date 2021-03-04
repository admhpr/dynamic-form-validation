
<template>
  <div class="form-group">
    <label>{{ label }}</label>
    <input
      :value="value"
      :type="type"
      class="form-control"
      @input="$emit('input', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  name: `BaseInput`,
  props: {
    label: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: `text`,
      validator(value) {
        return [`text`, `email`, `password`].includes(value);
      },
    },
    value: {
      type: String,
      required: true,
    },
  },
};
</script>
<style scoped>
input,
textarea {
  border: 2px solid rgba(0, 0, 0, 0.6);
  background-image: none;
  background-color: #dadad3;
  box-shadow: none;
  padding: 5px;
}
</style>