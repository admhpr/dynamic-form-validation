import * as validators from "@/utils/validators";
export default {
  computed: {
    isValid() {
      return this.fieldValidators.length
        ? this.fieldValidators
            .map((validator) => {
              if (
                typeof validator === "string" &&
                typeof validators[validator] === "function"
              ) {
                return validators[validator](this.value);
              }
              if (
                Array.isArray(validator) &&
                typeof validators[validator[0]] === "function"
              ) {
                const [validatorName, argument] = validator;
                return validators[validatorName](this.value, argument);
              }
              throw new Error(`validator '${validator}' not defined`);
            })
            .every(Boolean)
        : this.fieldValidators.length === 0;
    }
  },
  created() {}
};
