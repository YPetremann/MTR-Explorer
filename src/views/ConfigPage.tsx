import React from "react";
import Header from "../components/Header";
import Main from "../components/Main";
import { useConfig } from "../contexts/config.ctx";
import useProfile from "../contexts/profile.ctx";
import { Icon } from "@iconify/react/dist/iconify.js";
import Button from "../components/Button";
import Label from "../components/Label";
import Select from "../components/Select";
import Input from "../components/Input";
import { useLock } from "../contexts/data.ctx";

export default function ConfigPage() {
  useLock();
  const [config, setConfig] = useConfig();
  const profileNames = Object.keys(config.profiles);
  const theme = config.theme;

  const profile = useProfile();
  const { systemMap } = profile.current ?? {};

  const setTheme = (theme) => setConfig((cfg) => ({ ...cfg, theme }));
  const setSystemMapDataUrl = (val) =>
    profile.update((pr) => {
      pr.systemMap ??= {};
      pr.systemMap.dataUrl = val;
      return pr;
    });

  return (
    <>
      <Header name="Config">
        <div className="flex flex-col	gap-4">
          <div className="flex items-center flex-wrap gap-4">
            <span className="w-[240px]">Theme</span>
            <div className="flex grow">
              <Button
                icon="mdi:moon-and-stars"
                text="Dark"
                active={theme == "dark"}
                onClick={() => setTheme("dark")}
              />
              <Button
                icon="mdi:auto-awesome"
                text="System"
                active={theme === undefined}
                onClick={() => setTheme(undefined)}
              />
              <Button
                icon="mdi:white-balance-sunny"
                text="Light"
                active={theme == "light"}
                onClick={() => setTheme("light")}
              />
            </div>
          </div>
          <label className="flex items-center flex-wrap gap-4">
            <span className="w-[240px]">Profile</span>
            <div className="flex grow">
              <Select
                className="grow"
                value={profile.name}
                onChange={(ev) => profile.change(ev.target.value)}
              >
                {profileNames.map((profile) => (
                  <option key={profile} value={profile}>
                    {profile}
                  </option>
                ))}
              </Select>
              <Button
                icon="mdi:pencil"
                onClick={() => profile.rename(config.currenProfile)}
              />
              <Button
                icon="mdi:close"
                onClick={() => profile.remove(config.currenProfile)}
              />
            </div>
            <div>
              <Button icon="mdi:add" onClick={profile.create} />
            </div>
          </label>{" "}
        </div>
      </Header>
      <Main>
        <section className="flex flex-col gap-4">
          <h2 className="text-2xl">System map</h2>
          <label className="flex items-center gap-4 flex-wrap">
            <span className="w-[240px]">Data URL</span>
            <div className="grow flex">
              <Input
                className="grow"
                value={systemMap?.dataUrl ?? ""}
                onChange={(ev) => setSystemMapDataUrl(ev.target.value)}
              />
            </div>
          </label>
        </section>
        {/*
        <section className="flex flex-col mt-4 gap-4">
          <h2 className="text-2xl">Incidents</h2>
          <label className="flex items-center gap-4 flex-wrap">
            <span className="w-[240px]">Shared Incidents URL</span>
            <div className="grow flex">
              <Input className="grow" value={profile.incidents?.sharedUrl} />
            </div>
          </label>
          <label className="flex items-center gap-4 flex-wrap">
            <span className="w-[240px]">Report URL</span>
            <div className="grow flex">
              <Input className="grow" value={profile.incidents?.reportUrl} />
            </div>
          </label>
        </section>
        */}
      </Main>
    </>
  );
}
