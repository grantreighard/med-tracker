import './App.css';
import TrackerList from './components/trackerList';

function App() {
  return (
    <div className="App">
      <h1>Simple Medication Tracker 💊</h1>
      <div className="app-section">
        <h2>About</h2>
        <p className="explainer">This is a free, simple medication tracker. I created it when my mom was looking for one in the App Store, 
          but none of them worked. Feel free to DM me on Twitter <a href="https://www.twitter.com/GrantReighard" target="_blank">@GrantReighard</a> 
          &nbsp;with any feedback or issues you have.
        </p>
      </div>
      <TrackerList />
    </div>
  );
}

export default App;
