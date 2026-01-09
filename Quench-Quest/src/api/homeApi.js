//homeApi.js

import axiosInstance from "../axiosInstance";

// GET Home Hero content
export const getHomeHero = () => {
  return axiosInstance.get(`/hero/`);
};


// UPDATE Home Hero content
export const updateHomeHero = (id, data) => {
  return axiosInstance.put(`/hero/${id}/`, data);
};

// GET core objective
export const getCoreObjective = () => {
  return axiosInstance.get("/objectives/");
};

// UPDATE core objective
export const updateCoreObjective = (id, data) => {
  return axiosInstance.put(`/objectives/${id}/`, data);
};

// GET Featured Programs (Home)
export const getHomePrograms = () => {
  return axiosInstance.get("/programs-home/");
};

// UPDATE Featured Programs (Home)
export const updateHomePrograms = (id, data) => {
  return axiosInstance.put(`/programs-home/${id}/`, data);
};

// GET Who We Are
export const getWhoWeAre = () => {
  return axiosInstance.get("/who-we-are/");
};

// UPDATE Who We Are
export const updateWhoWeAre = (id, data) => {
  return axiosInstance.put(`/who-we-are/${id}/`, data);
};

// GET Latest News
export const getNews = () => {
  return axiosInstance.get("/news/");
};

// UPDATE News item
export const updateNews = (id, data) => {
  return axiosInstance.put(`/news/${id}/`, data);
};

// GET Impact section
export const getImpact = () => {
  return axiosInstance.get("/impact/");
};

// UPDATE Impact item
export const updateImpact = (id, data) => {
  return axiosInstance.put(`/impact/${id}/`, data);
};