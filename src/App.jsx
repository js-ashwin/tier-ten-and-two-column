import RankTen from "./pages/rankTen";
import Tabs from "./components/Tabs";
import TwoColumns from "./pages/TwoColumns";

function App() {
  return (
    <main>
      <Tabs components={[RankTen, TwoColumns]} />
    </main>
  );
}

export default App;
