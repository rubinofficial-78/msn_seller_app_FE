import React, { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import {
  getShippingServices,
  getServiceability,
  updateShippingServices,
} from "../../redux/Action/action";
import { toast } from "react-hot-toast";
import { Save, Trash2 } from "lucide-react";
import ServiceabilityTable from "../../components/ServiceabilityTable";

interface RegionState {
  [key: string]: boolean;
}

interface RegionGroup {
  name: string;
  states: string[];
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
    }>
  >([]);

  const handleInputChange = (key: string, value: any, rowId: number) => {
    console.log('Input change:', { key, value, rowId }); // Add this for debugging

    setZoneSettings(prev => ({
      ...prev,
      [rowId]: {
        ...(prev[rowId] || {}),
        [key]: value
      }
    }));

    // Also update the shippingServices state to reflect changes immediately
    setShippingServices(prev => 
      prev?.map(service => 
        service.id === rowId 
          ? { ...service, [key]: value }
          : service
      ) || null
    );
  };

  const handleSaveZoneSettings = async (
    row: any,
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
      const payload = {
        shipping_charge: Number(row.shippingFee) || 0,
        categories: row.category,
        transmit_time: Number(row.transitTime) || 0,
        shipping_type:
          lookupData.shippingTypes.find(
            (type) => type.lookup_code === row.shippingType
          ) || null,
        states: selectedStates[row.zone?.display_name]
          ? Object.entries(selectedStates[row.zone?.display_name]).map(
              ([name, selected]) => ({
                name,
                selected,
              })
            )
          : [],
        delivery_type:
          lookupData.deliveryTypes.find(
            (type) => type.lookup_code === row.deliveryType
          ) || null,
        shipping_preferences:
          lookupData.preferences.find(
            (pref) => pref.lookup_code === row.preferences
          ) || null,
      };

      await dispatch(updateShippingServices(row.id, payload));
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
        // Fetch shipping services and serviceability data
        const [shippingResponse, serviceabilityResponse] = await Promise.all([
          dispatch(
            getShippingServices({
              serviceability_id: parseInt(id || "0"),
            })
          ),
          dispatch(getServiceability(locationId)),
        ]);

        // Extract unique categories from serviceability data
        if (serviceabilityResponse?.data) {
          const uniqueCategories = Array.from(
            new Set(
              serviceabilityResponse.data.map((item: any) => item.category)
            )
          ).map((category) => ({ category }));
          setCategories(uniqueCategories);
        }

        // Set store details
        if (shippingResponse?.data) {
          const serviceability = shippingResponse.data[0]?.serviceability;

          if (serviceability) {
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

            // If shipping type is radius, don't show zones
            if (serviceability.shipping_radius) {
              setShippingServices(null);
              return;
            }

            // For Pan India, select all states by default and disable changes
            if (serviceability.pan_india) {
              const initialStates: { [key: string]: RegionState } = {};
              shippingResponse.data.forEach((service: any) => {
                if (service.zone?.display_name) {
                  initialStates[service.zone.display_name] =
                    service.states.reduce(
                      (acc: RegionState, state: any) => ({
                        ...acc,
                        [state.name]: true, // Force all states to be selected
                      }),
                      {}
                    );
                }
              });
              setSelectedStates(initialStates);
              setShippingServices(
                shippingResponse.data.map((service: any) => ({
                  ...service,
                  isDisabled: true, // Add disabled flag for pan india
                }))
              );
            }
            // For Zone, start with unchecked states
            else if (serviceability.zone) {
              const initialStates: { [key: string]: RegionState } = {};
              shippingResponse.data.forEach((service: any) => {
                if (service.zone?.display_name) {
                  initialStates[service.zone.display_name] =
                    service.states.reduce(
                      (acc: RegionState, state: any) => ({
                        ...acc,
                        [state.name]: false, // Start with unchecked states
                      }),
                      {}
                    );
                }
              });
              setSelectedStates(initialStates);
              setShippingServices(shippingResponse.data);
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
      console.error("Error fetching data for domain:", error);
      toast.error("Failed to fetch shipping services for selected domain");
      setSelectedStates({});
      setShippingServices(null);
    } finally {
      setLoading(false);
    }
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

      {storeDetails.shippingDistance !== "Radius" &&
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
                              [service.zone.display_name]: {
                                ...(prev[service.zone.display_name] || {}),
                                [state.name]:
                                  !prev[service.zone.display_name]?.[
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

                <div className="mt-4">
                  <ServiceabilityTable
                    data={[
                      {
                        id: service.id,
                        shippingType: service.shipping_type?.display_name || '',
                        category: service.sub_categorie || [],
                        serviceability: {
                          sub_categories: service.serviceability?.sub_categories || []
                        },
                        deliveryType: service.delivery_type?.display_name || '',
                        preferences: service.shipping_preferences?.display_name || '',
                        transitTime: service.transmit_time || '',
                        shippingFee: service.shipping_charge || '',
                        zoneId: service.zone_id,
                      }
                    ]}
                    onSave={handleSaveZoneSettings}
                    onDelete={handleDeleteZoneSettings}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
    </div>
  );
};

export default ShippingDetailsPage;
