import { Project } from "screens/project-list/list";
// import { useCallback, useEffect } from "react";
// import { cleanObject } from "utils/index";
import { useHttp } from "utils/http";
import { useMutation, useQuery, useQueryClient } from "react-query";

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();
  // const { run, ...result } = useAsync<Project[]>();

  // const fetchProjects = useCallback( () => client("projects", { data: cleanObject(param || {}) }), [client, param])
  // // 非状态的, 非基本类型的，不可以放在依赖里面，否则会造成无限循环
  // useEffect(() => {
  //   run(fetchProjects(), {retry: fetchProjects })
  // }, [fetchProjects, param, run]);

  // return result;

  return useQuery<Project[]>(['projects', param], ()=>client('projects', {data: param}))



};




export const useEditProject = () =>{
  // const { run, ...asyncResult } = useAsync();
  const client = useHttp()
  const queryClient = useQueryClient()
  // const mutate = (params: Partial<Project>) =>{
  //   return run(client(`projects/${params.id}`, {
  //     method: 'PATCH',
  //     data: params
  //   }))
  // }

  // return {mutate, ...asyncResult}

  return useMutation((params: Partial<Project>) =>
     client(`projects/${params.id}`,{
      method: 'PATCH',
      data: params
    }), {
      // 监听保持页面刷新
      onSuccess: ()=>queryClient.invalidateQueries("projects")
    });
}

export const useAddProject = () =>{
  // const { run, ...asyncResult } = useAsync();
  const client = useHttp()
  const queryClient = useQueryClient()
  // const mutate = (params: Partial<Project>) =>{
  //   return run(client(`projects/${params.id}`, {
  //     method: 'POST',
  //     data: params
  //   }))
  // }

  // return {mutate, ...asyncResult}


  return useMutation((params: Partial<Project>) =>
     client(`projects`,{
      method: 'POST',
      data: params
    }), {
      // 监听保持页面刷新
      onSuccess: ()=>queryClient.invalidateQueries("projects")
    });
}


export const useProject = (id?:number)=> {
  const client = useHttp()

  return useQuery<Project>(
    ['project', {id}],
    ()=> client(`projects/${id}`),
    {
      // 配置项， 当id有值时候去出触发详情
      enabled: !!id
    }
  )
} 

