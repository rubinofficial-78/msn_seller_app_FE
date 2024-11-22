import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Tab {
  label: string;
  count?: number;
  color?: string;
}

interface ScrollableTabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const ScrollableTabs: React.FC<ScrollableTabsProps> = ({ tabs, activeTab, onTabChange }) => {
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const tabsRef = useRef<HTMLDivElement>(null);

  const checkForArrows = () => {
    if (tabsRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = tabsRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth);
    }
  };

  useEffect(() => {
    checkForArrows();
    window.addEventListener('resize', checkForArrows);
    return () => window.removeEventListener('resize', checkForArrows);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (tabsRef.current) {
      const scrollAmount = 200;
      const newScrollLeft = direction === 'left' 
        ? tabsRef.current.scrollLeft - scrollAmount
        : tabsRef.current.scrollLeft + scrollAmount;
      
      tabsRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });

      setTimeout(checkForArrows, 100);
    }
  };

  return (
    <div className="relative flex items-center">
      {showLeftArrow && (
        <button 
          onClick={() => scroll('left')}
          className="absolute left-0 z-10 p-2 bg-white shadow-md rounded-full"
        >
          <ChevronLeft size={20} />
        </button>
      )}

      <div 
        ref={tabsRef}
        className="overflow-x-auto scrollbar-hide flex space-x-8 px-8"
        onScroll={checkForArrows}
      >
        {tabs.map((tab) => (
          <button
            key={tab.label}
            onClick={() => onTabChange(tab.label)}
            className={`
              whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors
              ${activeTab === tab.label
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }
            `}
          >
            {tab.label}
            {tab.count !== undefined && (
              <span className={`ml-2 ${tab.color || 'text-gray-600'}`}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {showRightArrow && (
        <button 
          onClick={() => scroll('right')}
          className="absolute right-0 z-10 p-2 bg-white shadow-md rounded-full"
        >
          <ChevronRight size={20} />
        </button>
      )}
    </div>
  );
};

export default ScrollableTabs; 