import { NamedExoticComponent } from "react";

export interface ITab {
  key: string;
  name: string;
  Component: NamedExoticComponent<any>;
  className?: string;
  spaces?: number;
}

export interface CopyAndDownload {
  copy: (json: any, indent?: number) => void;
  download: (json: any, indent?: number) => void;
}

export type ThemeType = "light" | "dark";

export type ValueType =
  | "link"
  | "number"
  | "string"
  | "array"
  | "object"
  | "null"
  | "undefined"
  | "boolean";

export interface IJSONPreviewer {
  json: any;
  indent?: number;
}
