import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar";
import { User, Settings, LogOut, Bell } from "lucide-react";
import NotificationDialog from "../NotificationDialog";
import { colors } from "../../constants/colors";
import { useAuth } from "../../contexts/AuthContext";
import {
  getUserDetails,
  getNotificationCount,
} from "../../redux/Action/action";
import { AppDispatch } from "../../redux/store";
import { RootState } from "../../redux/types";
import { toast } from "react-toastify";

const DashboardLayout = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();
  const { isAdmin } = useAuth();

  const { data: userDetails, loading } = useSelector(
    (state: RootState) => state.data.userDetails
  );

  const storeName = userDetails?.data?.name || "Store";

  // Fetch user details
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userId = localStorage.getItem("userid");
        if (!userId) {
          console.error("No user ID found in localStorage");
          return;
        }

        const result = await dispatch(getUserDetails(Number(userId)));
        console.log("User Details Response:", result);
      } catch (error: any) {
        console.error("Error fetching user details:", error);
        toast.error(error?.message || "Failed to fetch user details");
      }
    };

    fetchUserDetails();
  }, [dispatch, navigate]);

  // Fetch notification count
  useEffect(() => {
    const fetchNotificationCount = async () => {
      try {
        const result = await dispatch(getNotificationCount());
        if (result.meta?.status) {
          setUnreadCount(result.data?.unread_count || 0);
        }
      } catch (error: any) {
        console.error("Error fetching notification count:", error);
        toast.error(error?.message || "Failed to fetch notifications");
      }
    };

    fetchNotificationCount();

    // Set up polling interval to refresh notification count
    const intervalId = setInterval(fetchNotificationCount, 30000); // Poll every 30 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [dispatch]);

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
    // After marking as read, refresh the notification count
    dispatch(getNotificationCount());
  };

  const handleLogout = () => {
    try {
      localStorage.clear();
      setIsProfileMenuOpen(false);
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error);
      toast.error("Failed to logout properly");
    }
  };

  const handleSettingsNavigation = () => {
    const userRole = localStorage.getItem("userRole");
    
    if (userRole === "COMPANY_PARTNER") {
      navigate("/dashboard/company-settings");
    } else if (isAdmin) {
      navigate("/dashboard/settings");
    } else {
      navigate("/dashboard/seller-settings");
    }
    setIsProfileMenuOpen(false);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm z-10 border-b border-primary-100">
          <div className="px-4 py-4 flex justify-between items-center">
            <div>{/* Left side of header if needed */}</div>

            <div className="flex items-center gap-4">
              <div className="relative">
                <button
                  id="notification-icon"
                  onClick={() => setIsNotificationOpen(true)}
                  className="p-2 hover:bg-gray-100 rounded-lg relative"
                >
                  <Bell size={20} />
                  {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>
              </div>

              <div className="relative">
                <button
                  id="profile-menu-button"
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-lg"
                >
                  <span className="text-sm font-medium">
                    {loading ? "Loading..." : storeName}
                  </span>
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <User size={20} className="text-white" />
                  </div>
                </button>

                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50">
                    <button
                      onClick={handleSettingsNavigation}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                    >
                      <Settings size={16} />
                      Settings
                    </button>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        <NotificationDialog
          isOpen={isNotificationOpen}
          onClose={() => setIsNotificationOpen(false)}
          notifications={notifications}
          markAsRead={markAsRead}
        />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="h-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
