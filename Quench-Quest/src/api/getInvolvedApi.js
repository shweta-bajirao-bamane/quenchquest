import axiosInstance from "../axiosInstance";

/* ================= Corporate Partnership APIs ================= */

// GET corporate partnership content
export const getCorporatePartnership = () => {
  return axiosInstance.get("/corporate-partnership/");
};

// PUT corporate partnership content
export const updateCorporatePartnership = (id, data) => {
  return axiosInstance.put(`/corporate-partnership/${id}/`, data);
};


// GET all upconing events
export const getUpcomingEvents = () => {
  return axiosInstance.get("/events/");
};

// PUT update event
export const updateUpcomingEvent = (id, data) => {
  return axiosInstance.put(`/events/${id}/`, data);
};