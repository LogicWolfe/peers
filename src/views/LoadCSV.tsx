import React from 'react';
import { open } from '@tauri-apps/plugin-dialog';
import { invoke } from '@tauri-apps/api/core';
import { Button } from 'semantic-ui-react';


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
    const path = await open(
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
    const csv = await invoke('read_file', { path: path });
    if (typeof csv === 'string') {
      this.props.fileLoaded(csv);
    }
  }

  render() {
    return (
      <Button color='blue' onClick={this.loadFile}>Import CSV</Button>
    )
  }
}

export default LoadCSV
