exports.getMetaTable = function(){

	var parsedLines = require('fs').readFileSync(__dirname + '/mt_source.csv').toString().split("\n").filter(function(l){ return !!l; });


	//TODO: trim all values
	var metaTable = {
		hebrewColumns: 			parsedLines.shift().split(",").slice(2,parsedLines[0].length),
		englishColumns: 		parsedLines.shift().split(",").slice(2,parsedLines[0].length).map(function(c) { return c.replace(/\s/g, "_").toLowerCase(); }),
		dataTypes: 				parsedLines.shift().split(",").slice(2,parsedLines[0].length),
		measures: 				parsedLines.shift().split(",").slice(2,parsedLines[0].length),
		instrumentTypes: 		parsedLines.map(function(l){return l.split(",")[0]}),
		instrumentSubTypes : 	parsedLines.map(function(l){return l.split(",")[1]}),
		dataMapping: 			parsedLines.map(function(l){ return l.split(",").slice(2,l.split(",").length) }),
		getNameForSheetNum: 	function(sheetNum){
			return this.instrumentTypes[sheetNum] + " " + this.instrumentSubTypes[sheetNum];
		},
		getLastSheetNum:		function(){ return this.dataMapping.length -1 },
		columnMappingForRow: 	function(rowId){
			var output = [];
			for (var i = 0; i < this.dataMapping[rowId].length ; i++ ){
				var rowValue = parseInt(this.dataMapping[rowId][i]);
				if (!isNaN(rowValue)){
					output.push(this.hebrewColumns[i])
				}
			}
			return output;
		}
	}

	return metaTable;
}
