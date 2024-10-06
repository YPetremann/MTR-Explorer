import { useState } from "react";
const noStation = { value: "", label: "(no station found)" };
const moreOptions = { value: "...", label: "..." };

export function SearchSelect({ options, value, onChange, className }) {
  const [search, setSearch] = useState();
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
    <div className={`-mr-[1px] relative flex last:mr-0${className}`}>
      <input
        className="w-20 min-w-0 grow border border-neutral-400 border-solid bg-main px-3 text-main"
        onChange={ev => {
          const value = ev.target.value;
          if (value) setSelectFocus(true);
          setSearch(ev.target.value);
        }}
        type="text"
        value={search ?? value?.label ?? ""}
      />
      {selectFocus && (
        <div className="-mt-[1px] SearchSelect__select absolute top-full right-0 left-0 z-10 m-0 box-content max-h-[20rem] overflow-y-auto border border-neutral-400 border-solid bg-main text-main">
          {proposed.map(option => (
            <div
              className="cursor-pointer p-2 leading-4"
              key={option.value}
              onClick={() => {
                const value = option.value;
                if (value === "...") return setMore(true);
                onChange(proposed.find(opt => opt.value === value));
                setMore(false);
                setSelectFocus(false);
                setSearch();
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
