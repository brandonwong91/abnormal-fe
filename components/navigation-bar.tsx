"use client";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@radix-ui/react-navigation-menu";
import Link from "next/link";
import React from "react";
import { navigationMenuTriggerStyle } from "./ui/navigation-menu";
import { usePathname } from "next/navigation";

interface Route {
  label: string;
  href: string;
}

const NavigationBar = () => {
  const pathname = usePathname();
  const routes: Route[] = [
    {
      label: "Notification page (test)",
      href: "/test",
    },
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Forms",
      href: "/forms",
    },
    {
      label: "Table",
      href: "/table",
    },
  ];
  return (
    <div className="flex flex-row mx-auto w-full my-8 px-20 justify-normal">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl max-w-fit">
        <a href="/">Abnormal FE</a>
      </h1>
      <NavigationMenu className="content-center">
        <NavigationMenuList className="px-4 gap-4 flex flex-row">
          {routes.map(({ label, href }) => {
            return (
              <NavigationMenuItem key={label}>
                <Link href={href} legacyBehavior passHref>
                  <NavigationMenuLink
                    className={navigationMenuTriggerStyle()}
                    active={pathname === href}
                  >
                    {label}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            );
          })}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default NavigationBar;
