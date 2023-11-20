function get_address(lat, lng) {
    return new Promise((resolve, reject) => {
      fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            console.error(data.error);
            reject(data.error);
          } else {
            if(data.results.length == 0)
              resolve("Unknown");
            else
              resolve(data.results[0].formatted_address);
          }
        });
    });
  }

  // get directions
function get_directions(start, end) {
    return new Promise((resolve, reject) => {
    fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${start}&destination=${end}&key=${API_KEY}`
    )
        .then((res) => res.json())
        .then((data) => {
        if (data.error) {
            console.error(data.error);
            reject(data.error);
        } else {
            resolve(data.routes[0].legs[0].steps);
        }
        });
    });
}

export { get_address, get_directions };