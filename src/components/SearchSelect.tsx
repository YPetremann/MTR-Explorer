import { useState } from "react";
import "./SearchSelect.scss";
const noStation = { value: "", label: "(no station found)" };
const moreOptions = { value: "...", label: "..." };

export default function SearchSelect({ options, value, onChange, className }) {
  const [search, setSearch] = useState();
  const [searchFocus, setSearchFocus] = useState(false);
  const [selectFocus, setSelectFocus] = useState(false);
  const [more, setMore] = useState(false);
  const ls = search?.toLowerCase();
  const proposed = options.filter(({ pattern }) => pattern.includes(ls));
  if (proposed.length === 0) proposed.push(noStation);

  if (!more) {
    if (proposed.length > 10) proposed[9] = moreOptions;
    proposed.splice(10, proposed.length);
  }
  return (
    <div className={"SearchSelect " + className}>
      <input
        type="search"
        className="SearchSelect__input"
        value={search ?? value?.label ?? ""}
        onChange={(ev) => {
          const value = ev.target.value;
          if (value) setSelectFocus(true);
          setSearch(ev.target.value);
        }}
        onFocus={() => setSearchFocus(true)}
        onBlur={() => setSearchFocus(false)}
      />
      {selectFocus && (
        <>
          <select className="SearchSelect__select">
            {proposed.map((option) => (
              <option
                key={option.value}
                onClick={() => {
                  const value = option.value;
                  if (value === "...") return setMore(true);
                  onChange(proposed.find((opt) => opt.value === value));
                  setMore(false);
                  setSelectFocus(false);
                  setSearch();
                }}
              >
                {option.label}
              </option>
            ))}
          </select>
          <div className="SearchSelect__select">
            {proposed.map((option) => (
              <div
                key={option.value}
                onClick={() => {
                  const value = option.value;
                  if (value === "...") return setMore(true);
                  onChange(proposed.find((opt) => opt.value === value));
                  setMore(false);
                  setSelectFocus(false);
                  setSearch();
                }}
              >
                {option.label}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
