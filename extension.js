(function(ext) {
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    ext.get_data = function(year, callback) {
       $.ajax({
             url: 'https://opendatanantes.apispark.net/v1/naissances?annee='+year,
             settings : {
               contentType: 'application/json',
               accepts: 'application/json'
             },
             dataType: 'json',
             success: function( naissanceData ) {
                 var question = naissanceData[0]['nb_naissances'];
                 question += naissanceData[1]['nb_naissances'];
                 callback(question);
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
