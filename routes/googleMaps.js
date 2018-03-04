// Google Maps API for User matches
 const googleMapsClient = require('@google/maps').createClient({
    key: 'your API key here'
  });

// Geocode an address.
googleMapsClient.geocode({
    address: '1600 Amphitheatre Parkway, Mountain View, CA'
  }, (err, response) => {
    if (!err) {
      console.log(response.json.results);
    }
  });


  // Geocode an address.
googleMapsClient.geocode({
    address: '1600 Amphitheatre Parkway, Mountain View, CA'
  }, function(err, response) {
    if (!err) {
      console.log(response.json.results);
    }
  });