import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Countdown from "react-countdown";

import NumberInput from "../../components/Buttons/NumberInput";
import useTelegram from "../../hooks/useTelegram";
import cls from "./styles.module.scss";
import TextInput from "../../components/Buttons/TextInput";
import useCategoriesStore from "../../store/categories";

export default function Payment(props) {
  const { setCurrentPage } = props;
  const { tg, queryId, user } = useTelegram();
  const form = useForm({ defaultValues: {} });
  const { categories } = useCategoriesStore((state) => state);

  const [resendCode, setResendCode] = useState(false);
  const [phoneNumSent, setPhoneNumSent] = useState(false);
  const [showCountDown, setShowCountDown] = useState(false);

  useEffect(() => {
    tg.MainButton.text = phoneNumSent ? "RO'YXATDAN O'TISH" : "KODNI OLISH";
    tg.MainButton.show();
    tg.BackButton.show();
  }, [tg, phoneNumSent]);

  const onSubmit = (values) => {
    if (phoneNumSent) {
      // to-do
      setShowCountDown(false);
      console.log("values => ", values);
      console.log("tg info => ", tg.initDataUnsafe);

      fetch("https://tubular-cocada-8aa0e4.netlify.app/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ registerData: values, categories, queryId }),
      });
    } else {
      setPhoneNumSent(true);
      setShowCountDown(true);
      // to-do
    }
  };

  tg.onEvent("mainButtonClicked", () => form.handleSubmit(onSubmit)());
  tg.onEvent("backButtonClicked", () => setCurrentPage("orders"));

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

  return (
    <div className={cls.wrapper}>
      <div onClick={() => form.handleSubmit(onSubmit)()}>Submit`da endi</div>
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
  );
}
