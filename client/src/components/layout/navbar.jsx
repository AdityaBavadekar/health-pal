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
  SidebarCloseIcon,
  SidebarOpenIcon,
  User2,
  ChevronUp,
} from "lucide-react";
import Cookies from "js-cookie";
import ApiConstants from "../../constants/apiConstants";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

const PatientItems = [
  { title: "Home", url: "/dashboard", icon: Home },
  { title: "Reminder", url: "/reminder", icon: Bell },
  { title: "Health Records", url: "/health-records", icon: File },
  { title: "Appointments", url: "/appointments", icon: Calendar },
  { title: "AI Chat", url: "/chat", icon: Text },
  { title: "Search", url: "/search", icon: Search },
  { title: "Settings", url: "/settings", icon: Settings },
];

const DoctorItems = [
  { title: "Home", url: "/dashboard", icon: Home },
  { title: "Appointments", url: "/appointments", icon: Calendar },
  { title: "Search", url: "/search", icon: Search },
  { title: "Settings", url: "/settings", icon: Settings },
];

const HospitalItems = [
  { title: "Home", url: "/dashboard", icon: Home },
  { title: "Appointments", url: "/appointments", icon: Calendar },
  { title: "Search", url: "/search", icon: Search },
  { title: "Settings", url: "/settings", icon: Settings },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [userType, setUserType] = useState(null);
  const token = Cookies.get("jwt");
  const [data, setData] = useState({});

  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserType(decodedToken.type);
    }
  }, [token]);

  useEffect(() => {
    const token = Cookies.get("jwt");
    fetch(ApiConstants.API_ME, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

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

  const logout = () => {
    Cookies.remove("jwt");
    navigate("/login");
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
              className={`bg-white text-black h-screen shadow-lg ${open ? "w-64" : "w-fit"
                } transition-all`}
            >
              <SidebarHeader className="flex-row items-center justify-between p-3 border-b border-emerald-400">
                <div className={`flex gap-2 flex-row justify-start items-center ${open ? "block" : "hidden"} transition-all`}>
                  <Hospital />
                  <h1
                    className={`text-xl font-bold text-emerald-800`}
                  >
                    HealthPal
                  </h1>
                </div>
                <div>
                  <NavbarToggle open={open} setOpen={setOpen} />
                </div>
              </SidebarHeader>

              <SidebarContent className="flex-1 overflow-y-auto">
                <SidebarGroup>
                  <SidebarGroupLabel className="py-5 text-emerald-700 text-xl">
                    {userType} Dashboard
                  </SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu
                      className={`flex flex-col gap-3 ${open ? "px-3" : "px-0"
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
                                className={`font-medium text-lg ${open ? "block" : "hidden"
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

              {/* <SidebarFooter className="p-4 border-t border-emerald-400 flex flex-col gap-2">
                <div className="flex gap-2 items-center">
                  <User className="text-emerald-600 w-7 h-7" />
                  <div className={`${open ? "flex" : "hidden"} flex-col`}>
                    <h1 className="text-md text-emerald-700 font-semibold">
                      {data.name}
                    </h1>
                    <p className="text-sm text-emerald-600 ">{data.email}</p>
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
              </SidebarFooter> */}
              <SidebarFooter className="my-2 p-2">
                <SidebarMenu>
                  <SidebarMenuItem>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <SidebarMenuButton className="h-auto p-2 hover:bg-gray-50 rounded-lg transition-colors duration-150">
                          <div className="flex items-center gap-2 w-full">
                            <div className="relative">
                              <User2 className="w-8 h-8 text-emerald-600" />
                              <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full"></span>
                            </div>
                            <div className={`${open ? "flex" : "hidden"} flex-col flex-1 min-w-0`}>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-gray-900 truncate">
                                  {data.name}
                                </span>
                                <span className="px-2 py-0.5 text-xs bg-emerald-100 text-emerald-700 rounded-full">
                                  Hospital
                                </span>
                              </div>
                              <span className="text-xs text-gray-500 truncate">
                                {data.email}
                              </span>
                            </div>
                            <ChevronUp className="w-4 h-4 text-gray-400 shrink-0" />
                          </div>
                        </SidebarMenuButton>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent side="top" className="w-[--radix-popper-anchor-width]">
                        <DropdownMenuItem>
                          <button type="button" onClick={logout} className="w-full text-left">Sign out</button>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarFooter>
            </Sidebar>

          </SidebarProvider>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}

export function NavbarToggle({ open, setOpen }) {
  return (
    <button
      type="button"
      onClick={() => setOpen(!open)}
      aria-label="Toggle Sidebar"
      className={`text-emerald-600 
        bg-white/70 backdrop-blur-md 
        hover:bg-white/90 
        transition`}
    >
      {open ? (
        <SidebarCloseIcon className="w-6 h-6" />
      ) : (
        <SidebarOpenIcon />
      )}
    </button>
  );
}
