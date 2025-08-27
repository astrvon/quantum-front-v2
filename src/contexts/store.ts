import { useAuthStore } from "./store/authStore";
import { useBearStore } from "./store/bearStore";
import { useBreadcrumbStore } from "./store/breadcrumbStore";
import { useSegmentedHomeStore } from "./store/segmentedHomeStore";

const Store = {
  bearStore: useBearStore,
  authStore: useAuthStore,
  segmentedHomeStore: useSegmentedHomeStore,
  breadcrumbStore: useBreadcrumbStore,
};

export default Store;
