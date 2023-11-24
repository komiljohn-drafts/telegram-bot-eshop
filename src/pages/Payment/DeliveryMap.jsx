import { useEffect, useState } from "react";
import { GeolocationControl, Placemark, YMaps, ZoomControl, Map } from "@pbe/react-yandex-maps";

import { getGeoLocation } from "../../services/yandexSerive";
import getCurrentLocation from "../../hooks/getCurrentLocation";
import PrimaryButton from "../../components/Buttons/PrimaryButton";
import cls from "./styles.module.scss";

export default function DeliveryMap() {
  const [ymaps, setYmaps] = useState(false);
  const [placemark, setPlacemark] = useState([41.3488386, 69.3373077]);
  const [address, setAddress] = useState("");

  useEffect(() => {
    getGeoLocation({ lat: placemark[1], long: placemark[0] }).then((res) => {
      if (res.response) {
        setAddress(
          res.response.GeoObjectCollection.featureMember[0].GeoObject.name
          // " " +
          // res.response.GeoObjectCollection.featureMember[1].GeoObject.description
        );
      }
    });
  }, [placemark]);

  useEffect(() => {
    function success(pos) {
      const crd = pos.coords;

      setPlacemark([crd.latitude, crd.longitude]);
    }

    function error(prop) {
      console.log("ERROR => ", prop);
    }

    navigator.geolocation.getCurrentPosition(success, error, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    });
  }, []);

  // console.log(
  //   ymaps.geocode(placemark).then((res) => {
  //     console.log("res => ", res);
  //   })
  // );

  return (
    <div className={cls.map}>
      <YMaps query={{ apikey: "c98d40ff-b595-4324-ac0e-ac2159a1a918", load: "util.bounds" }}>
        <div>
          <p className={cls.selectAddress}>Yetkazib berish manzilini belgilang</p>
          <Map
            width="348px"
            onLoad={(ymaps) => setYmaps(ymaps)}
            onClick={(e) => {
              console.log("e => ", e._sourceEvent);
              setPlacemark(e.get("coords"));
            }}
            modules={["geocode", "geolocation"]}
            options={{ suppressMapOpenBlock: true, controls: [] }}
            defaultState={{ center: placemark, zoom: 18, controls: [] }}
          >
            <GeolocationControl
              onClick={(e) => console.log("e =< ", e)}
              options={{
                position: {
                  top: 8,
                  right: 8,
                },
                size: "40px",
              }}
            />
            <ZoomControl
              options={{
                position: {
                  bottom: 50,
                  right: 8,
                },
                size: "40px",
                width: "40px",
                height: "40px",
                cornerRadius: "50%",
              }}
            />
            <Placemark geometry={placemark} />
          </Map>
          <p className={cls.adressP}>Manzil</p>
          <div className={cls.place}>{address}</div>
        </div>
      </YMaps>
      <PrimaryButton center classes={cls.get_location_btn} onClick={() => getCurrentLocation(setPlacemark)}>
        Определить мою локацию
      </PrimaryButton>
    </div>
  );
}
