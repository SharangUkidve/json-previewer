import React, { memo, TextareaHTMLAttributes } from "react";
import { ReactComponent as JSONLogo } from "../assets/json.svg";
import { PLACEHOLDER_TEXT } from "../constants/constants";

const Header = () => {
  return (
    <header className="json-header">
      <a
        href="/"
        aria-label="Home"
        title="JSON Previewer"
        className="json-header-link"
      >
        <JSONLogo className="json-logo" />
      </a>
    </header>
  );
};

const JSONInput = ({
  value,
  onChange,
}: TextareaHTMLAttributes<HTMLTextAreaElement>) => {
  return (
    <div className="json-input">
      <Header />
      <textarea
        name="json"
        className="json-input-editor"
        id="json-input"
        value={value}
        onChange={onChange}
        placeholder={PLACEHOLDER_TEXT}
      />
    </div>
  );
};

export default memo(JSONInput);
