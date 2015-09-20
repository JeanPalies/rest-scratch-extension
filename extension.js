(function(ext) {
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    ext.get_data = function(location, callback) {
       // Make an AJAX call to the Open Weather Maps API
       $.ajax({
             url: 'https://opendatanantes.apispark.net/v1/naissances',
             settings: {
               accepts: 'application/json',
               contentType: 'application/json'
             },
             success: function( weather_data ) {
                 // Got the data - parse it and return the temperature
                 temperature = weather_data['main']['temp'];
                 callback(temperature);
             }
       });
   };

   // Block and block menu descriptions
   var descriptor = {
       blocks: [
           ['R', 'current temperature in city %s', 'get_data', 'Boston, MA'],
       ]
   };

    // Register the extension
    ScratchExtensions.register('hackathon-nantes', descriptor, ext);
})({});
