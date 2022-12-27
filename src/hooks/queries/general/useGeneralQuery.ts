import { AxiosResponse } from "axios";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { request } from "services/api";

const useGeneralQuery = <Data = any>(
  url: string,
  params: object = {},
  options: UseQueryOptions = {}
) =>
    useQuery({
      queryKey: [url, params],
      queryFn: () =>
        request
          .get<Data>(url, { params })
          .then((response: AxiosResponse) => response),
      ...options,
    });

export default useGeneralQuery;
