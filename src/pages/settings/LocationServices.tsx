import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ArrowLeft,
  Eye,
  Edit,
  LayoutGrid,
  List,
  ToggleLeft,
  ToggleRight,
  X,
} from "lucide-react";
import CustomTable, { Column } from "../../components/CustomTable";
import AddForm from "../../components/AddForm";
import {
  getStoreLocations,
  updateStoreLocationStatus,
  getLocationTypeLookup,
  createStoreLocation,
  getWorkingDaysLookup,
  updateWorkingHours,
  getCategories,
  getSubCategories,
  createServiceability,
  getServiceability,
  updateServiceability,
  getAllServiceability,
} from "../../redux/Action/action";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { Slider } from "antd";
import { toast } from "react-hot-toast";

type TabType = "stores" | "shipping";
type ViewType = "table" | "grid";

interface Region {
  zone: string;
  states: { name: string; checked: boolean }[];
}

interface ShippingDetail {
  regions: string[];
  shippingType: string;
  category: string;
  deliveryType: string;
  preferences: string;
  transitTime: string;
  shippingFee: string;
}

interface LocationType {
  id: number;
  display_name: string;
  lookup_code: string;
  is_active: boolean;
}

interface CreateServiceabilityPayload {
  location_id: number;
  shipping_radius: number | null;
  category: string;
  sub_categories: string[];
  pan_india?: boolean;
  zone?: boolean;
}

// Add this interface for the form data
interface StoreFormData {
  // Step 1: Store Details
  storeName: string;
  contactPersonName: string;
  phoneNumber: string;
  storeType: string;
  gstNumber: string;
  email: string;
  address: string;
  building: string;
  locality: string;
  city: string;
  state: string;
  postalCode: string;

  // Working Hours
  isSameTimings: boolean;
  storeTimings: {
    [key: string]: {
      startTime: string;
      endTime: string;
    }[];
  };
  storePickupTimings: {
    [key: string]: {
      startTime: string;
      endTime: string;
    }[];
  };

  // Holidays
  holidays: string[];

  // Temporary Close
  isTemporarilyClosed: boolean;
}

// Add a SectionContainer component for consistent section styling
const SectionContainer = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={`bg-white rounded-lg p-6 shadow-sm ${className}`}>
    {children}
  </div>
);
const shippingData = [
  {
    id: 1,
    name: "Shipping",
  },
];

// Add the form fields configuration
const storeDetailsFields = [
  {
    type: "section",
    key: "storeDetailsSection",
    label: "Store Details",
    description:
      "Add a new location that you can serve and provide serviceability.",
  },
  {
    type: "text",
    key: "storeName",
    label: "Store Name",
    required: true,
    placeholder: "Store Name",
  },
  {
    type: "text",
    key: "contactPersonName",
    label: "Contact Person Name",
    required: true,
    placeholder: "Contact Person Name",
  },
  {
    type: "text",
    key: "phoneNumber",
    label: "Phone Number",
    required: true,
    placeholder: "Phone Number",
  },
  {
    type: "select",
    key: "storeType",
    label: "Store Type",
    required: true,
    placeholder: "Store Type",
    options: [],
  },
];

// Add this interface for the time range
interface TimeRange {
  startTime: string;
  endTime: string;
}

// Add this interface for the day settings
interface DaySettings {
  selected: boolean;
  timeRanges: TimeRange[];
}

const WorkingHoursForm = ({
  handleInputChange,
  locationId,
}: {
  handleInputChange: (key: string, value: any) => void;
  locationId: number;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isSameTimings, setIsSameTimings] = useState(false);
  const [dayRange, setDayRange] = useState<[number, number]>([1, 7]);
  const [workingDays, setWorkingDays] = useState<
    Array<{
      id: number;
      display_name: string;
      lookup_code: string;
    }>
  >([]);
  const [storeTime, setStoreTime] = useState({
    startTime: "",
    endTime: "",
  });
  const [pickupTime, setPickupTime] = useState({
    startTime: "",
    endTime: "",
  });

  // Fetch working days on component mount
  useEffect(() => {
    const fetchWorkingDays = async () => {
      try {
        const response = await dispatch(getWorkingDaysLookup());
        if (response?.data) {
          setWorkingDays(response.data);
        }
      } catch (error) {
        console.error("Error fetching working days:", error);
        toast.error("Failed to fetch working days");
      }
    };

    fetchWorkingDays();
  }, [dispatch]);

  // Create marks from API response
  const marks = workingDays.reduce(
    (acc, day) => ({
      ...acc,
      [day.lookup_code]: day.display_name,
    }),
    {}
  );

  const handleStoreTimeChange = (
    type: "startTime" | "endTime",
    value: string
  ) => {
    setStoreTime((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const handlePickupTimeChange = (
    type: "startTime" | "endTime",
    value: string
  ) => {
    setPickupTime((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const dayFrom = workingDays.find(
        (day) => day.lookup_code === dayRange[0].toString()
      );
      const dayTo = workingDays.find(
        (day) => day.lookup_code === dayRange[1].toString()
      );

      if (!dayFrom || !dayTo) {
        toast.error("Invalid day range selected");
        return;
      }

      // Format the date strings
      const today = new Date();
      const formattedStartTime = `${today.getFullYear()}-12-08T${
        storeTime.startTime
      }:00.000+05:30`;
      const formattedEndTime = `${today.getFullYear()}-12-09T${
        storeTime.endTime
      }:00.000+05:30`;

      const payload = {
        is_same_timings: isSameTimings,
        all_timings: {
          day_from_id: dayFrom.id,
          day_from: {
            id: dayFrom.id,
            lookup_code: dayFrom.lookup_code,
            display_name: dayFrom.display_name,
          },
          day_to_id: dayTo.id,
          day_to: {
            id: dayTo.id,
            lookup_code: dayTo.lookup_code,
            display_name: dayTo.display_name,
          },
          timings_arr: [
            {
              opening_time: formattedStartTime,
              closing_time: formattedEndTime,
            },
          ],
        },
      };

      const response = await dispatch(updateWorkingHours(locationId, payload));
      if (response?.meta?.status) {
        toast.success("Working hours updated successfully");
      }
    } catch (error) {
      toast.error("Failed to update working hours");
      console.error("Error updating working hours:", error);
    }
  };

  return (
    <SectionContainer>
      <div className="space-y-8">
        {/* Store Timings */}
        <h1 className="text-2xl font-semibold">Working Hours</h1>
        <div className="space-y-6">
          <h3 className="text-lg font-medium text-gray-900">Store Timings</h3>
          <div className="space-y-6">
            <div className="w-full">
              <div className="mx-auto w-[75vw] sm:w-[45vw]">
                {workingDays.length > 0 && (
                  <Slider
                    range
                    marks={marks}
                    min={1}
                    max={7}
                    step={1}
                    value={dayRange}
                    onChange={(val) => {
                      setDayRange(val as [number, number]);
                    }}
                  />
                )}
              </div>
            </div>
            <div className="flex items-center space-x-4 mt-4">
              <span className="text-sm font-medium text-gray-700">
                Store Hours:
              </span>
              <div className="flex items-center space-x-2 flex-1">
                <input
                  type="time"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                  value={storeTime.startTime}
                  onChange={(e) =>
                    handleStoreTimeChange("startTime", e.target.value)
                  }
                />
                <span className="text-gray-500">to</span>
                <input
                  type="time"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                  value={storeTime.endTime}
                  onChange={(e) =>
                    handleStoreTimeChange("endTime", e.target.value)
                  }
                />
              </div>
            </div>
          </div>
        </div>

        {/* Store Pickup Timings */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">
              Store Pickup Timings
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">
                Same as store timings
              </span>
              <div className="w-[100px]">
                <Slider
                  value={isSameTimings ? 1 : 0}
                  onChange={(value) => {
                    setIsSameTimings(value === 1);
                    if (value === 1) {
                      setPickupTime(storeTime);
                    }
                  }}
                  min={0}
                  max={1}
                  step={1}
                  tooltip={{ formatter: null }}
                />
              </div>
            </div>
          </div>

          {!isSameTimings && (
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-700">
                Pickup Hours:
              </span>
              <div className="flex items-center space-x-2 flex-1">
                <input
                  type="time"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                  value={pickupTime.startTime}
                  onChange={(e) =>
                    handlePickupTimeChange("startTime", e.target.value)
                  }
                />
                <span className="text-gray-500">to</span>
                <input
                  type="time"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                  value={pickupTime.endTime}
                  onChange={(e) =>
                    handlePickupTimeChange("endTime", e.target.value)
                  }
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          SAVE
        </button>
      </div>
    </SectionContainer>
  );
};

const holidaysFields = [
  {
    type: "section",
    key: "holidaysSection",
    label: "Holidays",
    description: "Tell us your holidays",
  },
  {
    type: "date",
    key: "holidays",
    label: "Select Holidays",
    placeholder: "Select Dates",
    multiple: true,
  },
];

const temporaryCloseFields = [
  {
    type: "section",
    key: "temporaryCloseSection",
    label: "Temporary Close",
    description: "Tell us if you want to temporarily Close the Store",
  },
  {
    type: "switch",
    key: "isTemporarilyClosed",
    label: "Close Store temporarily",
  },
];

// Add the ActionButtons component definition before GridView
const ActionButtons = ({
  status,
  onView,
}: {
  status: string;
  onView: () => void;
}) => {
  const [isActive, setIsActive] = useState(status === "Active");

  const handleToggle = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="flex gap-2">
      <button
        className="p-1 text-gray-600 hover:text-gray-800"
        title="View Details"
        onClick={onView}
      >
        <Eye size={18} />
      </button>
      <button
        className="p-1 text-gray-600 hover:text-gray-800"
        title="Edit"
        onClick={() => console.log("Edit clicked")}
      >
        <Edit size={18} />
      </button>
      <button
        className={`p-1 ${
          isActive
            ? "text-green-600 hover:text-green-800"
            : "text-gray-400 hover:text-gray-600"
        }`}
        title={isActive ? "Deactivate" : "Activate"}
        onClick={handleToggle}
      >
        {isActive ? <ToggleRight size={18} /> : <ToggleLeft size={18} />}
      </button>
    </div>
  );
};

// Update the serviceabilityColumns to use navigate from props
const ServiceabilityTable = () => {
  const navigate = useNavigate();

  const columns: Column[] = [
    {
      id: "domainServed",
      key: "domainServed",
      label: "Domain Served",
    },
    {
      id: "locationName",
      key: "locationName",
      label: "Location Name",
    },
    {
      id: "shippingRadius",
      key: "shippingRadius",
      label: "Shipping radius",
    },
    {
      id: "actions",
      key: "actions",
      label: "Action",
      type: "actions",
      buttons: [
        {
          label: "View",
          icon: "eye",
          onClick: (row: any) => {
            navigate(
              `/dashboard/seller-settings/location-services/shipping-details/${row.id}`
            );
          },
        },
        {
          label: "Edit",
          icon: "edit",
          onClick: (row: any) => {
            console.log("Edit", row);
          },
        },
      ],
    },
  ];

  return (
    <CustomTable
      headCells={columns}
      data={sampleServiceabilityData}
      pagination={false}
    />
  );
};

// Update the sample data to match the columns
const sampleServiceabilityData = [
  {
    id: 1,
    domainServed: "Beauty & Personal Care",
    locationName: "Sample Store Name",
    shippingRadius: "Pan India",
    status: "Active",
  },
  {
    id: 2,
    domainServed: "Electronics",
    locationName: "Electronics Store",
    shippingRadius: "Within City",
    status: "Active",
  },
];

// Add shipping columns definition
const shippingColumns: Column[] = [
  {
    id: "storeName",
    key: "storeName",
    label: "Store Name",
  },
  {
    id: "address",
    key: "address",
    label: "Address",
  },
  {
    id: "createdDate",
    key: "createdDate",
    label: "Created Date & Time",
  },
  {
    id: "shippingDistance",
    key: "shippingDistance",
    label: "Shipping Distance",
  },
  {
    id: "domain",
    key: "domain",
    label: "Domain",
  },
  {
    id: "city",
    key: "city",
    label: "City",
  },
  {
    id: "pincode",
    key: "pincode",
    label: "Pincode",
  },
  {
    id: "status",
    key: "status",
    label: "Status",
    type: "status",
  },
  {
    id: "actions",
    key: "actions",
    label: "Actions",
    type: "actions",
    actions: [
      {
        label: "View",
        icon: "eye",
        onClick: (row: any) => console.log("View", row),
      },       
      {
        label: "Toggle Status",
        icon: "toggle",
        onClick: (row: any) => console.log("Toggle status", row),
      },
    ],
  },
];

const GridView = ({ data }: { data: any[] }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {data.map((item) => (
      <div
        key={item.id}
        className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
      >
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            {item.storeName}
          </h3>
          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
            {item.status}
          </span>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-gray-600">
            <span className="font-medium">Address:</span> {item.address}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Domain:</span> {item.domain}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Shipping:</span>{" "}
            {item.shippingDistance}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Location:</span> {item.city},{" "}
            {item.pincode}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Created:</span> {item.createdDate}
          </p>
        </div>
        <div className="mt-4 flex justify-end">
          <ActionButtons
            status={item.status}
            onView={() =>
              navigate(
                `/dashboard/seller-settings/location-services/shipping-details/${item.id}`
              )
            }
          />
        </div>
      </div>
    ))}
  </div>
);

// Add this type for step management
type FormStep = 1 | 2;

const Steps = () => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between relative">
        <div className="flex items-center text-blue-600">
          <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center mr-2">
            1
          </div>
          <span className="font-medium">Store Details</span>
        </div>
        <div className="flex items-center text-gray-400">
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-2">
            2
          </div>
          <span className="font-medium">Serviceability Details</span>
        </div>
        {/* Progress Line */}
        <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200 -z-10">
          <div
            className="h-full bg-blue-600 transition-all duration-300"
            style={{ width: "0%" }}
          />
        </div>
      </div>
    </div>
  );
};

const StoreDetailsStep = ({
  handleInputChange,
  locationId,
  onNext,
  onStoreCreated,
}: {
  handleInputChange: (key: string, value: any) => void;
  locationId: number;
  onNext: () => void;
  onStoreCreated: (locationId: number) => void;
}) => {
  return (
    <div className="space-y-6">
      <StoreDetailsForm
        handleInputChange={handleInputChange}
        onStoreCreated={onStoreCreated}
      />
      <WorkingHoursForm
        handleInputChange={handleInputChange}
        locationId={locationId}
      />
      <HolidaysForm
        handleInputChange={handleInputChange}
        locationId={locationId}
      />
      <TemporaryCloseForm
        handleInputChange={handleInputChange}
        locationId={locationId}
      />

      <div className="flex justify-end gap-4 mt-8">
        <button
          onClick={onNext}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Next
        </button>
      </div>
    </div>
  );
};

const ServiceabilityStep = ({
  handleInputChange,
  onBack,
  locationId,
}: {
  handleInputChange: (key: string, value: any) => void;
  onBack: () => void;
  locationId: number | null;
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { data: categories, loading: categoriesLoading } = useSelector(
    (state: RootState) => state.data.productCategories
  );
  const [selectedDomain, setSelectedDomain] = useState<number | null>(null);
  const [subCategories, setSubCategories] = useState<any[]>([]);
  const [loadingSubCategories, setLoadingSubCategories] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedShippingDistance, setSelectedShippingDistance] = useState("");
  const [radiusDistance, setRadiusDistance] = useState("");
  const [serviceabilityData, setServiceabilityData] = useState<any[]>([]);
  const [loadingServiceability, setLoadingServiceability] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingServiceability, setEditingServiceability] = useState<any>(null);
  const [selectedDomainName, setSelectedDomainName] = useState<string>("");
  const [selectedSubCategoryNames, setSelectedSubCategoryNames] = useState<
    string[]
  >([]);

  // Fetch categories when component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        await dispatch(getCategories());
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("Failed to fetch categories");
      }
    };

    fetchCategories();
  }, [dispatch]);

  // Fetch serviceability data when component mounts
  useEffect(() => {
    const fetchServiceability = async () => {
      setLoadingServiceability(true);
      try {
        console.log(
          "Fetching serviceability with locationId (before API call):",
          locationId
        );
        if (!locationId) {
          console.warn(
            "No locationId available for getServiceability API call"
          );
          return;
        }
        const response = await dispatch(getServiceability(locationId));
        console.log(
          "Fetching serviceability with locationId (after API call):",
          locationId
        );
        console.log("Serviceability API response:", response);

        if (response?.data) {
          const transformedData = response.data.map((item: any) => ({
            domainServed: item.category,
            locationName: item.location?.name || "",
            shippingRadius: item.pan_india
              ? "Pan India"
              : item.zone
              ? "Zone"
              : item.shipping_radius
              ? `${item.shipping_radius} KM`
              : "-",
          }));
          setServiceabilityData(transformedData);
        }
      } catch (error) {
        console.error("Error fetching serviceability:", error);
        toast.error("Failed to fetch serviceability data");
      } finally {
        setLoadingServiceability(false);
      }
    };

    fetchServiceability();
  }, [dispatch, locationId]);

  const handleDomainChange = async (value: string) => {
    const domainId = parseInt(value);
    setSelectedDomain(domainId);

    // Find and store the domain name
    const selectedCategory = categories?.find(
      (cat) => cat.id.toString() === value
    );
    if (selectedCategory) {
      setSelectedDomainName(selectedCategory.name);
    }

    handleInputChange("domain", value);

    if (domainId) {
      setLoadingSubCategories(true);
      try {
        const response = await dispatch(getSubCategories(domainId));
        if (response?.data) {
          setSubCategories(response.data);
          setSelectedCategories([]);
          setSelectedSubCategoryNames([]);
        }
      } catch (error) {
        console.error("Error fetching subcategories:", error);
        toast.error("Failed to fetch subcategories");
      } finally {
        setLoadingSubCategories(false);
      }
    } else {
      setSubCategories([]);
      setSelectedCategories([]);
      setSelectedSubCategoryNames([]);
    }
  };

  const handleCategoryChange = (values: string[]) => {
    setSelectedCategories(values);

    // Store the names of selected subcategories
    const names = values
      .map((value) => {
        const subCategory = subCategories.find(
          (cat) => cat.id.toString() === value
        );
        return subCategory?.name || "";
      })
      .filter((name) => name !== "");

    setSelectedSubCategoryNames(names);
    handleInputChange("categories", values);
  };

  const handleShippingDistanceChange = (value: string) => {
    setSelectedShippingDistance(value);
    handleInputChange("shippingDistance", value);
  };

  const handleCreateStoreLocation = async (data: any) => {
    try {
      const response = await dispatch(createStoreLocation(data));
      if (response?.meta?.status && response?.data?.id) {
        toast.success("Store location created successfully");
        // Store the location ID
        setLocationId(response.data.id);
      }
    } catch (error) {
      console.error("Error creating store location:", error);
      toast.error("Failed to create store location");
    }
  };

  const handleSaveAndNext = async () => {
    try {
      if (
        !selectedDomain ||
        selectedCategories.length === 0 ||
        !selectedShippingDistance
      ) {
        toast.error("Please fill all required fields");
        return;
      }

      if (!locationId) {
        toast.error("Please create store location first");
        onBack(); // Go back to store creation step
        return;
      }

      console.log("Creating serviceability with locationId:", locationId);

      let payload: CreateServiceabilityPayload = {
        location_id: locationId,
        category: selectedDomainName,
        sub_categories: selectedSubCategoryNames,
        shipping_radius: null,
      };

      console.log("Serviceability payload:", payload);

      // Add shipping type specific fields
      switch (selectedShippingDistance) {
        case "Pan India":
          payload.pan_india = true;
          break;
        case "Zone":
          payload.zone = true;
          break;
        case "Radius":
          if (!radiusDistance) {
            toast.error("Please enter radius distance");
            return;
          }
          payload.shipping_radius = parseInt(radiusDistance);
          break;
        default:
          toast.error("Please select shipping distance type");
          return;
      }

      console.log("Final payload with shipping type:", payload);

      const response = await dispatch(createServiceability(payload));
      console.log("Serviceability creation response:", response);

      if (response?.meta?.status && response?.data?.id) {
        toast.success("Serviceability created successfully");
        navigate(
          `/dashboard/seller-settings/location-services/shipping-details/${response.data.id}`
        );
      } else {
        toast.error("Failed to get serviceability ID");
      }
    } catch (error) {
      console.error("Error creating serviceability:", error);
      toast.error("Failed to create serviceability");
    }
  };

  const handleEditClick = async (row: any) => {
    try {
      // Get the original serviceability data from the API response
      const response = await dispatch(getServiceability(locationId));
      const serviceabilityItem = response.data.find(
        (item: any) => item.category === row.domainServed
      );

      if (serviceabilityItem) {
        // Set domain
        setSelectedDomain(parseInt(serviceabilityItem.category));

        // Fetch and set subcategories for the selected domain
        const subCategoriesResponse = await dispatch(
          getSubCategories(parseInt(serviceabilityItem.category))
        );
        if (subCategoriesResponse?.data) {
          setSubCategories(subCategoriesResponse.data);
          // Set selected subcategories
          setSelectedCategories(serviceabilityItem.sub_categories || []);
        }

        // Set shipping distance based on the type
        let shippingType = "";
        if (serviceabilityItem.pan_india) {
          shippingType = "Pan India";
        } else if (serviceabilityItem.zone) {
          shippingType = "Zone";
        } else if (serviceabilityItem.shipping_radius) {
          shippingType = "Radius";
          setRadiusDistance(serviceabilityItem.shipping_radius.toString());
        }
        setSelectedShippingDistance(shippingType);

        // Store the original item ID for updating
        setEditingServiceability({
          ...serviceabilityItem,
          id: serviceabilityItem.id,
        });
      }

      setShowEditModal(true);
    } catch (error) {
      console.error("Error fetching serviceability details:", error);
      toast.error("Failed to load serviceability details");
    }
  };

  // Columns for the serviceability table
  const serviceabilityColumns: Column[] = [
    {
      id: "domainServed",
      key: "domainServed",
      label: "Domain Served",
    },
    {
      id: "locationName",
      key: "locationName",
      label: "Location Name",
    },
    {
      id: "shippingRadius",
      key: "shippingRadius",
      label: "Shipping radius",
    },
    {
      id: "actions",
      key: "actions",
      label: "Action",
      type: "actions",
      actions: [
        {
          label: "Edit",
          icon: "edit",
          onClick: handleEditClick,
        },
      ],
    },
  ];

  return (
    <div className="space-y-8">
      <SectionContainer>
        <div className="space-y-6">
          <h2 className="text-lg font-medium text-gray-900">
            Serviceability Details
          </h2>
          <p className="text-sm text-gray-500">
            Add a new location that you can serve and provide serviceability.
          </p>

          <AddForm
            data={[
              {
                type: "select",
                key: "domain",
                label: "Domain",
                required: true,
                placeholder: "Select Domain",
                value: selectedDomain?.toString() || "",
                options: categoriesLoading
                  ? []
                  : (categories || []).map((category: any) => ({
                      label: category.name,
                      value: category.id.toString(),
                    })),
                onChange: handleDomainChange,
                handleSelectonChange: handleDomainChange,
              },
              {
                type: "select",
                key: "categories",
                label: "Categories",
                required: true,
                placeholder: "Select Categories",
                multiple: true,
                value: selectedCategories,
                options: loadingSubCategories
                  ? []
                  : subCategories.map((subCat: any) => ({
                      label: subCat.name,
                      value: subCat.id.toString(),
                    })),
                onChange: handleCategoryChange,
              },
              {
                type: "select",
                key: "shippingDistance",
                label: "Shipping Distance",
                required: true,
                placeholder: "Shipping Distance",
                value: selectedShippingDistance,
                options: [
                  {
                    label: "Pan India",
                    value: "Pan India",
                    lookup_code: "PAN_INDIA",
                  },
                  { label: "Zone", value: "Zone", lookup_code: "ZONE" },
                  { label: "Radius", value: "Radius", lookup_code: "RADIUS" },
                ],
                onChange: handleShippingDistanceChange,
              },
              ...(selectedShippingDistance === "Radius"
                ? [
                    {
                      type: "text",
                      key: "radiusDistance",
                      label: "Radius Distance (in KM)",
                      required: true,
                      placeholder: "Enter radius in kilometers",
                      value: radiusDistance,
                      onChange: (value: string) => {
                        // Allow only numbers
                        const numericValue = value.replace(/[^0-9]/g, "");
                        setRadiusDistance(numericValue);
                        handleInputChange("radiusDistance", numericValue);
                      },
                    },
                  ]
                : []),
            ]}
            handleInputonChange={(key, value) => {
              if (key === "shippingDistance") {
                handleShippingDistanceChange(value);
              } else if (key === "radiusDistance") {
                const numericValue = value.replace(/[^0-9]/g, "");
                setRadiusDistance(numericValue);
                handleInputChange(key, numericValue);
              }
            }}
            handleSelectonChange={(key, value) => {
              console.log("Select onChange:", key, value);
              if (key === "domain") {
                handleDomainChange(value);
              } else if (key === "categories") {
                handleCategoryChange(value);
              } else if (key === "shippingDistance") {
                handleShippingDistanceChange(value);
              }
            }}
          />

          <div className="flex justify-end">
            <button
              onClick={handleSaveAndNext}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              disabled={
                !selectedDomain ||
                selectedCategories.length === 0 ||
                !selectedShippingDistance
              }
            >
              SAVE & NEXT
            </button>
          </div>
        </div>
      </SectionContainer>

      {/* Added Serviceability Section */}
      <SectionContainer>
        <div className="space-y-4">
          <h2 className="text-lg font-medium text-gray-900">
            Added Serviceability
          </h2>
          <p className="text-sm text-gray-500">
            List of all the existing serviceable area
          </p>

          {loadingServiceability ? (
            <div className="text-center py-4">Loading...</div>
          ) : (
            <CustomTable
              headCells={serviceabilityColumns}
              data={serviceabilityData}
              pagination={false}
            />
          )}
        </div>
      </SectionContainer>

      {/* Navigation Buttons */}
      <div className="flex justify-between gap-4 mt-8">
        <button
          onClick={onBack}
          className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Back
        </button>
        <button
          onClick={handleSaveAndNext}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          disabled={
            !selectedDomain ||
            selectedCategories.length === 0 ||
            !selectedShippingDistance
          }
        >
          SAVE & NEXT
        </button>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[500px] max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Edit Serviceability</h2>
              <button
                onClick={() => {
                  setShowEditModal(false);
                  // Reset states when closing
                  setSelectedDomain(null);
                  setSelectedCategories([]);
                  setSelectedShippingDistance("");
                  setRadiusDistance("");
                }}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X size={20} />
              </button>
            </div>

            <AddForm
              data={[
                {
                  type: "select",
                  key: "domain",
                  label: "Domain",
                  required: true,
                  placeholder: "Select Domain",
                  value: selectedDomain?.toString() || "",
                  options: categoriesLoading
                    ? []
                    : (categories || []).map((category: any) => ({
                        label: category.name,
                        value: category.id.toString(),
                      })),
                  onChange: handleDomainChange,
                },
                {
                  type: "select",
                  key: "categories",
                  label: "Categories",
                  required: true,
                  placeholder: "Select Categories",
                  multiple: true,
                  value: selectedCategories,
                  options: loadingSubCategories
                    ? []
                    : subCategories.map((subCat: any) => ({
                        label: subCat.name,
                        value: subCat.id.toString(),
                      })),
                  onChange: handleCategoryChange,
                  disabled: !selectedDomain,
                },
                {
                  type: "select",
                  key: "shippingDistance",
                  label: "Shipping Distance",
                  required: true,
                  placeholder: "Shipping Distance",
                  value: selectedShippingDistance,
                  options: [
                    {
                      label: "Pan India",
                      value: "Pan India",
                      lookup_code: "PAN_INDIA",
                    },
                    { label: "Zone", value: "Zone", lookup_code: "ZONE" },
                    { label: "Radius", value: "Radius", lookup_code: "RADIUS" },
                  ],
                  onChange: handleShippingDistanceChange,
                },
                ...(selectedShippingDistance === "Radius"
                  ? [
                      {
                        type: "text",
                        key: "radiusDistance",
                        label: "Radius Distance (in KM)",
                        required: true,
                        placeholder: "Enter radius in kilometers",
                        value: radiusDistance,
                        onChange: (value: string) => {
                          const numericValue = value.replace(/[^0-9]/g, "");
                          setRadiusDistance(numericValue);
                        },
                      },
                    ]
                  : []),
              ]}
              handleInputonChange={(key, value) => {
                if (key === "radiusDistance") {
                  const numericValue = value.replace(/[^0-9]/g, "");
                  setRadiusDistance(numericValue);
                }
              }}
              handleSelectonChange={(key, value) => {
                if (key === "domain") {
                  handleDomainChange(value);
                } else if (key === "categories") {
                  handleCategoryChange(value);
                } else if (key === "shippingDistance") {
                  handleShippingDistanceChange(value);
                }
              }}
            />

            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => {
                  setShowEditModal(false);
                  // Reset states when closing
                  setSelectedDomain(null);
                  setSelectedCategories([]);
                  setSelectedShippingDistance("");
                  setRadiusDistance("");
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveAndNext}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const LocationServices = () => {
  // 1. All hooks at the top
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<TabType>("stores");
  const [viewType, setViewType] = useState<ViewType>("table");
  const [showShippingDetails, setShowShippingDetails] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<StoreFormData>({
    storeName: "",
    contactPersonName: "",
    phoneNumber: "",
    storeType: "",
    gstNumber: "",
    email: "",
    address: "",
    building: "",
    locality: "",
    city: "",
    state: "",
    postalCode: "",
    isSameTimings: false,
    storeTimings: {},
    storePickupTimings: {},
    holidays: [],
    isTemporarilyClosed: false,
  });
  const [createdLocationId, setCreatedLocationId] = useState<number | null>(
    null
  );

  // 2. All handlers
  const handleInputChange = (key: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    navigate("/dashboard/seller-settings/location-services");
  };

  const handleStoreCreated = (locationId: number) => {
    console.log("Store created with ID:", locationId);
    setCreatedLocationId(locationId);
  };

  // 3. Component render logic
  const renderCreateForm = () => {
    const handleInputChange = (key: string, value: any) => {
      setFormData((prev) => ({
        ...prev,
        [key]: value,
      }));
    };

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() =>
              navigate("/dashboard/seller-settings/location-services")
            }
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold">Create New Store</h1>
        </div>

        <Steps />

        {currentStep === 1 ? (
          <StoreDetailsStep
            handleInputChange={handleInputChange}
            locationId={createdLocationId || 0}
            onNext={() => setCurrentStep(2)}
            onStoreCreated={handleStoreCreated}
          />
        ) : (
          <ServiceabilityStep
            handleInputChange={handleInputChange}
            onBack={() => setCurrentStep(1)}
            locationId={createdLocationId}
          />
        )}
      </div>
    );
  };

  const renderMainView = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold">Locations & Serviceability</h1>
      </div>

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab("stores")}
            className={`py-2 px-1 ${
              activeTab === "stores"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            } font-medium`}
          >
            Your Stores
          </button>
          <button
            onClick={() => setActiveTab("shipping")}
            className={`py-2 px-1 ${
              activeTab === "shipping"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            } font-medium`}
          >
            Shipping services
          </button>
        </nav>
      </div>

      <div className="space-y-6">
        {activeTab === "stores" ? (
          <StoresTab navigate={navigate} />
        ) : (
          <ShippingTab viewType={viewType} setViewType={setViewType} />
        )}
      </div>
    </div>
  );

  // 4. Final render
  return location.pathname.includes("create-store")
    ? renderCreateForm()
    : renderMainView();
};

// 5. Separate components
const StoresTab = ({ navigate }: { navigate: any }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [storeData, setStoreData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Define storeColumns here to have access to dispatch
  const storeColumns: Column[] = [
    {
      id: "storeName",
      key: "storeName",
      label: "Store Name",
    },
    {
      id: "address",
      key: "address",
      label: "Address",
    },
    {
      id: "createdDate",
      key: "createdDate",
      label: "Created Date & Time",
    },
    {
      id: "city",
      key: "city",
      label: "City",
    },
    {
      id: "pincode",
      key: "pincode",
      label: "Pincode",
    },
    {
      id: "status",
      key: "status",
      label: "Status",
      type: "status",
    },
    {
      id: "actions",
      key: "actions",
      label: "Actions",
      type: "actions",
      actions: [
        {
          label: "Edit",
          icon: "edit",
          onClick: (row: any) => console.log("Edit", row),
        },
        {
          label: "Toggle Status",
          icon: "toggle",
          onClick: async (row: any) => {
            try {
              await dispatch(
                updateStoreLocationStatus(row.id, row.status !== "Active")
              );
              // Refresh the data after toggle
              const response = await dispatch(
                getStoreLocations({
                  page_no: 1,
                  per_page: 10,
                })
              );

              if (response?.data) {
                const transformedData = response.data.map((location: any) => ({
                  id: location.id,
                  storeName: location.name,
                  address: location.address?.building
                    ? `${location.address.building}, ${
                        location.address.locality || ""
                      }`
                    : "-",
                  createdDate: new Date(location.createdAt).toLocaleString(
                    "en-IN",
                    {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    }
                  ),
                  city: location.address?.city || "-",
                  pincode: location.address?.area_code || "-",
                  status: location.is_active ? "Active" : "Inactive",
                }));
                setStoreData(transformedData);
              }
            } catch (error) {
              console.error("Failed to toggle store status:", error);
            }
          },
        },
      ],
    },
  ];

  useEffect(() => {
    const fetchStoreLocations = async () => {
      setLoading(true);
      try {
        const response = await dispatch(
          getStoreLocations({
            page_no: 1,
            per_page: 10,
          })
        );

        // Transform API data to match table requirements
        const transformedData =
          response?.data?.map((location: any) => ({
            id: location.id,
            storeName: location.name,
            address: location.address?.building
              ? `${location.address.building}, ${
                  location.address.locality || ""
                }`
              : "-",
            createdDate: new Date(location.createdAt).toLocaleString("en-IN", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            }),
            city: location.address?.city || "-",
            pincode: location.address?.area_code || "-",
            status: location.is_active ? "Active" : "Inactive",
          })) || [];

        setStoreData(transformedData);
      } catch (error) {
        console.error("Error fetching store locations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStoreLocations();
  }, [dispatch]);

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          onClick={() => navigate("create-store")}
        >
          ADD NEW STORE
        </button>
        <div className="relative">
          <input
            type="text"
            placeholder="Search Store Name"
            className="border border-gray-300 rounded-lg px-4 py-2 w-64"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-48">
          <p>Loading...</p>
        </div>
      ) : (
        <CustomTable
          headCells={storeColumns}
          data={storeData || []}
          pagination={true}
        />
      )}
    </>
  );
};

const ShippingTab = ({
  viewType,
  setViewType,
}: {
  viewType: ViewType;
  setViewType: (type: ViewType) => void;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);
  const [serviceabilityData, setServiceabilityData] = useState<any[]>([]);

  useEffect(() => {
    const fetchServiceability = async () => {
      try {
        setLoading(true);
        const response = await dispatch(getAllServiceability());
        if (response?.data) {
          // Transform the data for the table
          const transformedData = response.data.map((item: any) => ({
            id: item.id,
            storeName: item.location?.name || "-",
            address: `${item.location?.address?.building || ""}, ${
              item.location?.address?.locality || ""
            }`,
            createdDate: new Date(item.createdAt).toLocaleString("en-IN", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            }),
            shippingDistance: item.pan_india
              ? "Pan India"
              : item.shipping_radius
              ? `${item.shipping_radius} KM`
              : "Zone",
            domain: item.category || "-",
            city: item.location?.address?.city || "-",
            pincode: item.location?.address?.area_code || "-",
            status: item.is_active ? "Active" : "Inactive",
          }));
          setServiceabilityData(transformedData);
        }
      } catch (error) {
        console.error("Error fetching serviceability:", error);
        toast.error("Failed to fetch serviceability data");
      } finally {
        setLoading(false);
      }
    };

    fetchServiceability();
  }, [dispatch]);

  return (
    <>
      {/* Filter and View Toggle Section */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          <div className="w-64">
            <select className="w-full border border-gray-300 rounded-lg px-4 py-2">
              <option value="">Filter by Store</option>
              {serviceabilityData.map((item) => (
                <option key={item.id} value={item.storeName}>
                  {item.storeName}
                </option>
              ))}
            </select>
          </div>
          <div className="w-64">
            <select className="w-full border border-gray-300 rounded-lg px-4 py-2">
              <option value="">Filter by Domain</option>
              {Array.from(
                new Set(serviceabilityData.map((item) => item.domain))
              ).map((domain) => (
                <option key={domain} value={domain}>
                  {domain}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setViewType("table")}
            className={`p-2 rounded ${
              viewType === "table"
                ? "bg-blue-100 text-blue-600"
                : "text-gray-600 hover:bg-gray-100"
            }`}
            title="Table View"
          >
            <List size={20} />
          </button>
          <button
            onClick={() => setViewType("grid")}
            className={`p-2 rounded ${
              viewType === "grid"
                ? "bg-blue-100 text-blue-600"
                : "text-gray-600 hover:bg-gray-100"
            }`}
            title="Grid View"
          >
            <LayoutGrid size={20} />
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-48">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      ) : viewType === "table" ? (
        <CustomTable
          headCells={shippingColumns}
          data={serviceabilityData}
          pagination={true}
        />
      ) : (
        <GridView data={serviceabilityData} />
      )}
    </>
  );
};

// Add this new component
const StoreDetailsForm = ({
  handleInputChange,
  onStoreCreated,
}: {
  handleInputChange: (key: string, value: any) => void;
  onStoreCreated: (locationId: number) => void;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [locationTypes, setLocationTypes] = useState<LocationType[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    address: {
      name: "",
      building: "",
      locality: "",
      city: "",
      state: "",
      country: "India",
      area_code: "",
    },
    location_type_id: 0,
    email: "",
    gst_number: "",
    mobile_number: "",
    latitude: "23.0283384",
    longitude: "72.5280284",
    opening_time: "2023-12-11T01:10:43+05:30",
    closing_time: "2023-12-11T13:25:49+05:30",
    contact_name: "",
  });

  // Fetch location types on component mount
  useEffect(() => {
    const fetchLocationTypes = async () => {
      try {
        const response = await dispatch(getLocationTypeLookup());
        if (response?.data) {
          setLocationTypes(response.data);
        }
      } catch (error) {
        console.error("Error fetching location types:", error);
        toast.error("Failed to fetch store types");
      }
    };

    fetchLocationTypes();
  }, [dispatch]);

  const handleSave = async () => {
    try {
      const response = await dispatch(createStoreLocation(formData));
      console.log("Store creation response:", response);

      if (response?.meta?.status) {
        toast.success("Store created successfully");
        if (response.data?.id) {
          const createdLocationId = response.data.id;
          console.log(
            "Created store location ID (before passing to onStoreCreated):",
            createdLocationId
          );
          onStoreCreated(createdLocationId);
          console.log(
            "Created store location ID (after passing to onStoreCreated):",
            createdLocationId
          );
        } else {
          console.warn("Store created but no ID received in response");
        }
      }
    } catch (error) {
      console.error("Failed to create store:", error);
      toast.error("Failed to create store");
    }
  };

  const handleFormChange = (key: string, value: any) => {
    if (key.includes(".")) {
      const [parent, child] = key.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [key]: value,
      }));
    }
  };

  return (
    <SectionContainer>
      <AddForm
        data={[
          {
            type: "text",
            key: "name",
            label: "Store Name",
            required: true,
            value: formData.name,
            onChange: (value) => handleFormChange("name", value),
          },
          {
            type: "select",
            key: "location_type_id",
            label: "Store Type",
            required: true,
            value: formData.location_type_id,
            options: locationTypes.map((type) => ({
              label: type.display_name,
              value: type.id,
            })),
            onChange: (value) => handleFormChange("location_type_id", value),
          },
          {
            type: "text",
            key: "address.building",
            label: "Building",
            required: true,
            value: formData.address.building,
            onChange: (value) => handleFormChange("address.building", value),
          },
          {
            type: "text",
            key: "address.locality",
            label: "Locality",
            required: true,
            value: formData.address.locality,
            onChange: (value) => handleFormChange("address.locality", value),
          },
          {
            type: "text",
            key: "address.city",
            label: "City",
            required: true,
            value: formData.address.city,
            onChange: (value) => handleFormChange("address.city", value),
          },
          {
            type: "text",
            key: "address.state",
            label: "State",
            required: true,
            value: formData.address.state,
            onChange: (value) => handleFormChange("address.state", value),
          },
          {
            type: "text",
            key: "address.area_code",
            label: "Postal Code",
            required: true,
            value: formData.address.area_code,
            onChange: (value) => handleFormChange("address.area_code", value),
          },
          {
            type: "text",
            key: "email",
            label: "Email",
            required: true,
            value: formData.email,
            onChange: (value) => handleFormChange("email", value),
          },
          {
            type: "text",
            key: "gst_number",
            label: "GST Number",
            required: true,
            value: formData.gst_number,
            onChange: (value) => handleFormChange("gst_number", value),
          },
          {
            type: "text",
            key: "mobile_number",
            label: "Mobile Number",
            required: true,
            value: formData.mobile_number,
            onChange: (value) => handleFormChange("mobile_number", value),
          },
          {
            type: "text",
            key: "contact_name",
            label: "Contact Name",
            required: true,
            value: formData.contact_name,
            onChange: (value) => handleFormChange("contact_name", value),
          },
        ]}
        handleInputonChange={handleFormChange}
        handleSelectonChange={handleFormChange}
      />
      <div className="flex justify-end mt-4">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          SAVE
        </button>
      </div>
    </SectionContainer>
  );
};

// Create HolidaysForm component
const HolidaysForm = ({
  handleInputChange,
  locationId,
}: {
  handleInputChange: (key: string, value: any) => void;
  locationId: number;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedHolidays, setSelectedHolidays] = useState<string[]>([]);

  const handleSave = async () => {
    try {
      // Ensure we have an array of dates
      const holidayArray = Array.isArray(selectedHolidays)
        ? selectedHolidays
        : [selectedHolidays];

      // Format dates to match API requirement
      const formattedHolidays = holidayArray
        .filter(Boolean)
        .map((date) => `${date}T00:00:00+05:30`);

      const payload = {
        holidays: formattedHolidays,
      };

      const response = await dispatch(updateWorkingHours(locationId, payload));
      if (response?.meta?.status) {
        toast.success("Holidays updated successfully");
      }
    } catch (error) {
      toast.error("Failed to update holidays");
      console.error("Error updating holidays:", error);
    }
  };

  return (
    <SectionContainer>
      <AddForm
        data={[
          {
            type: "section",
            key: "holidaysSection",
            label: "Holidays",
            description: "Tell us your holidays",
          },
          {
            type: "date",
            key: "holidays",
            label: "Select Holidays",
            placeholder: "Select Dates",
            multiple: true,
            value: selectedHolidays,
            onChange: (value) => {
              // Ensure value is always an array
              const holidayArray = Array.isArray(value) ? value : [value];
              setSelectedHolidays(holidayArray);
            },
          },
        ]}
        handleInputonChange={(key, value) => {
          // Ensure value is always an array
          const holidayArray = Array.isArray(value) ? value : [value];
          setSelectedHolidays(holidayArray);
          handleInputChange(key, holidayArray);
        }}
        handleSelectonChange={handleInputChange}
      />
      <div className="flex justify-end mt-4">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          SAVE
        </button>
      </div>
    </SectionContainer>
  );
};

// Create TemporaryCloseForm component
const TemporaryCloseForm = ({
  handleInputChange,
  locationId,
}: {
  handleInputChange: (key: string, value: any) => void;
  locationId: number;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isTemporarilyClosed, setIsTemporarilyClosed] = useState(false);
  const [temporaryClose, setTemporaryClose] = useState({
    startDate: "",
    endDate: "",
  });

  const handleSave = async () => {
    try {
      const payload = {
        is_temporary_close: isTemporarilyClosed,
        temporary_close_start_time: isTemporarilyClosed
          ? `${temporaryClose.startDate}T00:00:00.000Z`
          : null,
        temporary_close_end_time: isTemporarilyClosed
          ? `${temporaryClose.endDate}T00:00:00.000Z`
          : null,
      };

      const response = await dispatch(updateWorkingHours(locationId, payload));
      if (response?.meta?.status) {
        toast.success("Temporary close status updated successfully");
      }
    } catch (error) {
      toast.error("Failed to update temporary close status");
      console.error("Error updating temporary close status:", error);
    }
  };

  return (
    <SectionContainer>
      <AddForm
        data={[
          {
            type: "section",
            key: "temporaryCloseSection",
            label: "Temporary Close",
            description: "Tell us if you want to temporarily Close the Store",
          },
          {
            type: "switch",
            key: "isTemporarilyClosed",
            label: "Close Store temporarily",
            value: isTemporarilyClosed,
            onChange: (value) => setIsTemporarilyClosed(value),
          },
        ]}
        handleInputonChange={(key, value) => {
          if (key === "isTemporarilyClosed") {
            setIsTemporarilyClosed(value);
          }
          handleInputChange(key, value);
        }}
        handleSelectonChange={handleInputChange}
      />

      {isTemporarilyClosed && (
        <div className="mt-6 space-y-4">
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Close From <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={temporaryClose.startDate}
              onChange={(e) =>
                setTemporaryClose((prev) => ({
                  ...prev,
                  startDate: e.target.value,
                }))
              }
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Close Until <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={temporaryClose.endDate}
              onChange={(e) =>
                setTemporaryClose((prev) => ({
                  ...prev,
                  endDate: e.target.value,
                }))
              }
            />
          </div>
        </div>
      )}

      <div className="flex justify-end mt-6">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          SAVE
        </button>
      </div>
    </SectionContainer>
  );
};

export default LocationServices;
