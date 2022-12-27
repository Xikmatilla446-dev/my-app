import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { request } from "services/api";

const useApiMutation = <Variables = any, Response = any, Error = any>(
  url: string,
  method: "post" | "get" | "put" | "patch" | "delete",
  options: UseMutationOptions<AxiosResponse<Response>, Error, Variables> = {}
) =>
    useMutation<AxiosResponse<Response>, Error, Variables>(
      (variables) => {
        const response = request({ method, url, data: variables });
        return response;
      },
      { ...options }
    );

export default useApiMutation;
