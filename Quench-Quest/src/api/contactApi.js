import axiosInstance from "../axiosInstance";

export const submitContactForm = async (data) => {
    const response = await axiosInstance.post("/user/contact/", data);
    return response.data;
};


// GET contact hero
export const getContactHeader = () => {
  return axiosInstance.get("/contact-header/");
};

// UPDATE contact hero
export const updateContactHeader = (id, data) => {
  return axiosInstance.put(`/contact-header/${id}/`, data);
};


// GET
export const getContactCards = () => {
  return axiosInstance.get("/contact-card/");
};

// PUT
export const updateContactCard = (id, data) => {
  return axiosInstance.put(`/contact-card/${id}/`, data);
};

export const getContactDetail = () => {
  return axiosInstance.get("/contact-detail/");
};

export const updateContactDetail = (data) => {
  return axiosInstance.put("/contact-detail/", data);
};

// GET all FAQs
export const getFAQs = () => {
  return axiosInstance.get("/faqs/");
};

// UPDATE FAQ (by id)
export const updateFAQ = (id, data) => {
  return axiosInstance.put(`/faqs/${id}/`, data);
};