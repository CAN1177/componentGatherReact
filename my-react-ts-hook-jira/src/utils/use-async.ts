import { useState } from "react";
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
  throwOnError: false
}


export const useAsync = <D>(initialState?: State<D>, initialConfig?: typeof defaultConfig) => {
  const config = {...defaultConfig, ...initialConfig};
  const [state, setState] = useState<State<D>>({
    ...defaultInitialState,
    ...initialState,
  });


  const mountedRef = useMountedRef()
  const [retry, setRetry] = useState(()=>()=>{})
  const setData = (data: D) =>
    setState({
      data,
      status: "success",
      error: null,
    });

  const setError = (error: Error) =>
    setState({
      error,
      status: "error",
      data: null,
    });

  // 用来触发异步请求
  const run = (promise: Promise<D>, runConfig?:{retry:()=>Promise<D>}) => {
    if (!promise || !promise.then) {
      throw new Error("请传入Promsie 类型数据");
    }

    setRetry(() =>()=>{
      if (runConfig?.retry) {
        run(runConfig?.retry(), runConfig)
      }
    });

    setState({ ...state, status: "loading" });

    return promise
      .then((data) => {
        if(mountedRef.current)
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
  };



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
