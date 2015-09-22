(function(ext) {
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    ext.get_data = function(year, callback) {
      console.log("TEST");
       $.ajax({
             url: 'https://opendatanantes.apispark.net/v1/naissances?%24sort=sexe%20DESC&annee='+year,
             settings : {
               contentType: 'application/json',
               accepts: 'application/json'
             },
             dataType: 'json',
             success: function( naissanceData ) {
                 console.log("Success " + naissanceData);
                 var garcons = naissanceData[0]['nb_naissances'];
                 console.log(garcons);
                 var filles = naissanceData[1]['nb_naissances'];
                 console.log(filles);
                 if (garcons >= filles) {
                   callback('garçon');
                 } else {
                   callback('fille');
                 }
             }
       });
   };

   // Block and block menu descriptions
   var descriptor = {
       blocks: [
           ['R', 'Naissances en %n', 'get_data', 2014],
       ]
   };

    // Register the extension
    ScratchExtensions.register('hackathon-nantes', descriptor, ext);
})({});
