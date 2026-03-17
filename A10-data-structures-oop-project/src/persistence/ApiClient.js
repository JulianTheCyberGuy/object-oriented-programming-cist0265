export default class ApiClient {
    constructor() {
      this.internetUrl =
        "https://api.worldbank.org/v2/country/all/indicator/IT.NET.USER.ZS?format=json&per_page=400";
  
      this.gdpUrl =
        "https://api.worldbank.org/v2/country/all/indicator/NY.GDP.PCAP.CD?format=json&per_page=400";
    }
  
    async fetchAllPages(baseUrl) {
      const firstResponse = await fetch(baseUrl);
  
      if (!firstResponse.ok) {
        throw new Error(`Failed to fetch data: ${firstResponse.status} ${firstResponse.statusText}`);
      }
  
      const firstJson = await firstResponse.json();
  
      if (!Array.isArray(firstJson) || firstJson.length < 2) {
        throw new Error("Unexpected World Bank API response format.");
      }
  
      const metadata = firstJson[0];
      const firstPageRows = Array.isArray(firstJson[1]) ? firstJson[1] : [];
      const totalPages = Number(metadata.pages) || 1;
  
      let allRows = [...firstPageRows];
  
      for (let page = 2; page <= totalPages; page += 1) {
        const separator = baseUrl.includes("?") ? "&" : "?";
        const pagedUrl = `${baseUrl}${separator}page=${page}`;
  
        const response = await fetch(pagedUrl);
  
        if (!response.ok) {
          throw new Error(`Failed to fetch page ${page}: ${response.status} ${response.statusText}`);
        }
  
        const json = await response.json();
  
        if (!Array.isArray(json) || json.length < 2 || !Array.isArray(json[1])) {
          continue;
        }
  
        allRows = allRows.concat(json[1]);
      }
  
      return allRows;
    }
  
    async fetchInternetData() {
      return this.fetchAllPages(this.internetUrl);
    }
  
    async fetchGdpData() {
      return this.fetchAllPages(this.gdpUrl);
    }
  }