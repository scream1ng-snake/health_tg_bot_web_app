import useTelegram from "../../hooks/useTelegram";
import { BOT_URL } from "./config";

type answer = {
  cdate: string,
  answer_text: number
}

export const http = {
  get: () => { },
  post: async function PostData(question: string) {
    const { damir_user_id } = useTelegram();
    const response = await fetch(BOT_URL, {
      method: 'POST',
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        AccessControlAllowOrigin:'*',
        ContentType: 'application/json',
        Accept: "application/json",
        AcceptEncoding: "gzip, deflate, br",
        Connection: "keep-alive"
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },

      body: JSON.stringify({
        userid: damir_user_id,
        botstate: question
      })
    });
    return await response.json() as Array<answer>;
  },
}