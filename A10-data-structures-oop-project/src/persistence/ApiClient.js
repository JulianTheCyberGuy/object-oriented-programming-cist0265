export default class ApiClient {
    constructor() {
      this.internetUrl =
        "https://api.worldbank.org/v2/country/all/indicator/IT.NET.USER.ZS?format=json&per_page=400";
  
      this.gdpUrl =
        "https://api.worldbank.org/v2/country/all/indicator/NY.GDP.PCAP.CD?format=json&per_page=400";
    }
  
    async fetchInternetData() {
      // Phase 3: implement real fetch
      return [];
    }
  
    async fetchGdpData() {
      // Phase 3: implement real fetch
      return [];
    }
  }