import { NotificationType } from "@/types/notification";
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  data?: any;
  error?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    const result = await fetch("https://timeline.cyi-e82.workers.dev/");
    const mapped = new Map<string, NotificationType[]>();
    if (result.ok) {
      const data = await result.json();
      data.forEach((notification: NotificationType) => {
        const { timestamp } = notification;
        const d = new Date(timestamp);
        const date = new Date(d.toDateString());
        const month = date.toLocaleString("default", { month: "short" });
        const day = date.getDate();
        const dateFormatted = `${month}-${day}`;
        const hours = d.getHours();
        const minutes = d.getMinutes().toString().padStart(2, "0");
        const timeFormatted = `${hours % 12}:${minutes} ${
          hours < 12 ? "AM" : "PM"
        }`;
        const updatedNotification = {
          ...notification,
          timestamp: timeFormatted,
        };
        if (mapped.has(dateFormatted)) {
          const notifications = mapped.get(dateFormatted) ?? [];
          mapped.set(dateFormatted, [...notifications, updatedNotification]);
        } else {
          mapped.set(dateFormatted, [updatedNotification]);
        }
      });
    }
    console.log(mapped);
    res.status(200).send(Object.fromEntries(mapped));
  } catch (err) {
    res.status(500).send({
      error: "failed to fetch data",
    });
  }
}
