const uuidRegExpStr = "[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}";
const idValidationRegExp = new RegExp(`^${uuidRegExpStr}$`, "i");

export const userIdValidator = (splittedUrl: string[] | undefined): boolean => {
  if (!splittedUrl) return false;
  const [, path1, path2, id] = splittedUrl;
  return !!(`/${path1}/${path2}` === "/api/users" && id && !idValidationRegExp.test(id));
};
