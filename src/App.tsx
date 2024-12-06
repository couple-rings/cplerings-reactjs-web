import Router from "./components/router/Router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { fetchConfigs } from "./redux/slice/config.slice";
import { useAppDispatch } from "./utils/hooks";

const queryClient = new QueryClient({
  defaultOptions: { mutations: { retry: 3 } },
});

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchConfigs());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <ToastContainer closeOnClick />
    </QueryClientProvider>
  );
}

export default App;
