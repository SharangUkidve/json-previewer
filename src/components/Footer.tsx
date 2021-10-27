import { createPortal } from "react-dom";
import { CopyAndDownload, ThemeType } from "../models/models";
import { FORMATTED_INDENT } from "../constants/constants";

import "../scss/footer.scss";

const Footer = ({
  theme,
  onThemeChange,
}: {
  theme: ThemeType;
  onThemeChange: (...args: any[]) => any;
}) => {
  return (
    <div className="footer">
      <button className="footer-action" onClick={() => onThemeChange()}>
        {theme === "light" ? "Dark Mode" : "Light Mode"}
      </button>
      <div className="footer-spacer"></div>
      <div className="footer-json-actions" id="footer-outlet"></div>
    </div>
  );
};

export const FooterPortal = ({
  copy,
  download,
  json,
}: CopyAndDownload & { json: any }) => {
  return createPortal(
    <>
      <button
        className="footer-action"
        onClick={() => download(json, FORMATTED_INDENT)}
      >
        Download Formatted
      </button>
      <button className="footer-action" onClick={() => download(json)}>
        Download Minified
      </button>
      <button
        className="footer-action"
        onClick={() => copy(json, FORMATTED_INDENT)}
      >
        Copy Formatted
      </button>
      <button className="footer-action" onClick={() => copy(json)}>
        Copy Minified
      </button>
    </>,
    document.getElementById("footer-outlet")!
  );
};

export default Footer;
