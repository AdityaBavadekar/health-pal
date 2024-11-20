import {
  Bell,
  Calendar,
  File,
  Home,
  Hospital,
  Icon,
  Inbox,
  Search,
  Settings,
  SidebarCloseIcon,
  SidebarOpenIcon,
  Text,
  User,
} from "lucide-react";
import React, { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";

const items = [
  { title: "Home", url: "#", icon: Home },
  { title: "Reminder", url: "#", icon: Bell },
  { title: "Health Records", url: "#", icon: File },
  { title: "Appointments", url: "#", icon: Calendar },
  { title: "AI Chat", url: "#", icon: Text },
  { title: "Search", url: "#", icon: Search },
  { title: "Settings", url: "#", icon: Settings },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const token = localStorage.getItem("token");

  return (
    <>
      {token ? (
        <div className="flex items-start sticky top-0 z-10">
          <SidebarProvider
            className="flex items-start gap-4"
            open={open}
            onOpenChange={setOpen}
          >
            {/* Sidebar */}
            <Sidebar
              collapsible="icon"
              className={`bg-white text-black h-screen shadow-lg ${
                open ? "w-64" : "w-fit"
              } transition-all`}
            >
              {/* Sidebar Header */}
              <SidebarHeader className="p-4 border-b border-emerald-400 flex gap-2 flex-row justify-start items-center">
                <Hospital />
                <h1
                  className={`text-xl font-bold text-emerald-800 ${
                    open ? "block" : "hidden"
                  } transition-all`}
                >
                  HealthPal
                </h1>
              </SidebarHeader>

              {/* Sidebar Content */}
              <SidebarContent className="flex-1 overflow-y-auto">
                <SidebarGroup>
                  <SidebarGroupLabel className="py-5 text-emerald-700 text-xl">
                    Dashboard
                  </SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu
                      className={`flex flex-col gap-3 ${
                        open ? "px-3" : "px-0"
                      } py-3`}
                    >
                      {items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                          <SidebarMenuButton asChild>
                            <a
                              href={item.url}
                              className="flex items-center gap-3 text-black hover:bg-emerald-100 rounded transition-all duration-200"
                            >
                              <item.icon
                                className={`w-7 h-7 text-emerald-600 `}
                              />
                              <span
                                className={`font-medium text-lg ${
                                  open ? "block" : "hidden"
                                }`}
                              >
                                {item.title}
                              </span>
                            </a>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              </SidebarContent>

              {/* Sidebar Footer */}
              <SidebarFooter className="p-4 border-t border-emerald-400 flex flex-col gap-2">
                <div className="flex gap-2 items-center">
                  <User className="text-emerald-600 w-7 h-7" />
                  <div className={`${open ? "flex" : "hidden"} flex-col`}>
                    <h1 className="text-md text-emerald-700 font-semibold">
                      UserName
                    </h1>
                    <p className="text-sm text-emerald-600 ">Email/Id</p>
                  </div>
                </div>
                <div
                  className={`flex items-center gap-3 ${
                    open ? "flex-row" : "hidden"
                  }`}
                >
                  <span className="text-sm text-emerald-600">
                    © {new Date().getFullYear()}
                  </span>
                  <a
                    href="#"
                    className="text-sm text-emerald-600 hover:underline"
                  >
                    Privacy Policy
                  </a>
                </div>
              </SidebarFooter>
            </Sidebar>

            {/* Toggle Sidebar Button */}
            <button
              onClick={() => setOpen(!open)}
              aria-label="Toggle Sidebar"
              className="mt-2 p-2 text-emerald-600 bg-white rounded-full shadow-md hover:bg-emerald-50 transition"
            >
              {open ? (
                <SidebarCloseIcon className="w-6 h-6" />
              ) : (
                <SidebarOpenIcon className="w-6 h-6" />
              )}
            </button>
          </SidebarProvider>
        </div>
      ) : (
        <div className="flex items-center justify-center bg-emerald-600 text-white p-4 sticky top-0 w-full">
          <div className="flex items-center justify-between w-[80%]">
            <h1 className="text-xl font-bold">HealthPal</h1>
            <div className="flex gap-4">
              <a href="/login" className="text-white">
                Login
              </a>
              <a href="/signup" className="text-white">
                Signup
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
