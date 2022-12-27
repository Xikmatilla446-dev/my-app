import { Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Layout, LazyLoad } from "./components";
import RoutesList from "./pages/Routes";
import { ConfigProvider } from "antd";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {


  return (
    <div className={"App"}>
      <QueryClientProvider client={queryClient}>
        <ConfigProvider
          theme={{
            components: {
              Table: {},
            },
            token: {
              colorPrimary: "#325ECD",
            },
          }}
        >
          <Layout>
            <Suspense fallback={<LazyLoad />}>
              <RoutesList />
            </Suspense>
          </Layout>
        </ConfigProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
