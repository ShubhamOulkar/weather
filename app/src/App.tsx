import Toolbar from './components/toolbar/Toolbar'
import Title from './components/title/Title'
import SearchForm from './components/search/Search'
import Dashboard from './components/dashboard/Dashboard'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { LocationProvider } from './context/location/Location.tsx'
import styles from './App.module.css'

const queryClient = new QueryClient();
function App() {

  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  )
}

export default App
