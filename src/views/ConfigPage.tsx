import React from "react";
import Header from "../components/Header";
import Main from "../components/Main";

export default function ConifgPage() {
  return (
    <>
      <Header name="Config"></Header>
      <Main>
        <section className="flex flex-col gap-2">
          <p>This page willl permit to change some config.</p>
          <ul>
            <li>-Day or Night mode</li>
            <li>-Active profile</li>
            <li>-Profiles</li>
          </ul>
          <p>Profiles will permit to see and save data for multiple servers.</p>
          <ul>
            <li>-Url of original map configurable here</li>
            <li>-Url of shared incidents</li>
            <li>-Saved paths</li>
            <li>-Saved incidents</li>
          </ul>
        </section>
      </Main>
    </>
  );
}
