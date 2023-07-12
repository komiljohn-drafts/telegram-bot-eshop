import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Countdown from "react-countdown";
import { useNavigate } from "react-router-dom";

import NumberInput from "../../components/Buttons/NumberInput";
import TextInput from "../../components/Buttons/TextInput";
import useProductsStore from "../../store/categories";
import cls from "./styles.module.scss";
import useTelegram from "../../hooks/useTelegram";
import MainButton from "../../components/Buttons/MainButton";

export default function Payment() {
  const form = useForm({ defaultValues: {} });
  const { tg } = useTelegram();
  const navigate = useNavigate();

  const [resendCode, setResendCode] = useState(false);
  const [phoneNumSent, setPhoneNumSent] = useState(false);
  const [showCountDown, setShowCountDown] = useState(false);

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

  return (
    <div className={cls.wrapper}>
      <div className={cls.inner}>
        <p className={cls.title}>{phoneNumSent ? "RO'YXATDAN O'TISH" : "KODNI OLISH"}</p>
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
      <MainButton onClick={() => navigate("/orders")}>Tugadi</MainButton>
    </div>
  );
}
