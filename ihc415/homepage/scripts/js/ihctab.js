//declaring global variables
var workbook;
var activeSheet;
var viz;

//initialize function
function initViz() {
    var containerDiv = document.getElementById("tableauViz"),
    url = "https://public.tableau.com/views/IHCChart1/Dashboard1?:embed=y&:display_count=yes";


	var options = {
		//width: containerDiv.offsetWidth,
		//height: containerDiv.offsetHeight,
		hideTabs: true,
		hideToolbar: true,
		onFirstInteractive: function () {
		  workbook = viz.getWorkbook();
		  activeSheet = workbook.getActiveSheet();
		  listenToMarksSelection(); //call the start of the select marks function below
		}
	};
    viz = new tableau.Viz(containerDiv, url, options);


}


//############################################################################################
//SELECT MARKS################################################################################
//############################################################################################

//Select Marks--------------------------------------------------------------------------------
function listenToMarksSelection() {
	//console.log("listentomarksselection");
	viz.addEventListener(tableau.TableauEventName.MARKS_SELECTION, onMarksSelection);
	//console.log("listentomarksselection2--------------------------");
	onMarksSelection();
}

function onMarksSelection(marksEvent) {
	//console.log("marksevent");
	return marksEvent.getMarksAsync().then(reportSelectedMarks);
	//console.log("marksevent2-------------");
	reportSelectedMarks(marks);
}

function reportSelectedMarks(marks) {
	var html = "";
	//console.log("Report selected marks function called");
	//console.log(marks);
	for (var markIndex = 0; markIndex < marks.length; markIndex++) {
		var pairs = marks[markIndex].getPairs();
		html += "<b>Mark " + markIndex + ":</b><ul>";

		for (var pairIndex = 0; pairIndex < pairs.length; pairIndex++) {
			var pair = pairs[pairIndex];
			html += "<li><b>Field Name:</b> " + pair.fieldName;
			html += "<br/><b>Value:</b> " + pair.formattedValue + "</li>";
		}

		html += "</ul>";
	}

	var infoDiv = document.getElementById('markDetails');
	infoDiv.innerHTML = html;
}


//############################################################################################
//FILTER BY REGION############################################################################
//############################################################################################

//filter by ALL
function filterSingleValue1() { 
    workbook.getActiveSheet().getWorksheets().get("Completed Projects").applyFilterAsync(
		"Region",
		["Central Entities", "North Region"],
		tableau.FilterUpdateType.REPLACE);
}
//filter by UK
function filterSingleValue2() { 
    workbook.getActiveSheet().getWorksheets().get("Completed Projects").applyFilterAsync(
		"Region",
		"Central Entities",
		tableau.FilterUpdateType.REPLACE);	
}
//filter by US
function filterSingleValue3() { 
    workbook.getActiveSheet().getWorksheets().get("Completed Projects").applyFilterAsync(
		"Region",
		"North Region",
		tableau.FilterUpdateType.REPLACE);	
}


//############################################################################################
//SELECT WORKBOOK SHEETS######################################################################
//############################################################################################

//Switch Sheets-------------------------------------------------------------------------------
function switchView1() {
  sheetName = "Dashboard 1";
  workbook.activateSheetAsync(sheetName);
}
function switchView2() {
  sheetName = "Completed Projects/Month";
  workbook.activateSheetAsync(sheetName);
}
function switchView3() {
  sheetName = "Percent Projects Involving Physicians";
  workbook.activateSheetAsync(sheetName);
}
function switchView4() {
  sheetName = "Average Project Duration (Weeks)";
  workbook.activateSheetAsync(sheetName);
}
function switchView5() {
  sheetName = "Percent Projects with Cost Savings";
  workbook.activateSheetAsync(sheetName);
}
function switchView6() {
  sheetName = "Projects in Queue";
  workbook.activateSheetAsync(sheetName);
}
function switchView7() {
  sheetName = "Active Projects";
  workbook.activateSheetAsync(sheetName);
}
function switchView8() {
  sheetName = "Completed Projects";
  workbook.activateSheetAsync(sheetName);
}


