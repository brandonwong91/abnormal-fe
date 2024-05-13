"use client";
import { cn, fetcher } from "@/lib/utils";
import { time } from "console";
import React from "react";
import useSWR from "swr";

interface Notification {
  timestamp: string;
  level: string;
  title: string;
  summary: string;
}

const Test = () => {
  const { data } = useSWR("https://timeline.cyi-e82.workers.dev/", fetcher);

  const mapped = new Map<string, Notification[]>();
  if (data) {
    data.forEach((notification: Notification) => {
      const { timestamp } = notification;
      const d = new Date(timestamp);
      const date = new Date(d.toDateString());
      const month = date.toLocaleString("default", { month: "short" }); // Note: getMonth() returns zero-based month
      const day = date.getDate();
      const dateFormatted = `${month}-${day}`;
      const hours = d.getHours();
      const minutes = d.getMinutes().toString().padStart(2, "0"); // Get minutes and pad with leading zero if needed
      const timeFormatted = `${hours % 12}:${minutes} ${
        hours < 12 ? "AM" : "PM"
      }`;
      const updatedNotification = { ...notification, timestamp: timeFormatted };
      if (mapped.has(dateFormatted)) {
        // Get the existing notifications array and append the new notification
        const notifications = mapped.get(dateFormatted) ?? [];
        // if (notifications) {
        //   notifications.push(notification);
        mapped.set(dateFormatted, [...notifications, updatedNotification]);
        // }
      } else {
        // Create a new entry in the map with the date key and an array containing the notification
        mapped.set(dateFormatted, [updatedNotification]);
      }
    });
  }
  console.log(mapped);
  return (
    <div className="space-y-4">
      {Array.from(mapped.keys()).map((dateFormatted) => {
        const notifications = mapped.get(dateFormatted);
        return (
          <div key={dateFormatted}>
            <div className="border rounded-2xl w-20 p-1 text-sm ml-16 text-center">
              {dateFormatted}
            </div>
            <div className="space-y-4">
              {notifications?.map(({ timestamp, title, summary, level }) => {
                return (
                  <div
                    key={`${title}-${timestamp}`}
                    className="grid grid-cols-5 gap-x-2 "
                  >
                    <div className="cols-span-1 flex flex-row">
                      <div className="w-24">{timestamp}</div>
                      <span
                        className={cn(
                          "flex h-2 w-2 translate-y-1 rounded-full mt-1",
                          {
                            "bg-sky-500": level === "info",
                            "bg-red-500": level === "critical",
                            "bg-yellow-500": level === "warning",
                          }
                        )}
                      />
                    </div>
                    <div className="w-full border rounded-lg p-4 col-span-4 shadow-lg">
                      <div className="font-medium">{title}</div>
                      <div>{summary}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Test;
