import Record from "../domain/Record.js";

export default class Cleaner {
  toNumber(value) {
    if (value === null || value === undefined || value === "") {
      return null;
    }

    const parsed = Number(value);
    return Number.isNaN(parsed) ? null : parsed;
  }

  mergeDatasets(internetRows, gdpRows) {
    // Phase 3: merge by country + year using a Map
    // For now, return an empty list so the project runs cleanly
    return [];
  }

  buildRecord(data) {
    return new Record(data);
  }
}