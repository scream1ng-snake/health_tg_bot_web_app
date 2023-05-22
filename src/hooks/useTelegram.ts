declare global {
  interface Window {
    Telegram: any;
  }
}


const tg = window.Telegram.WebApp;




export default function useTelegram() {
  /** Закрыть приложение */
  function closeApp() {
    tg.close();
  }

  const colors = {
    bg_color: tg.themeParams.bg_color,
    text_color: tg.themeParams.text_color,
    hint_color: tg.themeParams.hint_color,
    button_color: tg.themeParams.button_color,
    button_text_color: tg.themeParams.button_text_color,
    secondary_bg_color: tg.themeParams.secondary_bg_color,
  }


  return {
    tg, 
    colors,
    closeApp, 
    user: tg.initDataUnsafe?.user, 
    queryId: tg.initDataUnsafe?.query_id, 
  }
}