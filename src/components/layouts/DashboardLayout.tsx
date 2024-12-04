import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar';
import { User, Settings, LogOut, Bell } from 'lucide-react';
import NotificationDialog from '../NotificationDialog';
import { colors } from '../../constants/colors';
import { useAuth } from '../../contexts/AuthContext';
import { getUserDetails } from '../../redux/Action/action';
import { AppDispatch } from '../../redux/store';
import { RootState } from '../../redux/types';
import { toast } from 'react-toastify';

// Sample notifications (in real app, this would come from your state management)
const sampleNotifications = [
  {
    id: '1',
    message: 'New order #12345 received',
    timestamp: '2 minutes ago',
    isRead: false,
    type: 'order'
  },
  // Add more notifications
];

const DashboardLayout = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState(sampleNotifications);
  const navigate = useNavigate();
  const { isAdmin } = useAuth();

  const { data: userDetails, loading } = useSelector((state: RootState) => state.data.userDetails);
  
  const storeName = userDetails?.data?.store_details?.[0]?.name || 
                   userDetails?.data?.name || 
                   "Store";

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userId = localStorage.getItem('userid');
        if (!userId) {
          console.error('No user ID found in localStorage');
          return;
        }

        const result = await dispatch(getUserDetails(Number(userId)));
        console.log('User Details Response:', result); // Debug log
      } catch (error: any) {
        console.error('Error fetching user details:', error);
        toast.error(error?.message || 'Failed to fetch user details');
      }
    };

    fetchUserDetails();
  }, [dispatch, navigate]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, isRead: true } : n
    ));
  };

  const handleLogout = () => {
    try {
      // Clear all items from localStorage
      localStorage.clear();
      
      // Close the profile menu
      setIsProfileMenuOpen(false);
      
      // Show success message
      toast.success('Logged out successfully');
      
      // Navigate to login page
      navigate('/login');
    } catch (error) {
      console.error('Error during logout:', error);
      toast.error('Failed to logout properly');
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm z-10 border-b border-primary-100">
          <div className="px-4 py-4 flex justify-between items-center">
            <div>
              {/* Left side of header if needed */}
            </div>
            
            {/* Notification and Profile Menu */}
            <div className="flex items-center gap-4">
              {/* Notification Icon */}
              <div className="relative">
                <button
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

              {/* Profile Menu */}
              <div className="relative">
                <button
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

                {/* Profile Dropdown Menu */}
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50">
                    <button
                      onClick={() => {
                        navigate(isAdmin ? '/dashboard/settings' : '/dashboard/seller-settings');
                        setIsProfileMenuOpen(false);
                      }}
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

        {/* Notification Dialog */}
        <NotificationDialog
          isOpen={isNotificationOpen}
          onClose={() => setIsNotificationOpen(false)}
          notifications={notifications}
          markAsRead={markAsRead}
        />

        {/* Main Content Area */}
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