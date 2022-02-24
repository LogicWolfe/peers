import 'buffer'
import Papa from 'papaparse';
import { tauri } from '@tauri-apps/api';
import Submission from './Submission';

class CSVParser {
  submissions: Submission[] = [];

  constructor(contents: string) {
    this.contents = contents;
    this.data = Papa.parse(contents, {header: false}).data as string[][];
     
    for (let i=1; i<this.data.length; i++) {
      this.submissions.push(new Submission(this.data[i]));
    }    
  }
  contents
  data

  getSubmissions = async() => {
    return await this.submissions;
  }
}

export default CSVParser