import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { FavoritesProvider } from "../context/favoritesLocation/FavoritesContext.tsx";
import { LocationProvider } from "../context/location/Location.tsx";
import { ToastProvider } from "../context/toast/ToastContext.tsx";
import { UnitsProvider } from "../context/unitsSystem/UnitsSystem.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      refetchOnWindowFocus: false,
      refetchInterval: 300000,
    },
  },
});

export default function AllProvider({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <FavoritesProvider>
          <UnitsProvider>
            <LocationProvider>{children}</LocationProvider>
          </UnitsProvider>
        </FavoritesProvider>
      </ToastProvider>
    </QueryClientProvider>
  );
}
