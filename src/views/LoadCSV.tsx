import React from 'react';
import { dialog, fs, tauri } from '@tauri-apps/api'

interface FileLoadedFunction {
  (fileContents: string): void
}

interface LoadCSVProps {
  fileLoaded: FileLoadedFunction
}

class LoadCSV extends React.Component<LoadCSVProps> {
  constructor(props: LoadCSVProps) {
    super(props);
    this.state = { csv: null };
  };

  loadFile = async () => {
    const path = await dialog.open(
      {
        filters: [
          {
            name: 'CSVs',
            extensions: ['csv']
          }
        ],
        multiple: false
      }
    ) as string
    const csv = await tauri.invoke('read_file', { path: path });
    if (typeof csv === 'string') {
      this.props.fileLoaded(csv);
    }
  }

  render() {
    return (
      <button onClick={this.loadFile}>Start</button>
    )
  }
}

export default LoadCSV