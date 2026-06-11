import type { AppStore } from "./store";

let registered: AppStore | undefined;

export function registerAppStore(store: AppStore | undefined) {
  registered = store;
}

export function getAppStore(): AppStore | undefined {
  return registered;
}
