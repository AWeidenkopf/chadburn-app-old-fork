/**
 * This declaration prevents tsc from complaining about image
 * imports.
 */
declare module "*.svg" {
  const value: any;
  export = value;
}
