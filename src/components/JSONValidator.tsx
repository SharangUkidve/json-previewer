import { memo } from "react";
import { CopyAndDownload } from "../models/models";
import { FooterPortal } from "./Footer";

const JSONValidator = ({
  json,
  Component,
  copy,
  download,
  ...props
}: {
  json: string;
  Component: any;
} & CopyAndDownload) => {
  if (!json?.length) return null;
  try {
    const obj = JSON.parse(json);
    return (
      <>
        <Component json={obj} {...props} />
        <FooterPortal copy={copy} download={download} json={obj} />
      </>
    );
  } catch (e: any) {
    return <div className="json-error">{e.message}</div>;
  }
};

export default memo(JSONValidator);
