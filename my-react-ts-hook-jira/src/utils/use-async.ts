import { useCallback, useReducer, useState } from "react";
import { useMountedRef } from "utils";

interface State<D> {
  error: Error | null;
  data: D | null;
  status: "idle" | "loading" | "error" | "success";
}

const defaultInitialState: State<null> = {
  status: "idle",
  data: null,
  error: null,
};

const defaultConfig = {
  throwOnError: false,
}; 

const useSafeDispatch=<T>(dispatch: (...args: T[]) =>void) => {
  const mountedRef = useMountedRef()
  return useCallback((...args: T[]) => (mountedRef.current ? dispatch(...args) : void 0),[dispatch, mountedRef]);
}

export const useAsync = <D>(
  initialState?: State<D>,
  initialConfig?: typeof defaultConfig
) => {
  const config = { ...defaultConfig, ...initialConfig };
  const [state, dispatch] = useReducer((state: State<D>, action:Partial<State<D>>) =>({ ...state, ...action}),{
    ...defaultInitialState,
    ...initialState,
  });

  const safeDispatch = useSafeDispatch(dispatch);
  const [retry, setRetry] = useState(() => () => {});
  const setData = useCallback(
    (data: D) =>
    safeDispatch({
        data,
        status: "success",
        error: null,
      }),
    [safeDispatch]
  );

  const setError = useCallback(
    (error: Error) =>
    safeDispatch({
        error,
        status: "error",
        data: null,
      }),
    [safeDispatch]
  );

  // 用来触发异步请求
  const run = useCallback(
    (promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
      if (!promise || !promise.then) {
        throw new Error("请传入Promsie 类型数据");
      }

      setRetry(() => () => {
        if (runConfig?.retry) {
          run(runConfig?.retry(), runConfig);
        }
      });

      safeDispatch({status: "loading" });

      return promise
        .then((data) => {
         setData(data);
          return data;
        })
        .catch((error) => {
          // catch 会消化异常，不会主动抛出异常
          setError(error);
          // return error;
          // 主动抛出异常
          if (config.throwOnError) {
            return Promise.reject(error);
          }
        });
    },
    [config.throwOnError, safeDispatch, setData, setError]
  );

  return {
    isIdle: state.status === "idle",
    isLoading: state.status === "loading",
    isError: state.status === "error",
    isSuccess: state.status === "success",
    run,
    setData,
    setError,
    // 重新调用run() 刷新state
    retry,
    ...state,
  };
};
