import React, { useState } from 'react';
import { Bell } from 'lucide-react';

// Sample notification data
const allNotifications = [
  {
    id: '1',
    message: 'New order #12345 received',
    timestamp: '2 minutes ago',
    isRead: false,
    type: 'order'
  },
  {
    id: '2',
    message: 'Payment of ₹1,500 received',
    timestamp: '1 hour ago',
    isRead: true,
    type: 'payment'
  },
  {
    id: '3',
    message: 'System maintenance scheduled for tonight',
    timestamp: '2 hours ago',
    isRead: false,
    type: 'system'
  },
  // Add more notifications as needed
];

const Notifications = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'unread'>('all');
  const [notifications, setNotifications] = useState(allNotifications);

  const unreadNotifications = notifications.filter(n => !n.isRead);
  const displayNotifications = activeTab === 'all' ? notifications : unreadNotifications;

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'order':
        return 'border-blue-600';
      case 'payment':
        return 'border-green-600';
      case 'system':
        return 'border-purple-600';
      case 'alert':
        return 'border-red-600';
      default:
        return 'border-gray-600';
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, isRead: true } : n
    ));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Notifications</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'all' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            All ({notifications.length})
          </button>
          <button
            onClick={() => setActiveTab('unread')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'unread' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            Unread ({unreadNotifications.length})
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        {displayNotifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 border-l-4 ${getNotificationColor(notification.type)} ${
              !notification.isRead ? 'bg-blue-50' : ''
            } hover:bg-gray-50 cursor-pointer`}
            onClick={() => markAsRead(notification.id)}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-900">{notification.message}</p>
                <p className="text-xs text-gray-500 mt-1">{notification.timestamp}</p>
              </div>
              {!notification.isRead && (
                <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications; 