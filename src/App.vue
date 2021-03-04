<template>
  <div>
    <StaticForm @submit="submitStaticForm" />
    <hr />
    <DynamicForm @submit="submitDynamicForm" />
    <hr />
    <UpdateUserForm @submit="submitUpdateUserForm" />
  </div>
</template>

<script>
import StaticForm from "@/components/StaticForm";
import DynamicForm from "@/components/DynamicForm";
import UpdateUserForm from "@/components/UpdateUserForm";
export default {
  name: "app",
  components: { StaticForm, DynamicForm, UpdateUserForm },
  methods: {
    submitStaticForm(values) {
      console.log(`valid static form`, values);
    },
    submitDynamicForm(values) {
      console.log(`valid dynamic form`, values);
    },
    submitUpdateUserForm(values) {
      console.log(`valid update user form`, values);
    },
  },
};
</script>
<style>
:root {
  --form-field-color: grey;
  --is-danger: red;
}
</style>