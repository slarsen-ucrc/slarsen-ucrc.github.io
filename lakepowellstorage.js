(function() {
    // Create the connector object
    var myConnector = tableau.makeConnector();

    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
        var cols = [{
            id: "datetime",
            dataType: tableau.dataTypeEnum.string
        }
		//, {
        //    id: "storage",
        //    dataType: tableau.dataTypeEnum.string
        //}
		];

        var tableSchema = {
            id: "LPStorage",
            alias: "Lake Powell Reservoir Storage",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    // Download the data
    myConnector.getData = function(table, doneCallback) {
        $.getJSON("https://www.usbr.gov/uc/water/hydrodata/reservoir_data/919/json/17.json", function(resp) {
            var feat = resp,
                tableData = [];

            // Iterate over the JSON object
            for (var i = 0, len = feat.length; i < len; i++) {
                tableData.push({
				"datetime": feat[i].data[0]
            //    "storage": feat[i].data
                });
            }

            table.appendRows(tableData);
            doneCallback();
        });
    };

    tableau.registerConnector(myConnector);

    // Create event listeners for when the user submits the form
    $(document).ready(function() {
        $("#submitButton").click(function() {
            tableau.connectionName = "LP Reservoir Storage"; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });
})();