export const newUserTypeGuard = (body: string): boolean => {
  const { name, age, hobbies } = JSON.parse(body);

  return (
    name &&
    age &&
    hobbies &&
    typeof age === "number" &&
    typeof name === "string" &&
    typeof hobbies === "object"
  );
};
