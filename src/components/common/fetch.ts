import moment from "moment";
import { BOT_URL } from "./config";

export const http = {
  get: () => { },
  post: async function PostData(
    userid: string,
    question: string,
    startdate: string,
    enddate: string
  ) {
    const isValidStartDate = moment(startdate, 'YYYY-MM-DD', true).isValid();
    const isValidEndDate = moment(enddate, 'YYYY-MM-DD', true).isValid();
    if (isValidEndDate && isValidStartDate) {
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
          userid,
          botstate: question,
          startdate: startdate.replace(/[-_]/g, ""),
          enddate: enddate.replace(/[-_]/g, "")
        })
      });
      return await response.json() as Array<answer>;
    }
    return [];
  }
}