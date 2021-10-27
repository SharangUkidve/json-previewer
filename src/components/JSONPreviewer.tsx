import { memo, useState } from "react";
import { getValueType } from "../utils/json-utils";
import { LinkRenderer, SimplePropertyRenderer } from "./ValueComponents";
import { IJSONPreviewer } from "../models/models";

const _ComplexPropertyRenderer = ({
  name,
  value,
  valueType,
  indent = 0,
}: {
  name: any;
  value: any;
  valueType: "array" | "object";
  indent?: number;
}) => {
  const length =
    valueType === "array" ? value.length : Object.keys(value).length;
  const [expanded, setExpanded] = useState(true);

  return (
    <>
      <div className="json-line" style={{ paddingLeft: `${indent * 0.5}rem` }}>
        {length ? (
          <button
            className={`json-toggle${expanded ? " json-toggle-rotated" : ""}`}
            onClick={() => setExpanded(!expanded)}
          >
            ▶
          </button>
        ) : null}
        <span className="json-key">{name}: </span>
        <span className="json-tag">{valueType}</span>
        <span className="json-length">{length} items</span>
      </div>
      {length && expanded ? (
        <JSONRenderer json={value} indent={indent + 1} />
      ) : null}
    </>
  );
};

const ComplexPropertyRenderer = memo(_ComplexPropertyRenderer);

const _TypeRenderer = ({
  name,
  value,
  indent,
}: {
  value: any;
  name: any;
  indent: number;
}) => {
  const valueType = getValueType(value);
  switch (valueType) {
    case "number":
    case "boolean":
    case "string":
      return (
        <SimplePropertyRenderer
          value={value}
          name={name}
          valueType={valueType}
          indent={indent}
        />
      );
    case "undefined":
    case "null":
      return (
        <SimplePropertyRenderer
          name={name}
          value={valueType}
          valueType={valueType}
          indent={indent}
        />
      );
    case "link":
      return <LinkRenderer link={value} name={name} indent={indent} />;
    case "object":
    case "array":
      return (
        <ComplexPropertyRenderer
          value={value}
          name={name}
          indent={indent}
          valueType={valueType}
        />
      );
    default:
      return null;
  }
};
const TypeRenderer = memo(_TypeRenderer);

const JSONRenderer = ({ json, indent = 0 }: { json: any; indent?: number }) => {
  const keys = Object.keys(json);
  return (
    json && (
      <>
        {keys.map((key) => {
          const value = json[key];
          return (
            <TypeRenderer key={key} value={value} name={key} indent={indent} />
          );
        })}
      </>
    )
  );
};

const JSONPreviewer = (props: IJSONPreviewer) => (
  <div className="json json-previewer">
    <JSONRenderer {...props} />
  </div>
);

export default memo(JSONPreviewer);
