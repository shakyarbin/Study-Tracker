let sheet = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1JQ-x-b5w8mIX58C_TgY5CEtRLZeX-iwK1LGK2aNsETs/edit?gid=0#gid=0');
let studySheet = sheet.getSheetByName('Sheet1');
let todoSheet = sheet.getSheetByName('TO-DO LIST');

function doPost(e) {
  try {
    let data = e.parameter;
    
    // Handle todo list data
    if (data.type === 'todos') {
      let todosData = JSON.parse(data.data);
      
      // Clear existing todos
      let lastRow = todoSheet.getLastRow();
      if (lastRow > 1) {
        todoSheet.deleteRows(2, lastRow - 1);
      }
      
      // Add new todos
      todosData.forEach(todo => {
        todoSheet.appendRow([todo.id, todo.subject, todo.text, todo.completed]);
      });
      
      return ContentService.createTextOutput("Success").setMimeType(ContentService.MimeType.TEXT);
    }
    
    // Handle study data
    studySheet.appendRow([data.date, data.studyhours, data.productivity, data.description]);
    return ContentService.createTextOutput("Success").setMimeType(ContentService.MimeType.TEXT);
    
  } catch(error) {
    return ContentService.createTextOutput("Error: " + error.toString()).setMimeType(ContentService.MimeType.TEXT);
  }
}

function doGet(e) {
  try {
    // Handle todo list request
    if (e.parameter.type === 'todos') {
      let todoData = todoSheet.getDataRange().getValues();
      // Remove header row
      todoData.shift();
      
      // Convert to array of objects
      let todos = todoData.map(row => ({
        id: row[0],
        subject: row[1],
        text: row[2],
        completed: row[3]
      }));
      
      return ContentService.createTextOutput(JSON.stringify(todos))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Handle study data request
    let studyData = studySheet.getDataRange().getValues();
    // Remove header row
    studyData.shift();
    
    return ContentService.createTextOutput(JSON.stringify(studyData))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch(error) {
    return ContentService.createTextOutput(JSON.stringify({error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ... rest of your existing code ... 