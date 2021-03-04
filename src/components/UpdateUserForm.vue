<template>
  <div>
    Update User Form (with validation)
    <FormContainer
      :schema="schema"
      :validations="validations"
      :initialFormValues="selectedUser"
      v-on="$listeners"
    >
      <template v-slot:header>
        <div class="select-wrapper">
          <BaseSelect
            label="User Select"
            :options="usersList"
            :value="selectedUser"
            @input="onUserSelect"
          />
        </div>
      </template>
      <template v-slot:action>
        <button type="submit">Update</button>
      </template>
    </FormContainer>
  </div>
</template>

<script>
import BaseSelect from "@/components/base/BaseSelect";
import FormContainer from "@/containers/FormContainer";
import { createValidations } from "@/utils/validators";
import { parse } from "@/utils/schemaParser.js";
import schema from "@/data/secondFormSchema.json";
import usersList from "@/data/users";
export default {
  name: `UpdateUserForm`,
  components: { BaseSelect, FormContainer },
  data() {
    return {
      validations: createValidations(
        {
          firstName: [`isAlpha`],
          lastName: [`isAlpha`],
          email: [`isEmail`],
          phoneNumber: [`isPhoneNumber`],
        },
        { applyToAll: [`isRequired`] }
      ),
      selectedUser: {},
      usersList: this.asSelectUserOptions(usersList),
    };
  },
  computed: {
    schema() {
      return Object.keys(this.selectedUser).length ? parse(schema) : {};
    },
  },
  methods: {
    onUserSelect(value) {
      this.selectedUser = value;
    },
    asSelectUserOptions(users) {
      return users.map((user) => ({
        label: `${user.id} | ${user.firstName} ${user.lastName}`,
        value: user,
      }));
    },
  },
};
</script>