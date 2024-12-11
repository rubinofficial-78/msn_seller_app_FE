export const isTimeRelatedField = (fieldName: string): boolean => {
  const timeFields = [
    "Return Within",
    "Time To Ship",
    "Time to Ship",
    "Expected Delivery_time",
  ];
  return timeFields.includes(fieldName);
}; 