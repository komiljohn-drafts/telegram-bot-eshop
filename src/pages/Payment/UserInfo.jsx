import { useState } from "react";
import cls from "./styles.module.scss";
import TextInput from "../../components/Buttons/TextInput";
import NumberInput from "../../components/Buttons/NumberInput";
import Countdown from "react-countdown";
import CountdownTime from "./CountdownTime";

export default function UserInfo({ form }) {
  const [resendCode, setResendCode] = useState(false);
  const [phoneNumSent, setPhoneNumSent] = useState(false);
  const [showCountDown, setShowCountDown] = useState(false);

  return (
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
            {showCountDown && (
              <Countdown
                key={resendCode}
                renderer={(props) => <CountdownTime {...props} setResendCode={setResendCode} />}
                date={Date.now() + 5000}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
