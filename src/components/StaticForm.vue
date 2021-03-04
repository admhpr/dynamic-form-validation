<template>
  <div>
    Static Form (no validation)
    <FormContainer @submit="$emit('submit', $event)">
      <template v-slot:fields>
        <BaseInput label="First Name" type="text" v-model="firstName" />
        <BaseInput label="Last Name" type="text" v-model="lastName" />
      </template>
    </FormContainer>
  </div>
</template>

<script>
import BaseInput from "@/components/base/BaseInput";
import FormContainer from "@/containers/FormContainer";
export default {
  name: `StaticForm`,
  components: { BaseInput, FormContainer },
  data() {
    return {
      firstName: "",
      lastName: "",
    };
  },
};
</script>