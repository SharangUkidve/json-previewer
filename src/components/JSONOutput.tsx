import { memo, useEffect, useState } from "react";
import JSONPreviewer from "./JSONPreviewer";
import JSONFormatter from "./JSONFormatter";
import JSONValidator from "./JSONValidator";
import { copyJSONToClipboard, downloadJSON } from "../utils/json-utils";
import Toast from "./Toast";
import { ITab } from "../models/models";
import { FORMATTED_INDENT } from "../constants/constants";

import "../scss/output.scss";

const Tab = ({
  active,
  name,
  onClick,
}: {
  active: boolean;
  name: string;
  onClick: any;
}) => {
  return (
    <li className="tab">
      <button
        className={`tab-text${active ? " tab-active" : ""}`}
        onClick={onClick}
      >
        {name}
      </button>
    </li>
  );
};

const tabs: ITab[] = [
  {
    key: "preview",
    name: "Preview",
    Component: JSONPreviewer,
  },
  {
    key: "format",
    name: "Format",
    Component: JSONFormatter,
    className: "formatter",
    spaces: FORMATTED_INDENT,
  },
  {
    key: "minify",
    name: "Minify",
    Component: JSONFormatter,
    className: "minifier",
    spaces: 0,
  },
];

const JSONOutput = ({ json }: { json: string }) => {
  const [activeTab, setActiveTab] = useState<ITab>();
  const [toastMessage, setToastMessage] = useState("");

  const copy = (validJSON: any, indent = 0) => {
    copyJSONToClipboard(validJSON, indent)
      .then(() => {
        setToastMessage("Copied Successfully!");
      })
      .catch();
  };

  const download = (validJSON: any, indent = 0) => {
    downloadJSON(validJSON, indent);
  };

  useEffect(() => {
    const lastActiveTabName = localStorage.getItem("activeTab");
    setActiveTab(
      lastActiveTabName
        ? tabs.find((tab) => tab.name === lastActiveTabName) || tabs[0]
        : tabs[0]
    );
  }, []);

  const updateActiveTab = (newTab: ITab) => {
    setActiveTab(newTab);
    localStorage.setItem("activeTab", newTab.name);
  };

  return activeTab ? (
    <div className="json-output">
      <ul className="tabs">
        {tabs.map((tab) => (
          <Tab
            name={tab.name}
            active={tab.key === activeTab!.key}
            key={tab.key}
            onClick={() => updateActiveTab(tab)}
          />
        ))}
      </ul>
      <JSONValidator
        json={json}
        {...activeTab!}
        copy={copy}
        download={download}
      />
      {toastMessage ? (
        <Toast message={toastMessage} onClose={() => setToastMessage("")} />
      ) : null}
    </div>
  ) : null;
};

export default memo(JSONOutput);
