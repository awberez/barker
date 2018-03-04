let geoLocat= [];
                  googleMapsClient.geocode({
                                            address: req.body.addr1 +', '+ req.body.city + ', ' + req.body.state
                                            },
                                            (err,response)=>{
                                                if (!err) {
                                                    console.log(response.json.results[0].geometry.location);
                                                    geocode = response.json.results[0].geometry.location;
                                                    var sequelizeGeo = [geocode.lat, geocode.lng]
                                                    console.log('\n\n\n\n\n\n\n\n\n\n\n');
                                                    console.log(sequelizeGeo);
                                                }
                                            });
                