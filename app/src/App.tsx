import Toolbar from './components/toolbar/Toolbar'
import Title from './components/title/Title'
import SearchForm from './components/search/Search'
import Dashboard from './components/dashboard/Dashboard'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { LocationProvider } from './context/location/Location.tsx'
import { UnitsProvider } from './context/unitsSystem/UnitsSystem.tsx'
import { FavoritesProvider } from './context/favoritesLocation/FavoritesContext.tsx'
import styles from './App.module.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      refetchOnWindowFocus: false,
      refetchInterval: 300000,
    }
  }
});

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <FavoritesProvider>
        <UnitsProvider>
          <LocationProvider>
            <main className={styles.layout}>
              <Toolbar />
              <div className="flex_container">
                <Title />
                <SearchForm />
              </div>
              <Dashboard />
            </main>
          </LocationProvider>
        </UnitsProvider>
      </FavoritesProvider>
    </QueryClientProvider>
  )
}

export default App
