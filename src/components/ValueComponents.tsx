import { memo, PropsWithChildren } from "react";
import { ValueType } from "../models/models";

const _LinkRenderer = ({
  link,
  name,
  indent,
}: {
  link: string;
  name: string;
  indent: number;
}) => {
  return (
    <PropertyRenderer name={name} indent={indent}>
      <a
        href={link}
        className="json-link json-text"
        target="_blank"
        rel="noopener noreferrer"
      >
        {link}
      </a>
    </PropertyRenderer>
  );
};

const _SimplePropertyRenderer = ({
  name,
  value,
  valueType,
  indent,
}: {
  name: any;
  value: string | boolean | number;
  valueType: ValueType;
  indent: number;
}) => {
  return (
    <PropertyRenderer name={name} indent={indent}>
      <span className={`json-text json-${valueType}`}>{value.toString()}</span>
    </PropertyRenderer>
  );
};

const PropertyRenderer = ({
  name,
  indent = 0,
  children,
}: PropsWithChildren<{ name: string; indent?: number }>) => {
  return (
    <div className="json-line" style={{ paddingLeft: `${indent * 0.5}rem` }}>
      <span className="json-key">{name}: </span>
      <span className="json-value">{children}</span>
      {/*<br />*/}
    </div>
  );
};

export const LinkRenderer = memo(_LinkRenderer);
export const SimplePropertyRenderer = memo(_SimplePropertyRenderer);
