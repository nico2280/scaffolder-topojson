/**
 * Created by nmondon on 29/01/14.
 *
 * les fichiers doivent être :
 * - dans le fichier xls
 * - enregistrés en xlsx
 * - avec un seul onglet
 * - avec uniquement les libellés, code, et données
 *
 * Installation
 * > npm install
 *
 * Lancement du programme
 * (il faut d'abord mettre le bon nom du fichier dans la var xlsxName)
 * > node xls_to_json.js
 *
 */

var parseXlsx = require('excel') // parseur xlsx
  , fs = require("fs") // file sys
  , xlsxName = "salaires-2010"

// ouverture d'un fichier donné
parseXlsx('data/' +  xlsxName + '.xlsx', function(err, data) {
  if(err) throw err;

  var jsonHash = {};

  for(var indLine = 0; indLine < data.length; indLine = indLine+1){
    var line = data[indLine];
    jsonHash[ line[0] ] = line[1];
  }

  // enregistrement du fichier
  fs.writeFileSync('data/' + xlsxName + '.json', JSON.stringify(jsonHash));
});
