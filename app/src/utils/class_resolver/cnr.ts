type ClassValues =
  | string
  | null
  | undefined
  | number
  | false
  | ClassDict
  | ClassArr;
type ClassArr = ClassValues[];
type ClassDict = Record<string, boolean | null | undefined | number>;

/**
 * Class name resolver (cnr)
 *
 * @param args  Accepts strings, arrays, and objects with conditional values.
 * @returns Returns a space-separated class name string.
 */

export default function cnr(...args: ClassValues[]): string {
  let classes = "";

  function concatString(str: string): void {
    classes += (classes ? " " : "") + str;
  }

  for (const arg of args) {
    if (!arg) continue;

    switch (typeof arg) {
      case "string":
        concatString(arg);
        break;
      case "object":
        if (Array.isArray(arg)) {
          const nested = cnr(...arg);
          if (nested) concatString(nested);
        } else {
          for (const key in arg) {
            if (arg[key]) concatString(key);
          }
        }
        break;
      default:
        console.error("Classname is not valid type");
        break;
    }
  }

  return classes;
}
