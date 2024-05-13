"use client";
import { Button } from "@/components/ui/button";

import React from "react";
import { useToast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Framework {
  title: string;
  description: string;
}

export default function Home() {
  const { toast } = useToast();
  const installedFrameworks: Framework[] = [
    {
      title: "NextJS",
      description: "14.2.3",
    },
    {
      title: "shadcn/ui",
      description: "UI component library",
    },
    {
      title: "useSWR",
      description: "API request hook",
    },
    {
      title: "tanstack - table",
      description: "Headless table component",
    },
  ];
  return (
    <main className="flex min-h-screen flex-col items-start mx-auto gap-4">
      <Card className={"w-[380px]"}>
        <CardHeader>
          <CardTitle>Installed Frameworks</CardTitle>
          <CardDescription>Boilerplates that was chosen</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div>
            {installedFrameworks.map((notification, index) => (
              <div
                key={index}
                className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
              >
                <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500 animate-pulse" />
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {notification.title}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {notification.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <Button
        onClick={() => {
          toast({
            title: "Scheduled: Catch up",
            description: "Friday, February 10, 2023 at 5:57 PM",
          });
        }}
      >
        Hello
      </Button>
    </main>
  );
}
