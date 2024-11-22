import React from 'react';
import { Bell, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Notification {
  id: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  type: 'order' | 'payment' | 'system' | 'alert';
}

interface NotificationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: Notification[];
  markAsRead: (id: string) => void;
}

const NotificationDialog: React.FC<NotificationDialogProps> = ({
  isOpen,
  onClose,
  notifications,
  markAsRead,
}) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const recentNotifications = notifications.slice(0, 5);

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'order':
        return 'text-blue-600';
      case 'payment':
        return 'text-green-600';
      case 'system':
        return 'text-purple-600';
      case 'alert':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-end">
      <div className="bg-white w-96 mt-16 mr-4 rounded-lg shadow-lg">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Notifications</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>
        
        <div className="max-h-[70vh] overflow-y-auto">
          {recentNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${
                !notification.isRead ? 'bg-blue-50' : ''
              }`}
              onClick={() => markAsRead(notification.id)}
            >
              <div className="flex justify-between items-start">
                <p className={`text-sm ${getNotificationColor(notification.type)}`}>
                  {notification.message}
                </p>
                {!notification.isRead && (
                  <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1">{notification.timestamp}</p>
            </div>
          ))}
        </div>

        <div className="p-4 border-t">
          <button
            onClick={() => {
              navigate('/dashboard/notifications');
              onClose();
            }}
            className="w-full text-center text-sm text-blue-600 hover:text-blue-800"
          >
            View All Notifications
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationDialog; 