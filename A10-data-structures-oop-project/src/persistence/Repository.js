export default class Repository {
    constructor() {
      this.records = [];
    }
  
    saveRecords(records) {
      this.records = records;
    }
  
    getAllRecords() {
      return this.records;
    }
  
    clear() {
      this.records = [];
    }
  }