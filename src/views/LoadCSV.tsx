import React from 'react';
import { dialog, tauri } from '@tauri-apps/api'
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
      <Button color='blue' onClick={this.loadFile}>Import CSV</Button>
    )
  }
}

export default LoadCSV