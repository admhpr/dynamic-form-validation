<template>
  <div>
    <component
      :is="component"
      v-bind="{ ...element, validators: fieldValidators }"
      :class="hasError ? 'is-invalid' : ''"
      :value="value"
      @blur="onBlur"
      @input="onComponentInput"
    />
    <span v-if="element.message && hasError" class="error-message">
      {{ element.message }}
    </span>
  </div>
</template>

<script>
import validation from "@/mixins/validation";
export default {
  name: `DynamicFormField`,
  mixins: [validation],
  props: {
    element: {
      type: Object,
      required: true,
    },
    validations: {
      type: Object,
      required: false,
    },
    value: {
      required: true,
      default: ``,
    },
  },
  data() {
    return {
      isTouched: false,
    };
  },
  computed: {
    hasError() {
      return this.isTouched && !this.isValid;
    },
    component() {
      const componentName = this.element.component;
      return () => import(`./base/${componentName}`);
    },
    fieldValidators() {
      const { name } = this.element;
      const validators = this.validations[name]
        ? this.validations[name].validators
        : [];
      return validators;
    },
  },
  created() {
    this.onComponentInput(this.value);
    this.onValidationStatusChange();
  },
  methods: {
    onBlur() {
      this.isTouched = true;
    },
    onComponentInput(value) {
      this.$emit(`input`, value);
    },
    onValidationStatusChange() {
      this.$emit(`update`, { name: this.element.name, isValid: this.isValid });
    },
  },
  watch: {
    isValid() {
      this.onValidationStatusChange();
    },
  },
};
</script>

<style>
.form-group {
  display: flex;
  flex-direction: column;
  margin: 1em;
}
.is-invalid > .form-control {
  border: 2px var(--is-danger) solid;
}
.error-message {
  color: var(--is-danger);
  margin-left: 1.25em;
  font-size: 0.75em;
}
</style>
