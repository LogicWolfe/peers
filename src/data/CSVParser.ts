import 'buffer'
import Papa from 'papaparse';

class CSVParser {
  constructor(contents: string) {
    this.contents = contents;
    this.data = Papa.parse(contents, {header: true}).data;
  }
  contents
  data

  getData = async() => {
    return await this.data
  }
}

export default CSVParser