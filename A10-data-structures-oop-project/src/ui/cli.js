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
    console.log(result.datasetEndpoint);
  
    console.log("\nMethods:");
    console.log(result.methods);
  
    console.log("\nResults:");
    console.log(`Total valid records: ${result.totalRecords}`);
    console.log(`Low internet access average GDP: ${result.groupedResults.low.toFixed(2)}`);
    console.log(`Medium internet access average GDP: ${result.groupedResults.medium.toFixed(2)}`);
    console.log(`High internet access average GDP: ${result.groupedResults.high.toFixed(2)}`);
  
    console.log("\nConclusion:");
    console.log(result.conclusion);
  }