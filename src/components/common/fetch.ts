import useTelegram from "../../hooks/useTelegram";
import { BOT_URL } from "./config";

export const http = {
  get: () => { },
  post: async function PostData(question: string) {
    const { user_id } = useTelegram();
    const response = await fetch(BOT_URL, {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json',
        "Accept": "application/json",
        "Accept-Encoding": "gzip, deflate, br",
        "Connection": "keep-alive",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },

      body: JSON.stringify({
        userid: user_id,
        botstate: question
      })
    });
    return await response.json() as Array<answer>;
  },
}