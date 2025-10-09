import styles from "./App.module.css";
import Dashboard from "./components/dashboard/Dashboard";
import SearchForm from "./components/search/Search";
import Title from "./components/title/Title";
import Toolbar from "./components/toolbar/Toolbar";
import AllProvider from "./provider/AllProvider";

function App() {
  return (
    <AllProvider>
      <section className={styles.layout}>
        <Toolbar />
        <div className="flex_container">
          <Title />
          <SearchForm />
        </div>
        <Dashboard />
      </section>
    </AllProvider>
  );
}

export default App;
