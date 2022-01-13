import { useAsync } from "utils/use-async";
import { Project } from "screens/project-list/list";
import { useCallback, useEffect } from "react";
import { cleanObject } from "utils/index";
import { useHttp } from "utils/http";

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<Project[]>();

  const fetchProjects = useCallback( () => client("projects", { data: cleanObject(param || {}) }), [client, param])
  // 非状态的, 非基本类型的，不可以放在依赖里面，否则会造成无限循环
  useEffect(() => {
    run(fetchProjects(), {retry: fetchProjects })
  }, [fetchProjects, param, run]);

  return result;
};


export const useEditProject = () =>{
  const { run, ...asyncResult } = useAsync();
  const client = useHttp()
  const mutate = (params: Partial<Project>) =>{
    return run(client(`projects/${params.id}`, {
      data: params,
      method: 'PATCH'
    }))
  }

  return {mutate, ...asyncResult}
}


export const useAddProject = () =>{
  const { run, ...asyncResult } = useAsync();
  const client = useHttp()
  const mutate = (params: Partial<Project>) =>{
    return run(client(`projects/${params.id}`, {
      data: params,
      method: 'POST'
    }))
  }

  return {mutate, ...asyncResult}
}

