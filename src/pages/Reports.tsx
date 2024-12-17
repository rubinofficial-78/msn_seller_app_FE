import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../redux/store";
import { getReports, getSellerDropdown, getOrderStatusLookup } from "../redux/Action/action";
import { RootState } from "../redux/types";
import CustomTable from "../components/CustomTable";
import { Download, Filter } from "lucide-react";
import * as XLSX from "xlsx";

const headCells = [
  { id: "buyerNpName", key: "buyerNpName", label: "Buyer NP Name" },
  { id: "sellerNpName", key: "sellerNpName", label: "Seller NP Name" },
  { id: "orderCreateDateTime", key: "orderCreateDateTime", label: "Order Create Date & Time", timeFormat: true },
  { id: "networkOrderId", key: "networkOrderId", label: "Network Order Id" },
  { id: "networkTransactionId", key: "networkTransactionId", label: "Network Transaction Id" },
  { id: "sellerNpOrderId", key: "sellerNpOrderId", label: "Seller NP Order Id" },
  { id: "itemId", key: "itemId", label: "Item Id" },
  { id: "qty", key: "qty", label: "Qty" },
  { id: "orderStatus", key: "orderStatus", label: "Order Status" },
  { id: "sellerName", key: "sellerName", label: "Name of Seller" },
  { id: "sellerPincode", key: "sellerPincode", label: "Seller Pincode" },
  { id: "sellerCity", key: "sellerCity", label: "Seller City" },
  { id: "skuName", key: "skuName", label: "SKU Name" },
  { id: "skuCode", key: "skuCode", label: "SKU Code" },
  { id: "orderCategory", key: "orderCategory", label: "Order Category" },
  { id: "readyToShipDateTime", key: "readyToShipDateTime", label: "Ready to Ship At Date & Time", timeFormat: true },
  { id: "shippedDateTime", key: "shippedDateTime", label: "Shipped At Date & Time", timeFormat: true },
  { id: "deliveredDateTime", key: "deliveredDateTime", label: "Delivered At Date & Time", timeFormat: true },
  { id: "logisticsSellerNpName", key: "logisticsSellerNpName", label: "Logistics Seller NP Name" },
  { id: "logisticsNetworkOrderId", key: "logisticsNetworkOrderId", label: "Logistics Network Order Id" },
  { id: "logisticsNetworkTransactionId", key: "logisticsNetworkTransactionId", label: "Logistics Network Transaction Id" },
  { id: "deliveryCity", key: "deliveryCity", label: "Delivery City" },
  { id: "deliveryPincode", key: "deliveryPincode", label: "Delivery Pincode" },
  { id: "cancelledDateTime", key: "cancelledDateTime", label: "Cancelled At Date & Time", timeFormat: true },
  { id: "cancelledBy", key: "cancelledBy", label: "Cancelled By" },
  { id: "cancellationReason", key: "cancellationReason", label: "Cancellation Reason" },
  { id: "totalShippingCharges", key: "totalShippingCharges", label: "Total Shipping Charges" },
  { id: "totalOrderValue", key: "totalOrderValue", label: "Total Order Value" }
];

function Reports() {
  const dispatch = useDispatch<AppDispatch>();
  const reportsState = useSelector((state: RootState) => state.data.reports);
  const sellerDropdownState = useSelector((state: RootState) => state.data.sellerDropdown);
  const orderStatusState = useSelector((state: RootState) => state.data.orderStatusLookup);
  
  const { data: reports, loading, meta } = reportsState || { data: [], loading: false, meta: {} };
  const { data: sellers } = sellerDropdownState || { data: [] };
  const { data: statusOptions } = orderStatusState || { data: [] };

  const [searchParams, setSearchParams] = useState({
    page_no: 1,
    per_page: 10,
    search: "",
    seller_id: "",
    status: "",
    start_date: "",
    end_date: ""
  });

  useEffect(() => {
    dispatch(getReports(searchParams));
    dispatch(getSellerDropdown());
    dispatch(getOrderStatusLookup());
  }, [dispatch, searchParams]);

  // Handle search input change
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(prev => ({
      ...prev,
      search: e.target.value,
      page_no: 1 // Reset to first page on new search
    }));
  };

  // Handle date range changes
  const handleDateChange = (field: 'start_date' | 'end_date', value: string) => {
    setSearchParams(prev => ({
      ...prev,
      [field]: value,
      page_no: 1
    }));
  };

  // Handle status filter change
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams(prev => ({
      ...prev,
      status: e.target.value,
      page_no: 1
    }));
  };

  // Handle seller filter change
  const handleSellerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams(prev => ({
      ...prev,
      seller_id: e.target.value,
      page_no: 1
    }));
  };

  // Clear all filters
  const handleClearFilters = () => {
    setSearchParams({
      page_no: 1,
      per_page: 10,
      search: "",
      seller_id: "",
      status: "",
      start_date: "",
      end_date: ""
    });
  };

  // Handle pagination
  const handlePageChange = (newParams: { page: number, limit: number }) => {
    setSearchParams(prev => ({
      ...prev,
      page_no: newParams.page,
      per_page: newParams.limit
    }));
  };

  const mappedData = reports?.map(item => {
    const fulfillment = item.sales_order_fulfillment || {};
    const salesOrder = fulfillment.sales_order || {};
    const ondcContext = salesOrder.ondc_order_context || {};
    const startLocation = fulfillment.start_location?.location || {};
    const endLocation = fulfillment.end_location?.location || {};
    const createdBy = salesOrder.created_by || {};
    const fulfillmentStatus = fulfillment.fulfillment_status || {};

    return {
      buyerNpName: String(ondcContext.bap_id || ''),
      sellerNpName: String(ondcContext.bpp_id || ''),
      orderCreateDateTime: String(salesOrder.createdAt || ''),
      networkOrderId: String(salesOrder.sales_order_number || ''),
      networkTransactionId: String(ondcContext.transaction_id || ''),
      sellerNpOrderId: String(fulfillment.fulfillment_id || ''),
      itemId: String(item.product_sku_id || ''),
      qty: Number(item.item_quantity || 0),
      orderStatus: String(fulfillmentStatus.display_name || ''),
      sellerName: String(createdBy.name || ''),
      sellerPincode: String(startLocation.address?.area_code || ''),
      sellerCity: String(startLocation.address?.city || ''),
      skuName: String(item.product_name || ''),
      skuCode: String(item.product_sku_id || ''),
      orderCategory: String(item.parent_category || ''),
      readyToShipDateTime: String(fulfillment.ready_to_ship || ''),
      shippedDateTime: String(fulfillment.shipment_created_time || ''),
      deliveredDateTime: String(fulfillment.delivered_time || '-'),
      logisticsSellerNpName: String(fulfillment.logistics_seller_np_name || '-'),
      logisticsNetworkOrderId: String(fulfillment.logistics_network_order_id || '-'),
      logisticsNetworkTransactionId: String(fulfillment.logistics_network_transaction_id || '-'),
      deliveryCity: String(endLocation.address?.city || ''),
      deliveryPincode: String(endLocation.address?.area_code || ''),
      cancelledDateTime: String(fulfillment.cancelled_date || '-'),
      cancelledBy: String(fulfillment.cancelled_by || '-'),
      cancellationReason: String(fulfillment.cancellation_reason?.display_name || '-'),
      totalShippingCharges: Number(fulfillment.shipping_charges || 0),
      totalOrderValue: Number(item.total_amount || 0)
    };
  }) || [];

  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Order Reports</h1>
        <div className="flex gap-3">
          <button
            className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 flex items-center gap-2"
            onClick={() => {/* Toggle filters visibility */}}
          >
            <Filter size={18} />
            Filters
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
            onClick={() => {/* Handle export */}}
          >
            <Download size={18} />
            Export Report
          </button>
        </div>
      </div>

      {/* Search and Filters Section */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search Input */}
          <div>
            <input
              type="text"
              placeholder="Search by Order Id"
              className="w-full border rounded-md px-3 py-2"
              value={searchParams.search}
              onChange={handleSearch}
            />
          </div>

          {/* Seller Dropdown */}
          <div>
            <select
              className="w-full border rounded-md px-3 py-2 bg-white text-gray-700"
              value={searchParams.seller_id}
              onChange={handleSellerChange}
            >
              <option value="" className="text-gray-500">Select Seller</option>
              {sellers.map(seller => (
                <option 
                  key={seller.id} 
                  value={seller.id}
                  className="text-gray-700"
                >
                  {seller.name || 'Unknown Seller'}
                </option>
              ))}
            </select>
          </div>

          {/* Status Dropdown */}
          <div>
            <select
              className="w-full border rounded-md px-3 py-2 bg-white text-gray-700"
              value={searchParams.status}
              onChange={handleStatusChange}
            >
              <option value="" className="text-gray-500">Filter by Status</option>
              {statusOptions.map(status => (
                <option 
                  key={status.id} 
                  value={status.lookup_code}
                  className="text-gray-700"
                >
                  {status.display_name}
                </option>
              ))}
            </select>
          </div>

          {/* Clear Filters Button */}
          <div>
            <button
              onClick={handleClearFilters}
              className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md border border-gray-300"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Date Range */}
        <div className="flex gap-4">
          <input
            type="date"
            className="border rounded-md px-3 py-2"
            value={searchParams.start_date}
            onChange={(e) => handleDateChange('start_date', e.target.value)}
          />
          <input
            type="date"
            className="border rounded-md px-3 py-2"
            value={searchParams.end_date}
            onChange={(e) => handleDateChange('end_date', e.target.value)}
          />
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-lg border border-gray-200">
        <CustomTable
          headCells={headCells}
          data={mappedData}
          meta_data={meta?.pagination}
          setParams={handlePageChange}
          pagination={true}
          loading={loading}
        />
      </div>
    </div>
  );
}

export default Reports;
