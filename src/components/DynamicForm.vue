<template>
  <div>
    Dynamic Form (with validation)
    <FormContainer
      :schema="schema"
      :validations="validations"
      v-on="$listeners"
    />
  </div>
</template>

<script>
import FormContainer from "@/containers/FormContainer";
import { createValidations } from "@/utils/validators";
import { parse } from "@/utils/schemaParser.js";
import schema from "@/data/mainFormSchema.json";
export default {
  name: `DynamicForm`,
  components: { FormContainer },
  data() {
    return {
      validations: createValidations(
        {
          firstName: [`isAlpha`, [`minLength`, 8]],
          lastName: [`isAlpha`],
          email: [`isEmail`],
          favoriteAnimal: [],
        },
        { applyToAll: [`isRequired`] }
      ),
    };
  },
  computed: {
    schema() {
      return parse(schema);
    },
  },
};
</script>