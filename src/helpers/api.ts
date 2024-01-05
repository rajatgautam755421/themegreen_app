import { useQueries, useQuery, QueryFunctionContext } from "react-query";

const fetchEndpointData = async (endpoint: string, args: RequestInit) => {
  const response = await fetch(endpoint, args);
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
};

export const useApiData = <T>(
  key: string,
  endpoint: string,
  ...args: RequestInit[]
) => {
  return useQuery<T>(key, () => fetchEndpointData(endpoint, args[0]), {
    retry: 0,
    refetchOnWindowFocus: false,
  });
};

type KeyAndEndpoint = {
  key: string;
  dependency: any;
  endpoint: string;
  args?: RequestInit;
};

export const useMultipleApiData = (keysAndEndpoints: KeyAndEndpoint[]) => {
  const queries = keysAndEndpoints.map(
    ({ key, dependency, endpoint, args }) => ({
      queryKey: [key, { dependency }],
      queryFn: () => fetchEndpointData(endpoint, args || {}),
    })
  );

  return useQueries(queries);
};
