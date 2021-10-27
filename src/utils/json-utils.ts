import { copyToClipboard } from "./copy-to-clipboard";
import { fileDownload } from "./file-download";
import { ValueType } from "../models/models";
import { URLRegex } from "../constants/constants";

export const isURL = (str: string) => {
  return URLRegex.test(str);
};

export const getValueType = (value: any): ValueType => {
  const valueType = typeof value;
  switch (valueType) {
    case "boolean":
    case "number":
    case "undefined":
      return valueType;
    case "string":
      return isURL(value) ? "link" : "string";
    case "object":
      return !value ? "null" : Array.isArray(value) ? "array" : "object";
    default:
      return "null";
  }
};

export const isValidTheme = (theme: string) =>
  ["light", "dark"].includes(theme);

export const copyJSONToClipboard = (json: any, indent = 0) => {
  return copyToClipboard(JSON.stringify(json, null, indent));
};

export const downloadJSON = (json: any, indent = 0) => {
  fileDownload(
    JSON.stringify(json, null, indent),
    `${indent ? "formatted" : "minified"}.json`
  );
};
