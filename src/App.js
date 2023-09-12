import './App.css';
import Weather from './components/Weather';
document.body.classList.add('bg-color');

function App() {
  return (
    <div className="App">
      <div className="inside">
        <Weather/>
      </div>
    </div>
  );
}

export default App;
