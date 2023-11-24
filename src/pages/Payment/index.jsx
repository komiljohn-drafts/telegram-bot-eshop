import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import useTelegram from "../../hooks/useTelegram";
import MainButton from "../../components/Buttons/MainButton";
import UserInfo from "./UserInfo";
import DeliveryTabs from "./DeliveryTabs";
import DeliveryMap from "./DeliveryMap";
import DeliveryBranches from "./DeliveryBranches";
import cls from "./styles.module.scss";

export default function Payment() {
  const form = useForm({ defaultValues: {} });
  const { tg } = useTelegram();
  const navigate = useNavigate();

  const [activeTabId, setActiveTabId] = useState(1);

  useEffect(() => {
    tg.BackButton.show();
  }, []);

  tg.onEvent("backButtonClicked", () => navigate("/orders"));

  return (
    <div className={cls.wrapper}>
      <UserInfo form={form} />
      <div className={cls.tabsWrapper}>
        <DeliveryTabs setActiveTabId={setActiveTabId} activeTabId={activeTabId} />
        <div className={cls.tabPanels}>{activeTabId === 1 ? <DeliveryMap /> : <DeliveryBranches />}</div>
      </div>
      <MainButton center onClick={() => navigate("/orders")}>
        Keyingi bosqich
      </MainButton>
    </div>
  );
}
