import { useConfig } from "./config.ctx";

export default function useProfile(): Data {
  const [config, setConfig] = useConfig();

  // update the profile
  const update = (val) => {
    // transform the value to a function
    const fn = typeof val === "function" ? val : () => val;

    setConfig((config) => {
      const { currentProfile, profiles } = config;
      const profile = profiles[currentProfile];
      profiles[currentProfile] = fn(profile);
      return { ...config };
    });
  };

  const change = (value) =>
    setConfig((cfg) => ({ ...cfg, currentProfile: value }));

  const create = () => {
    const currentProfile = prompt("Enter the new name for this profile");
    if (!currentProfile) return;
    setConfig((cfg) => {
      const profiles = { ...cfg.profiles, [currentProfile]: {} };
      return { ...cfg, currentProfile, profiles };
    });
  };

  function remove() {
    const shouldDelete = confirm(
      "Are you sure you want to delete this profile?"
    );
    if (!shouldDelete) return;
    setConfig((cfg) => {
      const name = cfg.currentProfile;
      const index = Object.keys(cfg.profiles).indexOf(name);
      const profiles = cfg.profiles;
      console.log(profiles);
      delete profiles[name];
      console.log(profiles);
      const currentProfile = Object.keys(profiles).at(index);
      console.log("should have deleted");
      return { ...cfg, currentProfile, profiles };
    });
  }

  function rename() {
    const currentProfile = prompt("Enter the new name for this profile");
    if (!currentProfile) return;
    setConfig((cfg) => {
      const old = cfg.currentProfile;
      const { [old]: profile, ...oldProfiles } = cfg.profiles;
      const profiles = { [currentProfile]: profile, ...oldProfiles };
      return { ...cfg, currentProfile, profiles };
    });
  }

  // get the current profile
  const { currentProfile: name, profiles } = config;
  const current = profiles[name];

  return { name, current, change, create, rename, remove, update };
}
