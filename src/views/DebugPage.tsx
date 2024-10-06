import React from "react";
import Header from "../components/Header";
import Main from "../components/Main";
import { useData } from "../contexts/data.ctx";

export default function DebugPage() {
  const data = useData();
  return (
    <>
      <Header name="Debug">
        <table className="border-separate	border-spacing-x-4 my-4 -mx-4">
          <thead>
            <tr>
              {Object.keys(data).map(key => (
                <th className="capitalize" key={key}>
                  {key}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {Object.entries(data).map(([key, cat]) => (
                <td key={key}>{cat.length}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </Header>
      <Main>
        {/*
        <pre>
          {YAML.stringify(data, {
            collectionStyle: "flow",
            //defaultKeyType: "QUOTE_DOUBLE",
            defaultStringType: "QUOTE_DOUBLE",
            doubleQuotedAsJSON: true,
            lineWidth: 1400,
            minContentWidth: 80,
          })}
        </pre>
        */}
      </Main>
    </>
  );
}
