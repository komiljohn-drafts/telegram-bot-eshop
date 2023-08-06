import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Countdown from "react-countdown";
import { useNavigate } from "react-router-dom";
import { GeolocationControl, Map, Placemark, YMaps, ZoomControl } from "@pbe/react-yandex-maps";
import { MapPin, Truck, UserCheck } from "react-feather";

import NumberInput from "../../components/Buttons/NumberInput";
import TextInput from "../../components/Buttons/TextInput";
import useTelegram from "../../hooks/useTelegram";
import MainButton from "../../components/Buttons/MainButton";
import { getGeoLocation } from "../../services/yandexSerive";
import cls from "./styles.module.scss";

export default function Payment() {
  const form = useForm({ defaultValues: {} });
  const { tg } = useTelegram();
  const navigate = useNavigate();

  const [resendCode, setResendCode] = useState(false);
  const [address, setAddress] = useState("");
  const [ymaps, setYmaps] = useState(false);
  const [selectedBranchId, setSelectedBranchId] = useState(null);
  const [phoneNumSent, setPhoneNumSent] = useState(false);
  const [showCountDown, setShowCountDown] = useState(false);
  const [activeTabId, setActiveTabId] = useState(1);
  const [placemark, setPlacemark] = useState([41.3488386, 69.3373077]);

  // console.log(
  //   ymaps.geocode(placemark).then((res) => {
  //     console.log("res => ", res);
  //   })
  // );

  const doubleTime = (str) => (String(str).length === 1 ? `0${str}` : str);

  const timerRenderer = ({ minutes, seconds, completed }) => {
    return (
      <p className={cls.countdown}>
        {completed ? (
          <span onClick={() => setResendCode((p) => !p)}>Qayta yuborish</span>
        ) : (
          <span>
            {doubleTime(minutes)}:{doubleTime(seconds)}
          </span>
        )}
      </p>
    );
  };

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

  useEffect(() => {
    tg.BackButton.show();
  }, []);

  tg.onEvent("backButtonClicked", () => navigate("/orders"));

  const tabs = [
    {
      id: 1,
      text: "Yetkazib berish",
      icon: () => <Truck size={16} />,
    },
    {
      id: 2,
      text: "Olib ketish",
      icon: () => <UserCheck size={16} />,
    },
  ];

  return (
    <div className={cls.wrapper}>
      <div className={cls.inner}>
        <p className={cls.title}>Shaxsiy ma'lumotlar</p>
        <div className={cls.form}>
          <TextInput placeholder="Ismingizni kiriting" label="Ism" form={form} name="first_name" required />
          <NumberInput
            mask={"+998 99 999-99-99"}
            placeholder="+998 99 999-99-99"
            label="Telefon"
            form={form}
            name="phone_number"
            required
          />
          {phoneNumSent && (
            <>
              <NumberInput placeholer="0000" mask={"9999"} label="Kod" form={form} name="otp_code" />
              {showCountDown && <Countdown key={resendCode} renderer={timerRenderer} date={Date.now() + 5000} />}
            </>
          )}
        </div>
      </div>
      <div className={cls.tabsWrapper}>
        <div className={cls.tabs}>
          <div className={cls.tabs_inner}>
            {tabs.map((tab) => (
              <div
                key={tab.id}
                className={`${cls.tab} ${tab.id === activeTabId ? cls.active : ""}`}
                onClick={() => setActiveTabId(tab.id)}
              >
                {/* {tab.icon()} */}
                {tab.text}
              </div>
            ))}
          </div>
        </div>
        <div className={cls.tabPanels}>
          {activeTabId === 1 ? (
            <div className={cls.map}>
              <YMaps query={{ apikey: "c98d40ff-b595-4324-ac0e-ac2159a1a918", load: "util.bounds" }}>
                <div>
                  <p className={cls.selectAddress}>Yetkazib berish manzilini belgilang</p>
                  <Map
                    // options={{avoidFractionalZoom}}
                    width="348px"
                    onLoad={(ymaps) => setYmaps(ymaps)}
                    onClick={(e) => {
                      console.log("e => ", e._sourceEvent);
                      setPlacemark(e.get("coords"));
                    }}
                    modules={["geocode", "geolocation"]}
                    options={{ suppressMapOpenBlock: true, controls: [] }}
                    defaultState={{ center: placemark, zoom: 13, controls: [] }}
                  >
                    <GeolocationControl
                      // onLoad={(e) => console.log("e =< ", e)}
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
            </div>
          ) : (
            <div className={cls.branches}>
              <p className={cls.chooseBranch}>Filialni tanlang</p>
              {branches.map((branch) => (
                <div
                  key={branch.id}
                  className={`${cls.branch}`}
                  onClick={() => {
                    setSelectedBranchId(branch.id);
                  }}
                >
                  <MapPin color={branch.id === selectedBranchId ? "#33b648" : "#000"} size={14} />
                  {branch.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <MainButton center onClick={() => navigate("/orders")}>
        Gazini bosish
      </MainButton>
    </div>
  );
}

const branches = [
  {
    id: 1,
    name: "Chilonzor",
  },
  {
    id: 2,
    name: "Ahmad Donish",
  },
  {
    id: 3,
    name: "Zenit",
  },
  {
    id: 4,
    name: "Sayram",
  },
  {
    id: 5,
    name: "Universam",
  },
  {
    id: 6,
    name: "Oloy bozori",
  },
  {
    id: 7,
    name: "SamPI",
  },
];
