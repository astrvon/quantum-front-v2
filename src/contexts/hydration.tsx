"use client";

import * as React from "react";

import store from "@/contexts/store";

const Hydration = () => {
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      store.bearStore.persist.rehydrate();
      store.authStore.persist.rehydrate();
    }
  }, []);

  return <></>;
};

export default Hydration;
