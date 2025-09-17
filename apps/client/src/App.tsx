import MainPage from "./pages/MainPage/MainPage"
import ToggleTheme from "./components/ToggleTheme.tsx/ToggleTheme"

function App() {

  return (
    <ToggleTheme>

      <div>
        This is Karin's website.
        <MainPage />
      </div>
    </ToggleTheme>
  )
}

export default App
