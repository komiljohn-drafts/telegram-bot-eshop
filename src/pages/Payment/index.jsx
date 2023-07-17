import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Countdown from "react-countdown";
import { useNavigate } from "react-router-dom";
import { Map, Placemark, YMaps } from "@pbe/react-yandex-maps";
import { MapPin, Truck, UserCheck } from "react-feather";

import NumberInput from "../../components/Buttons/NumberInput";
import TextInput from "../../components/Buttons/TextInput";
import useTelegram from "../../hooks/useTelegram";
import MainButton from "../../components/Buttons/MainButton";
import cls from "./styles.module.scss";

export default function Payment() {
  const form = useForm({ defaultValues: {} });
  const { tg } = useTelegram();
  const navigate = useNavigate();

  const [resendCode, setResendCode] = useState(false);
  const [phoneNumSent, setPhoneNumSent] = useState(false);
  const [showCountDown, setShowCountDown] = useState(false);
  const [activeTabId, setActiveTabId] = useState(1);
  const [placemark, setPlacemark] = useState([41.3488386, 69.3373077]);

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
                {tab.icon()}
                {tab.text}
              </div>
            ))}
          </div>
        </div>
        <div className={cls.tabPanels}>
          {activeTabId === 1 ? (
            <div className={cls.map}>
              <YMaps>
                <div>
                  My awesome application with maps!
                  <Map
                    width="364px"
                    onClick={(e) => setPlacemark(e.get("coords"))}
                    defaultState={{ center: placemark, zoom: 13 }}
                  >
                    <Placemark geometry={placemark} />
                  </Map>
                </div>
              </YMaps>
            </div>
          ) : (
            <div className={cls.branches}>
              <div className={cls.branch}>
                <MapPin size={14} />
                Chilonzor
              </div>
              <div className={cls.branch}>
                <MapPin size={14} />
                Yunusobod
              </div>
              <div className={cls.branch}>
                <MapPin size={14} />
                Mirzo Ulug'bek
              </div>
              <div className={cls.branch}>
                <MapPin size={14} />
                Chorsu
              </div>
              <div className={cls.branch}>
                <MapPin size={14} />
                Qo'yliq
              </div>
              <div className={cls.branch}>
                <MapPin size={14} />
                Sergeli
              </div>
              <div className={cls.branch}>
                <MapPin size={14} />
                Mirobod
              </div>
              <div className={cls.branch}>
                <MapPin size={14} />
                Yashnobod
              </div>
            </div>
          )}
        </div>
      </div>
      <MainButton onClick={() => navigate("/orders")}>Gazini bosish</MainButton>
    </div>
  );
}
