<template>
  <div class="container">
    <form class="form" @submit.prevent="onSubmit">
      <slot name="header"></slot>
      <slot name="fields">
        <DynamicFormField
          v-for="(element, name) in schema"
          :ref="name"
          :key="name"
          :element="element"
          :validations="validations"
          @update="onValueUpdate"
          v-model="form[name]"
        />
      </slot>
      <div class="action">
        <slot name="action">
          <button type="submit">Submit</button>
        </slot>
      </div>
    </form>
  </div>
</template>

<script>
import DynamicFormField from "@/components/DynamicFormField"
export default {
  name: `FormContainer`,
  components: { DynamicFormField },
  props: {
    initialFormValues: {
      type: Object,
      required: false,
    },
    schema: {
      type: Object,
      required: false,
      default: () => {},
    },
    validations: {
      type: Object,
      required: false,
      default: () => {},
    },
  },
  data() {
    return {
      form: {},
      formValidations: {},
    }
  },
  methods: {
    onValueUpdate({ name, isValid }) {
      this.formValidations[name] = isValid
    },
    onSubmit() {
      for (const field of Object.keys(this.form)) {
        if (this.$refs.hasOwnProperty(field)) {
          /**
           * using $refs to change value of child component see:
           * https://vuejs.org/v2/guide/components-edge-cases.html#Accessing-Child-Component-Instances-amp-Child-Elements
           */
          this.$refs[field][0].isTouched = true
        }
      }
      if (this.isValidForm()) {
        this.$emit(`submit`, this.form)
        return
      }
    },
    isValidForm() {
      return Object.values(this.formValidations).every(Boolean)
    },
  },
  watch: {
    initialFormValues(value) {
      this.form = value
    },
  },
}
</script>
<style scoped>
.form {
  border: 1px solid var(--brand-dark);
  max-width: 500px;
  background-color: var(--brand-light);
  margin: 20px auto;
  box-shadow: -0.6rem 0.6rem 0 rgba(29, 30, 28, 0.26);
  padding: 20px;
  display: flex;
  flex-direction: column;
}
.action {
  display: flex;
  justify-content: flex-end;
}
button {
  border: 2px solid rgba(0, 0, 0, 0.6);
  background-image: none;
  background-color: var(--brand-grey);
  box-shadow: none;
  padding: 5px;
  cursor: pointer;
  font-weight: 500;
}
</style>
