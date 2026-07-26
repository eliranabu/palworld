import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/** Hydration-safe "are we on the client, past first paint" check without an effect + setState. */
export function useHasMounted(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
