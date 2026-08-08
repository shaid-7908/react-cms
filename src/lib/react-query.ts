import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Data is considered "fresh" for 1 minute before refetching in the background
      staleTime: 1000 * 60,

      // Prevents automatic refetching every time the user clicks back to the browser tab
      refetchOnWindowFocus: false,

      // Number of times to retry a failed request before throwing an error
      retry: 1,
    },
  },
});
