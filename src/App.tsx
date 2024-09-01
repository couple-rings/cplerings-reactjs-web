import Router from "./components/router/Router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: { mutations: { retry: 3 } },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <ToastContainer closeOnClick />
    </QueryClientProvider>
  );
}

export default App;
