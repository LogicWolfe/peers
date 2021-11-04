import tauriCircles from '../assets/tauri.svg'
import './App.css'
import LoadCSV from './LoadCSV'
import React from 'react'
import CSVParser from '../data/CSVParser';
import PeerReviews from './PeerReviews';

class App extends React.Component<{}, { data?: {}}> {
  constructor(props: {}) {
    super(props);
    this.state = { data: undefined };
  };

  fileLoaded = async (contents: string) => {
    const parser = new CSVParser(contents)
    const data = await parser.getData();
    this.setState(previous => ({ data }));
  }

  render = () => {
    if (!this.state.data) {
      return (
        <div className="App">
          <header className="App-header">
            <div className="inline-logo">
              <img src={tauriCircles} className="App-logo rotate" alt="logo" />
              <h1>Peers</h1>
            </div>
            <p>
              Quick and easy peer review aggregation.
            </p>
            <LoadCSV fileLoaded={this.fileLoaded} />
          </header>
        </div>
      )
    } else {
      return (
        <div className="App">
          <PeerReviews data={this.state.data}/>
        </div>
      )
    }
  }

}

export default App