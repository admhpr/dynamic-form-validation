import { internet, name, phone, random } from "faker";
function createUser() {
  return {
    id: random.uuid(),
    firstName: name.firstName(),
    lastName: name.lastName(),
    email: internet.email(),
    phoneNumber: phone.phoneNumberFormat()
  };
}
export default Array(10)
  .fill()
  .map((v) => createUser());
