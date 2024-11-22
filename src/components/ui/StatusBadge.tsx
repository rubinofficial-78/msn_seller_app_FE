interface StatusBadgeProps {
  status: string;
  variant?: 'success' | 'warning' | 'error' | 'info';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, variant = 'info' }) => {
  const variants = {
    success: 'bg-accent-green-light text-accent-green-dark',
    warning: 'bg-accent-orange-light text-accent-orange-dark',
    error: 'bg-accent-red-light text-accent-red-dark',
    info: 'bg-primary-100 text-primary-700',
  };

  return (
    <span className={`px-2 py-1 inline-flex text-xs leading-4 font-semibold rounded-full ${variants[variant]}`}>
      {status}
    </span>
  );
}; 