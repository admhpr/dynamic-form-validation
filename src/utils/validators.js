export function createValidations(validations, { applyToAll = [] }) {
  let withAdditional = {};
  for (const [name, validators] of Object.entries(validations)) {
    withAdditional[name] = {
      validators: [...validators, ...applyToAll],
      ...{ isValid: false, isTouched: false }
    };
  }
  return withAdditional;
}

export function isAlpha(value) {
  return /^[a-zA-Z]*$/.test(value);
}

export function isEmail(value) {
  /* eslint-disable no-control-regex */
  const emailRegex = /^(?:[A-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9]{2,}(?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i;
  return emailRegex.test(value);
}

export function isPhoneNumber(value) {
  const phoneNumberRegex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
  return phoneNumberRegex.test(value);
}

export function isNumeric(value) {
  return /^[0-9]*$/.test(value);
}

export function isRequired(value) {
  return Boolean(value.length);
}

export function minLength(value, length) {
  return value >= length;
}
