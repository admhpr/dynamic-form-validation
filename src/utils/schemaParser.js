export function parse(schema) {
  const fields = schema["fields"];
  const parsedSchema = {};

  for (const field of fields) {
    const { opts, type, id, ...rest } = field;
    parsedSchema[field.id] = {
      component: componentForField(type),
      options: opts || null,
      name: id,
      ...rest
    };
  }
  return parsedSchema;
}

function componentForField(field) {
  switch (field) {
    case "select":
      return "BaseSelect";

    default:
      return "BaseInput";
  }
}
