import React, { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import {
  getShippingServices,
  getServiceability,
  updateShippingServices,
  getShippingTypeLookup,
  getDeliveryTypeLookup,
  getPreferencesLookup,
} from "../../redux/Action/action";
import { toast } from "react-hot-toast";
import { Save, Trash2, Copy } from "lucide-react";

interface RegionState {
  [key: string]: boolean;
}

interface RegionGroup {
  name: string;
  states: string[];
}

interface ShippingFormData {
  shippingType: string;
  categories: string[];
  deliveryType: string;
  preferences: string;
  transitTime: string;
  shippingFee: string;
}

interface ShippingService {
  id: number;
  zone?: {
    display_name: string;
    id: number;
  };
  zone_id?: number;
  states: Array<{
    name: string;
    id: number;
  }>;
  isDisabled?: boolean;
  serviceability?: {
    pan_india: boolean;
    category: string;
    sub_categories: string[];
  };
  shipping_type?: {
    display_name: string;
    id: number;
  };
  sub_categorie?: string[];
  delivery_type?: {
    display_name: string;
    id: number;
  };
  shipping_preferences?: {
    display_name: string;
    id: number;
  };
  transmit_time?: string;
  shipping_charge?: string;
  formData?: ShippingFormData;
}

// Add this interface for radius view
interface RadiusServiceability {
  shipping_radius: number;
  category: string;
  sub_categories: string[];
  location?: {
    name: string;
  };
}

const ShippingDetailsPage = ({ locationId }: { locationId: number }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(true);
  const [shippingServices, setShippingServices] = useState<
    ShippingService[] | null
  >(null);
  const [selectedStates, setSelectedStates] = useState<{
    [key: string]: RegionState;
  }>({});

  const [storeDetails, setStoreDetails] = useState({
    storeName: "",
    domain: "",
    shippingDistance: "",
  });

  const [zoneSettings, setZoneSettings] = useState<{ [key: string]: any }>({});

  const [categories, setCategories] = useState<
    Array<{
      category: string;
      sub_categories: string[];
    }>
  >([]);

  const [shippingTypes, setShippingTypes] = useState<
    Array<{
      id: number;
      display_name: string;
      lookup_code: string;
      is_active: boolean;
    }>
  >([]);

  const [deliveryTypes, setDeliveryTypes] = useState<
    Array<{
      id: number;
      display_name: string;
      lookup_code: string;
    }>
  >([]);

  const [preferences, setPreferences] = useState<
    Array<{
      id: number;
      display_name: string;
      lookup_code: string;
    }>
  >([]);

  const [availableCategories, setAvailableCategories] = useState<string[]>([]);

  const handleInputChange = (key: string, value: any, rowId: number) => {
    console.log("Input change:", { key, value, rowId });

    setShippingServices(
      (prev) =>
        prev?.map((service) =>
          service.id === rowId
            ? {
                ...service,
                formData: {
                  ...(service.formData || {}),
                  [key]: value,
                },
              }
            : service
        ) || null
    );
  };

  const handleSaveZoneSettings = async (
    service: ShippingService,
    lookupData: {
      shippingTypes: Array<{
        id: number;
        display_name: string;
        lookup_code: string;
        is_active: boolean;
      }>;
      deliveryTypes: Array<{
        id: number;
        display_name: string;
        lookup_code: string;
      }>;
      preferences: Array<{
        id: number;
        display_name: string;
        lookup_code: string;
      }>;
    }
  ) => {
    try {
      if (!service.formData) {
        toast.error("Please fill in all required fields");
        return;
      }

      const payload = {
        shipping_charge: Number(service.formData.shippingFee) || 0,
        categories: service.formData.categories,
        transmit_time: Number(service.formData.transitTime) || 0,
        shipping_type: lookupData.shippingTypes.find(
          (type) => type.lookup_code === service.formData?.shippingType
        ),
        states: selectedStates[service.zone?.display_name || ""]
          ? Object.entries(
              selectedStates[service.zone?.display_name || ""]
            ).map(([name, selected]) => ({
              name,
              selected,
            }))
          : [],
        delivery_type: lookupData.deliveryTypes.find(
          (type) => type.lookup_code === service.formData?.deliveryType
        ),
        shipping_preferences: lookupData.preferences.find(
          (pref) => pref.lookup_code === service.formData?.preferences
        ),
      };

      await dispatch(updateShippingServices(service.id, payload));
      toast.success("Settings saved successfully");
    } catch (error) {
      console.error("Error saving zone settings:", error);
      toast.error("Failed to save settings");
    }
  };

  const handleDeleteZoneSettings = async (row: any) => {
    try {
      // Implement delete logic here
      toast.success("Settings deleted successfully");
    } catch (error) {
      toast.error("Failed to delete settings");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [shippingResponse, serviceabilityResponse] = await Promise.all([
          dispatch(
            getShippingServices({
              serviceability_id: parseInt(id || "0"),
            })
          ),
          dispatch(getServiceability(locationId)),
        ]);

        if (shippingResponse?.data) {
          const serviceability = shippingResponse.data[0]?.serviceability;

          if (serviceabilityResponse?.data) {
            const uniqueCategories = Array.from(
              new Set(
                serviceabilityResponse.data.map((item: any) => ({
                  category: item.category,
                  sub_categories: item.sub_categories
                }))
              )
            );
            setCategories(uniqueCategories);
            
            if (serviceability?.category) {
              const currentDomainData = uniqueCategories.find(
                (cat) => cat.category === serviceability.category
              );
              if (currentDomainData?.sub_categories) {
                setAvailableCategories(currentDomainData.sub_categories);
              }
            }
          }

          if (serviceability) {
            // Set store details
            setStoreDetails({
              storeName: serviceability.location?.name || "",
              domain: serviceability.category || "",
              shippingDistance: serviceability.pan_india
                ? "Pan India"
                : serviceability.zone
                ? "Zone"
                : serviceability.shipping_radius
                ? `${serviceability.shipping_radius} KM`
                : "",
            });

            // Handle different shipping types
            if (serviceability.shipping_radius) {
              // For radius type, don't show zones
              const radiusService = {
                id: shippingResponse.data[0].id,
                formData: {
                  shippingType: shippingResponse.data[0].shipping_type?.lookup_code || "",
                  categories: serviceability.sub_categories || [],
                  deliveryType: shippingResponse.data[0].delivery_type?.lookup_code || "",
                  preferences: shippingResponse.data[0].shipping_preferences?.lookup_code || "",
                  transitTime: shippingResponse.data[0].transmit_time || "",
                  shippingFee: shippingResponse.data[0].shipping_charge || "",
                }
              };
              setShippingServices([radiusService]);
            } else {
              // For Pan India or Zone
              const servicesWithFormData = shippingResponse.data.map((service: ShippingService) => ({
                ...service,
                formData: {
                  shippingType: service.shipping_type?.lookup_code || "",
                  categories: service.categories || [],
                  deliveryType: service.delivery_type?.lookup_code || "",
                  preferences: service.shipping_preferences?.lookup_code || "",
                  transitTime: service.transmit_time || "",
                  shippingFee: service.shipping_charge || "",
                },
                isDisabled: serviceability.pan_india // Disable state selection for pan India
              }));
              setShippingServices(servicesWithFormData);

              // Set initial states
              const initialStates: { [key: string]: RegionState } = {};
              shippingResponse.data.forEach((service: any) => {
                if (service.zone?.display_name) {
                  initialStates[service.zone.display_name] = service.states.reduce(
                    (acc: RegionState, state: any) => ({
                      ...acc,
                      [state.name]: serviceability.pan_india ? true : state.selected,
                    }),
                    {}
                  );
                }
              });
              setSelectedStates(initialStates);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [dispatch, id]);

  useEffect(() => {
    const fetchLookupData = async () => {
      try {
        const [shippingResponse, deliveryResponse, preferencesResponse] =
          await Promise.all([
            dispatch(getShippingTypeLookup()),
            dispatch(getDeliveryTypeLookup()),
            dispatch(getPreferencesLookup()),
          ]);

        if (shippingResponse?.data) {
          setShippingTypes(shippingResponse.data);
        }
        if (deliveryResponse?.data) {
          setDeliveryTypes(deliveryResponse.data);
        }
        if (preferencesResponse?.data) {
          setPreferences(preferencesResponse.data);
        }
      } catch (error) {
        console.error("Error fetching lookup data:", error);
        toast.error("Failed to fetch lookup data");
      }
    };

    fetchLookupData();
  }, [dispatch]);

  const handleSelectAll = (regionName: string) => {
    // Don't allow changes if pan india
    if (storeDetails.shippingDistance === "Pan India") return;

    if (!shippingServices || !Array.isArray(shippingServices)) return;

    const service = shippingServices.find(
      (s: any) => s?.zone?.display_name === regionName
    );
    if (!service || !service.states) return;

    const newStates: RegionState = {};
    const currentStates = selectedStates[regionName] || {};
    const areAllSelected = service.states.every(
      (state: any) => currentStates[state.name]
    );

    service.states.forEach((state: any) => {
      newStates[state.name] = !areAllSelected;
    });

    setSelectedStates((prev) => ({
      ...prev,
      [regionName]: newStates,
    }));
  };

  const handleDomainChange = async (value: string) => {
    try {
      setLoading(true);
      setStoreDetails((prev) => ({
        ...prev,
        domain: value,
      }));

      const selectedDomain = categories.find((cat) => cat.category === value);
      if (selectedDomain?.sub_categories) {
        setAvailableCategories(selectedDomain.sub_categories);
      } else {
        setAvailableCategories([]);
      }

      // Only proceed if a domain is selected
      if (value) {
        // Fetch shipping services with the selected domain
        const shippingResponse = await dispatch(
          getShippingServices({
            serviceability_id: parseInt(id || "0"),
          })
        );

        if (shippingResponse?.data) {
          // Filter shipping services for selected domain
          const filteredServices = shippingResponse.data.filter(
            (service: any) => service.serviceability?.category === value
          );

          if (filteredServices.length > 0) {
            const initialStates: { [key: string]: RegionState } = {};

            // Process each service to set up states
            filteredServices.forEach((service: any) => {
              if (service.zone?.display_name) {
                // Initialize states for this zone
                initialStates[service.zone.display_name] =
                  service.states.reduce(
                    (acc: RegionState, state: any) => ({
                      ...acc,
                      [state.name]: service.serviceability?.pan_india
                        ? true
                        : false,
                    }),
                    {}
                  );
              }
            });

            // Set the states and shipping services
            setSelectedStates(initialStates);
            setShippingServices(
              filteredServices.map((service: any) => ({
                id: service.id,
                zone: service.zone,
                zone_id: service.zone_id,
                states: service.states,
                isDisabled: service.serviceability?.pan_india,
                shipping_type: service.shipping_type,
                serviceability: service.serviceability,
                sub_categorie: service.serviceability?.sub_categories || [],
                delivery_type: service.delivery_type,
                shipping_preferences: service.shipping_preferences,
                transmit_time: service.transmit_time,
                shipping_charge: service.shipping_charge,
              }))
            );
          } else {
            setSelectedStates({});
            setShippingServices(null);
            toast.error("No shipping services found for selected domain");
          }
        }
      } else {
        setSelectedStates({});
        setShippingServices(null);
      }
    } catch (error) {
      console.error("Error handling domain change:", error);
      toast.error("Failed to update domain");
    } finally {
      setLoading(false);
    }
  };

  // Add this helper function to check if shipping type is own shipping
  const isOwnShipping = (shippingType: string | undefined) => {
    return shippingType === "OWN_SHIPPING";
  };

  // Add this helper function to check if shipping type is ONDC logistics
  const isOndcLogistics = (shippingType: string | undefined) => {
    return shippingType === "ONDC_LOGISTICS";
  };

  // Add the duplicate zone function
  const handleDuplicateZone = (service: ShippingService) => {
    setShippingServices((prev) => {
      if (!prev) return prev;
      const newService = {
        ...service,
        id: Date.now(), // Temporary ID for new service
        formData: { ...service.formData },
      };
      return [...prev, newService];
    });
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold">Shipping Details</h1>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="grid grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Store Name
            </label>
            <div className="text-gray-900">{storeDetails.storeName}</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Domain
            </label>
            <div className="relative">
              <select
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                value={storeDetails.domain}
                onChange={(e) => handleDomainChange(e.target.value)}
                disabled={loading}
              >
                <option value="">Select Domain</option>
                {categories.map((cat, index) => (
                  <option key={index} value={cat.category}>
                    {cat.category}
                  </option>
                ))}
              </select>
              {loading && (
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900"></div>
                </div>
              )}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Shipping Distance
            </label>
            <div className="text-gray-900">{storeDetails.shippingDistance}</div>
          </div>
        </div>
      </div>

      {storeDetails.shippingDistance.includes("KM") ? (
        // Radius View
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="mb-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Shipping Radius
                </label>
                <div className="text-gray-900">
                  {storeDetails.shippingDistance}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Shipping Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Shipping Type
              </label>
              <select
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                value={shippingServices?.[0]?.formData?.shippingType || ""}
                onChange={(e) =>
                  handleInputChange("shippingType", e.target.value, shippingServices?.[0]?.id || 0)
                }
              >
                <option value="">Select Shipping Type</option>
                {shippingTypes.map((type) => (
                  <option key={type.id} value={type.lookup_code}>
                    {type.display_name}
                  </option>
                ))}
              </select>
            </div>

            {/* Categories */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Categories
              </label>
              <select
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                multiple
                value={shippingServices?.[0]?.formData?.categories || []}
                onChange={(e) => {
                  const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
                  handleInputChange('categories', selectedOptions, shippingServices?.[0]?.id || 0);
                }}
              >
                {availableCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <p className="mt-1 text-xs text-gray-500">
                Hold Ctrl (Windows) or Command (Mac) to select multiple categories
              </p>
            </div>

            {/* Delivery Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Delivery Type
              </label>
              <select
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                value={shippingServices?.[0]?.formData?.deliveryType || ""}
                onChange={(e) =>
                  handleInputChange("deliveryType", e.target.value, shippingServices?.[0]?.id || 0)
                }
                disabled={isOwnShipping(shippingServices?.[0]?.formData?.shippingType)}
              >
                <option value="">Select Delivery Type</option>
                {deliveryTypes.map((type) => (
                  <option key={type.id} value={type.lookup_code}>
                    {type.display_name}
                  </option>
                ))}
              </select>
            </div>

            {/* Preferences */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preferences
              </label>
              <select
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                value={shippingServices?.[0]?.formData?.preferences || ""}
                onChange={(e) =>
                  handleInputChange("preferences", e.target.value, shippingServices?.[0]?.id || 0)
                }
                disabled={isOwnShipping(shippingServices?.[0]?.formData?.shippingType)}
              >
                <option value="">Select Preferences</option>
                {preferences.map((pref) => (
                  <option key={pref.id} value={pref.lookup_code}>
                    {pref.display_name}
                  </option>
                ))}
              </select>
            </div>

            {/* Transit Time */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Transit Time (in days)
              </label>
              <input
                type="number"
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                value={shippingServices?.[0]?.formData?.transitTime || ""}
                onChange={(e) =>
                  handleInputChange("transitTime", e.target.value, shippingServices?.[0]?.id || 0)
                }
                min="0"
                step="1"
                disabled={isOndcLogistics(shippingServices?.[0]?.formData?.shippingType)}
              />
            </div>

            {/* Shipping Fee */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Shipping Fee
              </label>
              <input
                type="number"
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                value={shippingServices?.[0]?.formData?.shippingFee || ""}
                onChange={(e) =>
                  handleInputChange("shippingFee", e.target.value, shippingServices?.[0]?.id || 0)
                }
                min="0"
                step="0.01"
                disabled={isOndcLogistics(shippingServices?.[0]?.formData?.shippingType)}
              />
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end mt-6">
            <button
              onClick={() =>
                handleSaveZoneSettings(shippingServices?.[0] as ShippingService, {
                  shippingTypes,
                  deliveryTypes,
                  preferences,
                })
              }
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <Save size={16} />
              Save
            </button>
            <button
              onClick={() => handleDuplicateZone(shippingServices?.[0] as ShippingService)}
              className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 flex items-center gap-2"
            >
              <Copy size={16} />
              Duplicate
            </button> 
            <button
              onClick={() => handleDeleteZoneSettings(shippingServices?.[0] as ShippingService)}
              className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 flex items-center gap-2"
            >
              <Trash2 size={16} />
              Delete
            </button>
          </div>
        </div>
      ) : (
        // Pan India or Zone View with regions
        shippingServices &&
        Array.isArray(shippingServices) && (
          <div className="space-y-6">
            {shippingServices.map((service: ShippingService) => (
              <div
                key={service.id}
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
              >
                <div className="mb-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={
                        service.states?.length > 0 &&
                        service.states.every(
                          (state) =>
                            selectedStates[service.zone?.display_name || ""]?.[
                              state.name
                            ]
                        )
                      }
                      onChange={() =>
                        handleSelectAll(service.zone?.display_name || "")
                      }
                      disabled={service.isDisabled}
                      className="rounded border-gray-300"
                    />
                    <span className="font-medium text-gray-900">
                      {service.zone?.display_name}
                    </span>
                  </label>
                </div>

                <div className="grid grid-cols-3 gap-4 ml-6 mb-6">
                  {service.states?.map((state) => (
                    <label
                      key={state.name}
                      className="flex items-center space-x-2"
                    >
                      <input
                        type="checkbox"
                        checked={
                          selectedStates[service.zone?.display_name || ""]?.[
                            state.name
                          ] || false
                        }
                        onChange={() => {
                          if (
                            !service.isDisabled &&
                            service.zone?.display_name
                          ) {
                            setSelectedStates((prev) => ({
                              ...prev,
                              [service.zone!.display_name]: {
                                ...(prev[service.zone!.display_name] || {}),
                                [state.name]:
                                  !prev[service.zone!.display_name]?.[
                                    state.name
                                  ],
                              },
                            }));
                          }
                        }}
                        disabled={service.isDisabled}
                        className="rounded border-gray-300"
                      />
                      <span className="text-sm text-gray-700">
                        {state.name}
                      </span>
                    </label>
                  ))}
                </div>

                <div className="mt-6 space-y-4 border-t pt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Shipping Type
                      </label>
                      <select
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        value={service.formData?.shippingType || ""}
                        onChange={(e) =>
                          handleInputChange(
                            "shippingType",
                            e.target.value,
                            service.id
                          )
                        }
                      >
                        <option value="">Select Shipping Type</option>
                        {shippingTypes.map((type) => (
                          <option key={type.id} value={type.lookup_code}>
                            {type.display_name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Categories
                      </label>
                      <select
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        multiple
                        value={service.formData?.categories || []}
                        onChange={(e) => {
                          const selectedOptions = Array.from(
                            e.target.selectedOptions,
                            (option) => option.value
                          );
                          handleInputChange(
                            "categories",
                            selectedOptions,
                            service.id
                          );
                        }}
                      >
                        {availableCategories.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                      <p className="mt-1 text-xs text-gray-500">
                        Hold Ctrl (Windows) or Command (Mac) to select multiple
                        categories
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Delivery Type
                      </label>
                      <select
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        value={service.formData?.deliveryType || ""}
                        onChange={(e) =>
                          handleInputChange(
                            "deliveryType",
                            e.target.value,
                            service.id
                          )
                        }
                        disabled={isOwnShipping(service.formData?.shippingType)}
                      >
                        <option value="">Select Delivery Type</option>
                        {deliveryTypes.map((type) => (
                          <option key={type.id} value={type.lookup_code}>
                            {type.display_name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Preferences
                      </label>
                      <select
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        value={service.formData?.preferences || ""}
                        onChange={(e) =>
                          handleInputChange(
                            "preferences",
                            e.target.value,
                            service.id
                          )
                        }
                        disabled={isOwnShipping(service.formData?.shippingType)}
                      >
                        <option value="">Select Preferences</option>
                        {preferences.map((pref) => (
                          <option key={pref.id} value={pref.lookup_code}>
                            {pref.display_name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Transit Time (in days)
                      </label>
                      <input
                        type="number"
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        value={service.formData?.transitTime || ""}
                        onChange={(e) =>
                          handleInputChange(
                            "transitTime",
                            e.target.value,
                            service.id
                          )
                        }
                        min="0"
                        step="1"
                        disabled={isOndcLogistics(
                          service.formData?.shippingType
                        )}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Shipping Fee
                      </label>
                      <input
                        type="number"
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        value={service.formData?.shippingFee || ""}
                        onChange={(e) =>
                          handleInputChange(
                            "shippingFee",
                            e.target.value,
                            service.id
                          )
                        }
                        min="0"
                        step="0.01"
                        disabled={isOndcLogistics(
                          service.formData?.shippingType
                        )}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => handleDuplicateZone(service)}
                      className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 flex items-center gap-2"
                    >
                      <Copy size={16} />
                      Duplicate
                    </button>
                    <button
                      onClick={() =>
                        handleSaveZoneSettings(service, {
                          shippingTypes,
                          deliveryTypes,
                          preferences,
                        })
                      }
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                    >
                      <Save size={16} />
                      Save
                    </button>
                    <button
                      onClick={() => handleDeleteZoneSettings(service)}
                      className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 flex items-center gap-2"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default ShippingDetailsPage;
