"use client";
import { cn, fetcher } from "@/lib/utils";

import { DataMap, NotificationType } from "@/types/notification";
import React from "react";
import useSWR from "swr";
const Test = () => {
  const { data }: { data: DataMap } = useSWR("/api/notification", fetcher);

  return (
    <div className="space-y-4">
      {data &&
        Object.entries(data).map(([dateFormatted, v]) => {
          const notifications: NotificationType[] = v;
          return (
            <div key={dateFormatted}>
              <div className="border rounded-2xl w-20 p-1 text-sm ml-16 text-center">
                {dateFormatted}
              </div>
              <div className="space-y-4 pt-4">
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
