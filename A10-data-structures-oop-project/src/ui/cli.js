export function printHeader(title) {
    console.log("\n==================================================");
    console.log(title);
    console.log("==================================================");
  }
  
  export function printResult(result) {
    printHeader("Data-Driven OOP + Data Structures Mini-Project");
  
    console.log("\nThesis:");
    console.log(result.thesis);
  
    console.log("\nDataset:");
    console.log(result.datasetName);
  
    console.log("\nYear Used:");
    console.log(result.mostRecentYear);
  
    console.log("\nMethods:");
    console.log(result.methods);
  
    console.log("\nResults:");
    console.log(`Total valid records: ${result.totalRecords}`);
  
    console.log("\nAverage GDP per Group:");
    console.log(`Low (<50%):    $${result.groupedResults.low.toFixed(2)}`);
    console.log(`Medium (50-80%): $${result.groupedResults.medium.toFixed(2)}`);
    console.log(`High (>80%):   $${result.groupedResults.high.toFixed(2)}`);
  
    console.log("\nTop 10 Countries by GDP:");
    result.topCountries.forEach((c, i) => {
      console.log(
        `${i + 1}. ${c.countryName} - $${c.gdpPerCapita.toFixed(2)}`
      );
    });
  
    console.log("\nConclusion:");
    console.log(result.conclusion);
  }