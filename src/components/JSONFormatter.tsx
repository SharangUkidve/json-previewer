import { memo } from "react";

const JSONFormatter = ({
  json,
  spaces,
  className,
}: {
  json: any;
  spaces: number;
  className: string;
}) => {
  return (
    <textarea
      readOnly
      className={`json json-${className}`}
      value={JSON.stringify(json, null, spaces)}
    />
  );
};

export default memo(JSONFormatter);
