"use client";

import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import {
  bumpCounter,
  demoSlice,
  fetchHello,
  selectBumpError,
  selectBumpStatus,
  selectHelloError,
  selectHelloStatus,
  selectHelloValue,
  selectSubscriptionCounter,
} from "@/features/graphql-smoke/redux";

export function useDemoGraphql() {
  const dispatch = useAppDispatch();
  const hello = useAppSelector(selectHelloValue);
  const helloStatus = useAppSelector(selectHelloStatus);
  const helloError = useAppSelector(selectHelloError);
  const bumpStatus = useAppSelector(selectBumpStatus);
  const bumpError = useAppSelector(selectBumpError);
  const subscriptionCounter = useAppSelector(selectSubscriptionCounter);

  useEffect(() => {
    void dispatch(fetchHello());
  }, [dispatch]);

  const refetchHello = useCallback(() => {
    void dispatch(fetchHello());
  }, [dispatch]);

  const requestBump = useCallback(() => {
    void dispatch(bumpCounter());
  }, [dispatch]);

  const setSubscriptionCounter = useCallback(
    (value: number) => {
      dispatch(demoSlice.actions.subscriptionCounterReceived(value));
    },
    [dispatch],
  );

  return {
    hello,
    helloStatus,
    helloError,
    bumpStatus,
    bumpError,
    subscriptionCounter,
    refetchHello,
    requestBump,
    setSubscriptionCounter,
  };
}
