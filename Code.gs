let sheet = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1JQ-x-b5w8mIX58C_TgY5CEtRLZeX-iwK1LGK2aNsETs/edit?gid=0#gid=0');
let sheetName = sheet.getSheetByName('Sheet1');

function doPost(e) {
  try {
    let data = e.parameter;
    sheetName.appendRow([data.date, data.studyhours, data.productivity, data.description]);
    return ContentService.createTextOutput("Success").setMimeType(ContentService.MimeType.TEXT);
  } catch(error) {
    return ContentService.createTextOutput("Error: " + error.toString()).setMimeType(ContentService.MimeType.TEXT);
  }
}

function doGet(e) {
  try {
    let data = sheetName.getDataRange().getValues();
    
    // Remove the header row
    data.shift();
    
    return ContentService.createTextOutput(JSON.stringify(data))
      .setMimeType(ContentService.MimeType.JSON);
  } catch(error) {
    return ContentService.createTextOutput(JSON.stringify({error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ... rest of your existing code ... 