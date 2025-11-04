import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";
import { FavoritesProvider } from "@/context/favoritesLocation/FavoritesContext.tsx";
import { LocationProvider } from "@/context/location/Location.tsx";
import { ToastProvider } from "@/context/toast/ToastContext.tsx";
import { UnitsProvider } from "@/context/unitsSystem/UnitsSystem.tsx";

// setting seperate query client for testing.
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

export function renderWithClient(ui: React.ReactElement) {
  const testQueryClient = createTestQueryClient();
  //All provider is not used here because default option setup is different for testing environment.
  const { rerender, ...result } = render(
    <QueryClientProvider client={testQueryClient}>
      <FavoritesProvider>
        <ToastProvider>
          <UnitsProvider>
            <LocationProvider>{ui}</LocationProvider>
          </UnitsProvider>
        </ToastProvider>
      </FavoritesProvider>
    </QueryClientProvider>,
  );

  return {
    ...result,
    rerender: (rerenderUi: React.ReactElement) =>
      rerender(
        <QueryClientProvider client={testQueryClient}>
          {rerenderUi}
        </QueryClientProvider>,
      ),
  };
}

export function createWrapper() {
  const testQueryClient = createTestQueryClient();
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={testQueryClient}>
      {children}
    </QueryClientProvider>
  );
}
