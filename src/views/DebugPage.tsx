import React from "react";
import YAML from "yaml";
import { useData } from "../contexts/data.ctx";
import { SimpleSelect } from "react-selectize";

export default function DebugPage() {
  const data = useData();
  return (
    <>
      {/* <SimpleSelect
        options={this.state.options}
        placeholder="Select a color"
        createFromSearch={function (options, search) {
          if (
            search.length == 0 ||
            options
              .map(function (option) {
                return option.label;
              })
              .indexOf(search) > -1
          )
            return null;
          else return { label: search, value: search };
        }}
        onValueChange={function (item) {
          if (!!item && !!item.newOption) {
            self.state.options.unshift({
              label: item.label,
              value: item.value,
            });
            self.setState({ options: self.state.options });
          }
        }}
        // renderOption :: Int -> Item -> ReactElement
        renderOption={function (item) {
          return (
            <div
              className="simple-option"
              style={{ display: "flex", alignItems: "center" }}
            >
              <div
                style={{
                  backgroundColor: item.label,
                  borderRadius: "50%",
                  width: 24,
                  height: 24,
                }}
              ></div>
              <div style={{ marginLeft: 10 }}>
                {!!item.newOption ? "Add " + item.label + " ..." : item.label}
              </div>
            </div>
          );
        }}
        // renderValue :: Int -> Item -> ReactElement
        renderValue={function (item) {
          return (
            <div className="simple-value">
              <span
                style={{
                  backgroundColor: item.label,
                  borderRadius: "50%",
                  verticalAlign: "middle",
                  width: 24,
                  height: 24,
                }}
              ></span>
              <span style={{ marginLeft: 10, verticalAlign: "middle" }}>
                {item.label}
              </span>
            </div>
          );
        }}
      ></SimpleSelect> */}
      <pre>
        {`${YAML.stringify(
          Object.fromEntries(
            Object.entries(data).map(([k, v]) => [k, v.length])
          ),
          {
            collectionStyle: "flow",
            defaultStringType: "QUOTE_DOUBLE",
            doubleQuotedAsJSON: true,
            lineWidth: 0,
            minContentWidth: 80,
          }
        )}\n${YAML.stringify(data, {
          collectionStyle: "flow",
          //defaultKeyType: "QUOTE_DOUBLE",
          defaultStringType: "QUOTE_DOUBLE",
          doubleQuotedAsJSON: true,
          lineWidth: 1400,
          minContentWidth: 80,
        })}`}
      </pre>
    </>
  );
}
