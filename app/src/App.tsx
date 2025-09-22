import Toolbar from './components/toolbar/Toolbar'
import Title from './components/title/Title'
import SearchForm from './components/search/Search'
import Dashboard from './components/dashboard/Dashboard'
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
