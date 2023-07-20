import moment from "moment";
import { BOT_URL } from "./config";

const headers = {
  "Content-Type": 'application/json',
  "Accept": "application/json",
  "Accept-Encoding": "gzip, deflate, br",
  "Connection": "keep-alive",
  // 'Content-Type': 'application/x-www-form-urlencoded',
}

export const http = {
  getUsers: async (userid: string) => {
    const response = await fetch('https://elipelisr.lexcloud.ru/QualityOfLifeBot/GetUsersInfo', {
      method: 'POST',
      headers,
      body: JSON.stringify({ userid })
    });
    const result = await response.json() as Array<user>;
    if (Array.isArray(result)) return result
    return []
  },
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
        headers,
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