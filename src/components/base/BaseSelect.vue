<template>
  <div class="form-group">
    <label>{{ label }}</label>
    <select
      v-model="selectedValue"
      class="form-control"
      @change="$emit('input', selectedValue)"
    >
      <option
        v-for="(opt, index) in options"
        :key="index"
        :value="opt.value"
        :selected="value === opt.value"
      >
        {{ opt.label || "No label" }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: `BaseSelect`,
  props: {
    label: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      required: true,
      validator(opts) {
        return opts.every((opt) => typeof opt === `object`);
      },
    },
    value: {
      type: [String, Object],
      required: true,
    },
    validator: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      selectedValue: "",
    };
  },
};
</script>
<style scoped>
select {
  border: 2px solid rgba(0, 0, 0, 0.6);
  background-image: none;
  background-color: #dadad3;
  box-shadow: none;
  padding: 5px;
}
</style>