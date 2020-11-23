(function () {
var myConnector = tableau.makeConnector();
myConnector.getSchema = function (schemaCallback) {
var cols = [
{ id : "datetime", alias:"Datetime", dataType : tableau.dataTypeEnum.string },
{ id : "storage", alias: "Storage",dataType : tableau.dataTypeEnum.string }
];
var tableInfo = {
id : "17",
alias : "Lake Powell Reservoir Storage",
columns : cols
};
schemaCallback([tableInfo]);
};
myConnector.getData = function(table, doneCallback) {
$.getJSON("https://www.usbr.gov/uc/water/hydrodata/reservoir_data/919/json/17.json", function(resp) {
var feat = resp;
tableData = [];
// Iterate over the JSON object
for (var i = 0, len = feat.length; i < len; i++) {
tableData.push({
"datetime": feat[i]["Datetime"],
"storage": feat[i]["Storage"]
});
}
table.appendRows(tableData);
doneCallback();
});
};
tableau.registerConnector(myConnector);
$(document).ready(function () {
$("#submitButton").click(function () {
tableau.connectionName = "columns";
tableau.submit();
});
});})();

https://www1.nyc.gov/assets/tlc/downloads/csv/data_reports_monthly_indicators.json