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

  const [otpSent, setOtpSent] = useState(false);

  // console.log(first)

  useEffect(() => {
    tg.setHeaderColor("secondary_bg_color");
    tg.MainButton.text = "RO'YXATDAN O'TISH";
    tg.MainButton.show();
  }, [tg]);

  const handleSubmit = (values) => {
    if (otpSent) {
      // to-do
      console.log("values => ", values);
      console.log("tg info => ", tg.initDataUnsafe);
    } else {
      setOtpSent(true);
      // to-do
    }
  };

  tg.onEvent("mainButtonClicked", () => form.handleSubmit(handleSubmit));
  tg.onEvent("backButtonClicked", () => setCurrentPage("orders"));

  const doubleTime = (str) => (String(str).length === 1 ? `0${str}` : str);

  const timerRenderer = ({ minutes, seconds, completed }) => {
    return (
      <p className={cls.countdown}>
        {completed ? (
          <span>Qayta yuborish</span>
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
      <p className={cls.title}>Ro&apos;yxatdan o&apos;tish</p>
      <div className={cls.form}>
        <NumberInput
          mask={"+998 99 999-99-99"}
          placeholer="+998 99 999-99-99"
          label="Telefon"
          form={form}
          name="phone_number"
          required
        />
        {otpSent && (
          <>
            <NumberInput placeholer="0000" mask={"9999"} label="Kod" form={form} name="otp_code" required />
            <Countdown renderer={timerRenderer} date={Date.now() + 10000}></Countdown>
          </>
        )}
      </div>
    </div>
  );
}
