interface CompanyListProps {
  data: any[];
}

const CompanyList: React.FC<CompanyListProps> = ({ data }) => {
  return (
    <div className="space-y-4">
      {data.map((company, index) => (
        <div key={index} className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-medium">{company.companyName}</h3>
          {/* Add more company details */}
        </div>
      ))}
    </div>
  );
};

export default CompanyList; 