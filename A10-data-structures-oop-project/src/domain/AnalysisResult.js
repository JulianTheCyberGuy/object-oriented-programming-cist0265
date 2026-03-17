export default class AnalysisResult {
    constructor({
      thesis,
      datasetName,
      datasetEndpoint,
      methods,
      totalRecords,
      groupedResults,
      topCountries,
      conclusion,
      mostRecentYear,
      correlation
    }) {
      this.thesis = thesis;
      this.datasetName = datasetName;
      this.datasetEndpoint = datasetEndpoint;
      this.methods = methods;
      this.totalRecords = totalRecords;
      this.groupedResults = groupedResults;
      this.topCountries = topCountries;
      this.conclusion = conclusion;
      this.mostRecentYear = mostRecentYear;
      this.correlation = correlation;
    }
  }