export function deepFreeze(object, _refs = new WeakSet()) {
  if (_refs.has(object)) return object;
  _refs.add(object);
  // Retrieve the property names defined on object
  const propNames = Reflect.ownKeys(object);

  // Freeze properties before freezing self
  for (const name of propNames) {
    const value = object[name];

    if ((value && typeof value === "object") || typeof value === "function") {
      deepFreeze(value, _refs);
    }
  }
  return Object.freeze(object);
}
