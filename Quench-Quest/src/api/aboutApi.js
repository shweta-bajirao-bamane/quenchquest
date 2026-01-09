// aboutApi.js

import axiosInstance from "../axiosInstance";

// GET About Intro (hero) content
export const getAboutIntro = () => {
  return axiosInstance.get(`/intro/`);
};

// UPDATE About Intro (hero) content
export const updateAboutIntro = (id, data) => {
  return axiosInstance.put(`/intro/${id}/`, data);
};

// GET About "Who We Are" content (under About section)
export const getAboutWho = () => {
  return axiosInstance.get(`/about/who-we-are/`);
};

// UPDATE About "Who We Are" content
export const updateAboutWho = (id, data) => {
  return axiosInstance.put(`/about/who-we-are/${id}/`, data);
};

// GET Mission & Vision content
export const getMissionVision = () => {
  return axiosInstance.get(`/mission-vision/`);
};

// UPDATE Mission & Vision content
export const updateMissionVision = (id, data) => {
  return axiosInstance.put(`/mission-vision/${id}/`, data);
};

// GET Core Objectives list
export const getCoreObjectives = () => {
  return axiosInstance.get(`/coreobjectives/`);
};

// UPDATE a Core Objective
export const updateCoreObjective = (id, data) => {
  return axiosInstance.put(`/coreobjectives/${id}/`, data);
};

// GET Leadership list
export const getLeadership = () => {
  return axiosInstance.get(`/leadership/`);
};

// UPDATE a Leadership member
export const updateLeadership = (id, data) => {
  return axiosInstance.put(`/leadership/${id}/`, data);
};

// GET Awards / Sliders
export const getAwards = () => {
  return axiosInstance.get("/sliders/");
};

// UPDATE Award / Slider
export const updateAward = (id, data) => {
  return axiosInstance.put(`/sliders/${id}/`, data);
};


// Fetch partners
export const fetchPartnersApi = () => {
  return axiosInstance.get("/partners/");
};

// Update partners (PUT)
export const updatePartnersApi = (id, data) => {
  return axiosInstance.put(`/partners/${id}/`, data);
};