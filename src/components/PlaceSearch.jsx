import { useEffect, useRef } from 'react';
import Radar from 'radar-sdk-js';
import 'radar-sdk-js/dist/radar.css';

const generateURL = (latitude,longitude) => {
  return `https://weather-project-api.onrender.com/weather/data?lat=${latitude}&lon=${longitude}`
}

const PlaceSearch = ({changeLoc, setWeatherData}) => {
  const autocompleteRef = useRef(null);

  useEffect(() => {
      Radar.initialize(import.meta.env.PK_KEY);

      autocompleteRef.current = Radar.ui.autocomplete({
        container: 'autocomplete',
        placeholder: "Search Place",
        width: '1000px',
        showMarkers: false,
        onSelection: (address) => {
          changeLoc(`${address.city ?? address.addressLabel},${address.state},${address.country}`)
          fetch(generateURL(address.latitude,address.longitude),{mode:"cors"})
                .then(res => {return res.json()})
                .then(res => setWeatherData(res))
                .catch(error => console.log(error))
        },
        onError: (error) => {
          console.log(error)
        }
      });

    return () => {
        autocompleteRef.current?.remove();
    };
  }, []);

  return (
    <div className="bg-white w-fit mx-auto mb-3" id="autocomplete" />
  );
};

export default PlaceSearch;