import { Toolbar } from './components/toolbar/Toolbar'
import Title from './components/titleWithSearch/Title'
import SearchForm from './components/titleWithSearch/Search'
import { Dashboard } from './components/dashboard/Dashboard'
import styles from './App.module.css'

function App() {

  return (
    <main className={styles.layout}>
      <Toolbar />
      <div className="flex_container">
        <Title />
        <SearchForm />
      </div>
      <Dashboard />
    </main>
  )
}

export default App
