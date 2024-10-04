import { useState } from "react";
const noStation = { value: "", label: "(no station found)" };
const moreOptions = { value: "...", label: "..." };

export default function SearchSelect({ options, value, onChange, className }) {
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
    <div className={"relative flex -mr-[1px] last:mr-0" + className}>
      <input
        type="text"
        className="border border-neutral-400 bg-main text-main border-solid px-3 min-w-0 w-20 grow"
        value={search ?? value?.label ?? ""}
        onChange={(ev) => {
          const value = ev.target.value;
          if (value) setSelectFocus(true);
          setSearch(ev.target.value);
        }}
      />
      {selectFocus && (
        <div className="absolute box-content border-neutral-400 bg-main text-main overflow-y-auto max-h-[20rem] z-10 top-full left-0 right-0 m-0 -mt-[1px] border border-solid SearchSelect__select">
          {proposed.map((option) => (
            <div
              className="leading-4 p-2 cursor-pointer"
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
      )}
    </div>
  );
}
