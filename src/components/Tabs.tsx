import React from "react"
import "./Tabs.scss"
export const TabContext = React.createContext(0)

export function Tab({ name, children }) {
  const tab = React.useContext(TabContext)
  return tab === name && <div className="Tabs__content">{children}</div>
}

export function Tabs({ children }) {
  const [tab, setTab] = React.useState<any>(null)
  return <div className="Tabs">
    <pre>{JSON.stringify(children)}</pre>
    <div className="Tabs__bar">

      {/*Object.entries(tabs).map(([key, name]) =>
      <button key={key} className={"Tabs__tab" + (key === value ? " Tabs__tab--active" : "")} onClick={() => onChange(key)}>{name}</button>
      )*/}
    </div>
    {children}
  </div>
}
