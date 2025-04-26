import { BrowserRouter, Route, Routes } from "react-router";
import Pomodoro from "./pages/Pomodoro";
import Login from "./pages/Login";
import SignIn from "./pages/SignIn";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoginProvider from "./context/LoginProvider";
import Confirmation from "./pages/confirmation";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LoginProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Pomodoro />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/confirmation" element={<Confirmation />} />
          </Routes>
        </BrowserRouter>
        <ReactQueryDevtools />
      </LoginProvider>
    </QueryClientProvider>
  );
}

export default App;
