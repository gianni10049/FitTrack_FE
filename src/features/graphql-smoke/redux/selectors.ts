import type { RootState } from "@/lib/redux/root-reducer";

export const selectDemoState = (state: RootState) => state.demo;

export const selectHelloValue = (state: RootState) => state.demo.hello.value;

export const selectHelloStatus = (state: RootState) => state.demo.hello.status;

export const selectHelloError = (state: RootState) => state.demo.hello.error;

export const selectBumpStatus = (state: RootState) => state.demo.bump.status;

export const selectBumpError = (state: RootState) => state.demo.bump.error;

export const selectSubscriptionCounter = (state: RootState) =>
  state.demo.subscriptionCounter;
