import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Countdown from "react-countdown";

import NumberInput from "../../components/Buttons/NumberInput";
import useTelegram from "../../hooks/useTelegram";
import cls from "./styles.module.scss";

export default function Payment(props) {
  const { setCurrentPage } = props;
  const { tg } = useTelegram();
  const form = useForm({ defaultValues: {} });

  const [resendCode, setResendCode] = useState(false);
  const [phoneNumSent, setPhoneNumSent] = useState(false);

  // console.log(first)

  useEffect(() => {
    tg.MainButton.text = phoneNumSent ? "RO'YXATDAN O'TISH" : "KODNI OLISH";
    tg.MainButton.show();
    tg.BackButton.show();
  }, [tg, phoneNumSent]);

  const onSubmit = (values) => {
    if (phoneNumSent) {
      // to-do
      console.log("values => ", values);
      console.log("tg info => ", tg.initDataUnsafe);
    } else {
      setPhoneNumSent(true);

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
      {/* <div onClick={() => form.handleSubmit(onSubmit)()}>Submit`da endi</div> */}
      <p className={cls.title}>{phoneNumSent ? "RO'YXATDAN O'TISH" : "KODNI OLISH"}</p>
      <div className={cls.form}>
        <NumberInput
          mask={"+998 99 999-99-99"}
          placeholer="+998 99 999-99-99"
          label="Telefon"
          form={form}
          name="phone_number"
          required
        />
        {phoneNumSent && (
          <>
            <NumberInput placeholer="0000" mask={"9999"} label="Kod" form={form} name="otp_code" required />
            <Countdown key={resendCode} renderer={timerRenderer} date={Date.now() + 5000} />
          </>
        )}
      </div>
    </div>
  );
}
