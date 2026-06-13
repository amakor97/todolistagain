import type { Store } from "../types/Store";
import { fetchFromLS, loadToTS } from "./localStorage";

function delay(ms: number): Promise<void> {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve();
    }, ms)
  );
}

export async function fetchData(): Promise<Store | null> {
  await delay(500);
  return fetchFromLS();
}

export async function loadData(data: Store): Promise<void> {
  await delay(1000);
  loadToTS(data);
}
