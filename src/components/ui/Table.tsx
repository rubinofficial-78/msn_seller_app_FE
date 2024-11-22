export const Table = {
  Container: ({ children, className = '' }) => (
    <div className={`bg-white rounded-lg shadow-sm border border-primary-100 ${className}`}>
      {children}
    </div>
  ),
  Header: ({ children }) => (
    <thead className="bg-primary-50">
      <tr>
        {children}
      </tr>
    </thead>
  ),
  HeaderCell: ({ children }) => (
    <th className="px-6 py-3 text-left text-xs font-medium text-secondary-700 uppercase tracking-wider">
      {children}
    </th>
  ),
  Row: ({ children, className = '' }) => (
    <tr className={`hover:bg-primary-50 ${className}`}>
      {children}
    </tr>
  ),
  Cell: ({ children }) => (
    <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-900">
      {children}
    </td>
  ),
}; 