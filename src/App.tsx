import tauriCircles from './tauri.svg'
import './App.css'
import LoadCSV from './LoadCSV'
import React from 'react'

class App extends React.Component<{}, {contents?: string}> {
  constructor(props: {}) {
    super(props);
    this.state = { contents: undefined };
  };

  fileLoaded = (contents: string) => {
    this.setState(previous => ({ contents }));
  }

  render = () => {
    if (!this.state.contents) {
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
          {this.state.contents}
        </div>
      )
    }
  }

}

export default App