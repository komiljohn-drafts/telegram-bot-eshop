export default function useTelegram() {
  const tg = window.Telegram.WebApp;
  return {
    tg,
    queryId: tg.query_id,
  };
}
