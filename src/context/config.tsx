import React from 'react'
export const ConfigContext = React.createContext({ lang: 2 })

export function useConfig(key: string, def: any) {
  const ctx = React.useContext(ConfigContext)
  const [config, setConfig] = ctx

  const setConfigKey = (value) => setConfig(ctx => ({ ...ctx, [key]: value }))

  React.useEffect(() => {
    if (key && (def !== undefined))
      setConfigKey(def)
  }, [def])

  if (!key) return ctx

  return [config[key] ?? def, setConfigKey]
}

export function ConfigProvider({ children }) {
  const [config, setConfig] = React.useState({})
  return <ConfigContext.Provider value={[config, setConfig]}>
    {children}
  </ConfigContext.Provider>
}