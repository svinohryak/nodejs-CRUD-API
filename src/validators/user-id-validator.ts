const uuidRegExpStr = "[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}";
const idValidationRegExp = new RegExp(`^${uuidRegExpStr}$`, "i");

export const userIdValidator = (path1: string, path2: string, id: string | undefined): boolean => {
  return `/${path1}/${path2}` === "/api/users" && id && !idValidationRegExp.test(id);
};
