import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./style.css";
import { router } from "./routes/router";
import { Toaster } from "react-hot-toast";
import { AuthContextProvider } from "./context/AuthContext";
import { HelmetProvider } from "react-helmet-async";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <HelmetProvider>
          <RouterProvider router={router} />
          <Toaster
            position="bottom-center"
            toastOptions={{
              style: {
                zIndex: "9999999999999999",
              },
            }}
          />
        </HelmetProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  </StrictMode>
);
