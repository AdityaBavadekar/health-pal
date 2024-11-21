import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  Home,
  Bell,
  File,
  Calendar,
  Text,
  Search,
  Settings,
  Hospital,
  User,
  SidebarCloseIcon,
  SidebarOpenIcon,
} from "lucide-react";
import Cookies from "js-cookie";

const PatientItems = [
  { title: "Home", url: "/dashboard", icon: Home },
  { title: "Reminder", url: "/reminder", icon: Bell },
  { title: "Health Records", url: "/health-records", icon: File },
  { title: "Appointments", url: "/appointments", icon: Calendar },
  { title: "AI Chat", url: "/ai-chat", icon: Text },
  { title: "Search", url: "/search", icon: Search },
  { title: "Settings", url: "/settings", icon: Settings },
];

const DoctorItems = [
  { title: "Home", url: "/dashboard", icon: Home },
  { title: "Appointments", url: "/home", icon: Calendar },
  { title: "Search", url: "/search", icon: Search },
  { title: "Settings", url: "/settings", icon: Settings },
];

const HospitalItems = [
  { title: "Home", url: "/dashboard", icon: Home },
  { title: "Appointments", url: "/home", icon: Calendar },
  { title: "Search", url: "/search", icon: Search },
  { title: "Settings", url: "/settings", icon: Settings },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [userType, setUserType] = useState(null);
  const token = Cookies.get("jwt");

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserType(decodedToken.type);
    }
  }, [token]);

  const getSidebarItems = () => {
    switch (userType) {
      case "Doctor":
        return DoctorItems;
      case "Hospital":
        return HospitalItems;
      case "Patient":
      default:
        return PatientItems;
    }
  };

  return (
    <>
      {token ? (
        <div className="flex items-start sticky top-0 z-10 bg-gray-100">
          <SidebarProvider
            className="flex items-start gap-4"
            open={open}
            onOpenChange={setOpen}
          >
            <Sidebar
              collapsible="icon"
              className={`bg-white text-black h-screen shadow-lg ${
                open ? "w-64" : "w-fit"
              } transition-all`}
            >
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

              <SidebarContent className="flex-1 overflow-y-auto">
                <SidebarGroup>
                  <SidebarGroupLabel className="py-5 text-emerald-700 text-xl">
                    {userType} Dashboard
                  </SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu
                      className={`flex flex-col gap-3 ${
                        open ? "px-3" : "px-0"
                      } py-3`}
                    >
                      {getSidebarItems().map((item, index) => (
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
        <div className="fixed top-0 left-0 w-full bg-emerald-600 text-white p-4 shadow-md z-50">
          <div className="flex items-center justify-between w-[80%] mx-auto">
            <h1 className="text-xl font-bold">HealthPal</h1>
            <div className="flex gap-4">
              <a href="/login" className="text-white hover:underline">
                Login
              </a>
              <a href="/signup" className="text-white hover:underline">
                Signup
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
