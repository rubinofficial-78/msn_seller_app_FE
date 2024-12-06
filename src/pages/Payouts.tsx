import React, { useEffect } from "react";
import { Search, Download } from "lucide-react";
import CustomTable from "../components/CustomTable";
import { useDispatch, useSelector } from "react-redux";
import { getPayouts } from "../redux/Action/action";
import { AppDispatch } from "../redux/store";
import { RootState } from "../redux/types";
import * as XLSX from "xlsx";

const Payouts = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    data: payouts,
    loading,
    error,
    meta,
  } = useSelector((state: RootState) => state.data.payouts);

  // Define table columns
  const tableColumns = [
    {
      id: "sales_order_number",
      key: "sales_order_number",
      label: "Network Order ID",
      minWidth: 180,
    },
    {
      id: "created_by.name",
      key: "created_by.name",
      label: "Collector ID",
      minWidth: 150,
    },
    {
      id: "receiver_id",
      key: "created_by.name",
      label: "Receiver ID",
      minWidth: 150,
    },
    {
      id: "status",
      key: "status.display_name",
      label: "Order State",
      type: "status",
      minWidth: 120,
    },
    {
      id: "createdAt",
      key: "createdAt",
      label: "Order Created Date & Time",
      minWidth: 180,
    },
    {
      id: "shipping_charges",
      key: "total_shipping_charges",
      label: "Shipping Charges",
      type: "amount",
      minWidth: 140,
    },
    {
      id: "packaging_charges",
      key: "total_packaging_charges",
      label: "Packaging Charges",
      type: "amount",
      minWidth: 140,
    },
    {
      id: "convenience_charges",
      key: "convenience_fee",
      label: "Convenience Charges",
      type: "amount",
      minWidth: 140,
    },
    {
      id: "order_amount",
      key: "order_amount",
      label: "Total Order Value",
      type: "amount",
      minWidth: 140,
    },
    {
      id: "order_items",
      key: "sales_order_lines",
      label: "Order Item ID & Price",
      type: "custom",
      minWidth: 180,
      renderCell: (row: any) => (
        <div>
          {row.sales_order_fulfillments?.[0]?.sales_order_lines?.map(
            (line: any, index: number) => (
              <div key={index}>
                {line.product_sku_id} - ₹{line.item_price}
              </div>
            )
          )}
        </div>
      ),
    },
    {
      id: "buyer_finder_fee",
      key: "payment.@ondc/org/buyer_app_finder_fee_amount",
      label: "Buyer Finder Fee (Amount)",
      type: "amount",
      minWidth: 160,
    },
    {
      id: "withholding_amount",
      key: "payment.@ondc/org/withholding_amount",
      label: "Withholding Amount",
      type: "amount",
      minWidth: 160,
    },
    {
      id: "tcs",
      key: "tcs",
      label: "TCS (Withholding Tax under GST Act)",
      type: "amount",
      minWidth: 160,
    },
    {
      id: "tds",
      key: "tds",
      label: "TDS (Withholding Tax under IT Act)",
      type: "amount",
      minWidth: 160,
    },
    {
      id: "deduction_by_collector",
      key: "deduction_by_collector",
      label: "Deduction by Collector",
      type: "amount",
      minWidth: 160,
    },
    {
      id: "settlement_amount",
      key: "settlement_amount",
      label: "Settlement Amount",
      type: "amount",
      minWidth: 140,
    },
    {
      id: "return_window",
      key: "sales_order_fulfillments[0].sales_order_lines[0].return_window",
      label: "Return Window",
      minWidth: 120,
    },
    {
      id: "beneficiary_ifsc",
      key: "payment.@ondc/org/settlement_details[0].settlement_ifsc_code",
      label: "Beneficiary IFSC",
      minWidth: 140,
    },
    {
      id: "settlement_ref",
      key: "payment.@ondc/org/settlement_details[0].settlement_reference",
      label: "Settlement Reference Number",
      minWidth: 200,
    },
    {
      id: "difference_amount",
      key: "difference_amount",
      label: "Difference amount",
      type: "amount",
      minWidth: 140,
    },
    {
      id: "message",
      key: "message",
      label: "Message",
      minWidth: 180,
    },
    {
      id: "updatedAt",
      key: "updatedAt",
      label: "Created Date & Time",
      minWidth: 180,
    },
  ];

  useEffect(() => {
    dispatch(getPayouts({ page_no: 1, per_page: 10 }));
  }, [dispatch]);

  const handlePaginationChange = (params: {
    page_no?: number;
    per_page?: number;
  }) => {
    dispatch(
      getPayouts({
        page_no: params.page_no || 1,
        per_page: params.per_page || 10,
      })
    );
  };

  const handleDownload = () => {
    if (payouts?.length) {
      const worksheet = XLSX.utils.json_to_sheet(payouts);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Payouts");
      XLSX.writeFile(workbook, "payouts.xlsx");
    }
  };

  return (
    <div className="space-y-4">
      {/* Search and Actions */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-xs">
          <Search
            id="search-icon-payouts"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            id="search-input-payouts"
            type="text"
            placeholder="Search Network Order ID"
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={handleDownload}
          className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
          title="Download"
        >
          <Download id="download-icon-payouts" size={20} />
        </button>
      </div>

      {/* Payouts Table */}
      <div className="bg-white rounded-lg shadow">
        <CustomTable
          headCells={tableColumns}
          data={payouts}
          pagination={true}
          meta_data={meta}
          setParams={handlePaginationChange}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default Payouts;
