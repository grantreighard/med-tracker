import './App.css';
import TrackerList from './components/trackerList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Pill Popper 💊</h1>
        <p>This is a simple medication tracker. I created it when my mom was looking for one in the App Store, 
          but none of them worked. Feel free to DM me on Twitter <a href="https://www.twitter.com/GrantReighard" target="_blank">@GrantReighard</a> 
          &nbsp;with any feedback or issues you have.</p>
      </header>
      <TrackerList />
    </div>
  );
}

export default App;
