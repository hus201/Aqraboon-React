import React, { useEffect } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import PropTypes from 'prop-types';

// /* Begin GetLocationMap*/
const GetLocationMap = ({ setLocation, Lat, Lng }) => {
  useEffect(() => {
    let map;
    const additionalOptions = {};
    try {
      const loader = new Loader({
        apiKey: 'AIzaSyC4EGFc_Y4wOspdDUmgEUu_76dBP2v6RD4',
        version: 'weekly',
        ...additionalOptions
      });

      loader.load().then(() => {
        map = new window.google.maps.Map(document.getElementById('GetLocationMap'), {
          center: { lat: parseFloat(Lat) ?? 31.963158, lng: parseFloat(Lng) ?? 35.930359 },
          zoom: 8,
          mapTypeId: window.google.maps.MapTypeId.HYBRID
        });

        map.data.setStyle((feature) => ({
          title: feature.getProperty('name'),
          optimized: false
        }));

        const marker = new window.google.maps.Marker({
          position: { lat: 31.963158, lng: 35.930359 }
        });
        marker.setMap(map);
        const infowindow = new window.google.maps.InfoWindow({
          content: `<p>Marker Location:${marker.getPosition()}</p>`
        });

        window.google.maps.event.addListener(marker, 'click', () => {
          infowindow.open(map, marker);
        });

        map.addListener('click', (loc) => {
          setLocation(loc.latLng.lat(), loc.latLng.lng());
          marker.setPosition(loc.latLng);
          // to add new marker on each click
          // marker = new window.google.maps.Marker({
          //   position: { lat: loc.latLng.lat(), lng: loc.latLng.lng() }
          // });
        });

        const btnCurrentLoc = document.createElement('button');
        btnCurrentLoc.style.backgroundColor = 'white';
        btnCurrentLoc.style.marginRight = '5px';
        btnCurrentLoc.style.height = '50px';
        btnCurrentLoc.style.width = '50px';
        //  btnCurrentLoc.onClick = (e) => getCurrentLocation(e);

        map.controls[window.google.maps.ControlPosition.RIGHT_CENTER].push(btnCurrentLoc);
      });
    } catch (ex) {
      console.log(ex);
    }
  }, [0]);
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      const info = new window.google.maps.Infowindow();
      navigator.geolocation.getCurrentLocation(
        (position) => {
          console.log(position);
        },
        (err) => {
          console.log(err);
        }
      );
    }
  };

  return <div id="GetLocationMap" style={{ height: '100%', width: '100%' }} />;
};

GetLocationMap.propTypes = {
  setLocation: PropTypes.func
};

// /* END GetLocationMap*/

// /* Begin DisplayPoint*/

const DisplayPoint = ({ Lat, Lng }) => {
  useEffect(() => {
    let map;
    const additionalOptions = {};
    try {
      const loader = new Loader({
        apiKey: 'AIzaSyC4EGFc_Y4wOspdDUmgEUu_76dBP2v6RD4',
        version: 'weekly',
        ...additionalOptions
      });

      loader.load().then(() => {
        map = new window.google.maps.Map(document.getElementById('GetLocationMap'), {
          center: { lat: parseFloat(Lat), lng: parseFloat(Lng) },
          zoom: 8,
          mapTypeId: window.google.maps.MapTypeId.HYBRID
        });

        map.data.setStyle((feature) => ({
          title: feature.getProperty('name'),
          optimized: false
        }));

        const marker = new window.google.maps.Marker({
          position: { lat: parseFloat(Lat), lng: parseFloat(Lng) }
        });
        marker.setMap(map);
      });
    } catch (ex) {
      console.log(ex);
    }
  }, [0]);

  return <div id="GetLocationMap" style={{ height: '100%', width: '100%' }} />;
};

// /* END DisplayPoint*/

export { GetLocationMap, DisplayPoint };
