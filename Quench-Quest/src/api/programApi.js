// programApi.js
import axiosInstance from "../axiosInstance";

// GET Program Intro Header
export const getProgramIntro = () => {
  return axiosInstance.get("/program-intro/");
};

// UPDATE Program Intro Header (for admin/editing)
export const updateProgramIntro = (id, data) => {
  return axiosInstance.put(`/program-intro/${id}/`, data);
};

// --- Program Cards ---
export const getProgramCards = () => {
  return axiosInstance.get("/program-cards/");
};

export const updateProgramCard = (id, data) => {
  return axiosInstance.put(`/program-cards/${id}/`, data);
};

// GET all sliders (stories)
export const getProgramSlider = () => {
  return axiosInstance.get("/program-sliders/");
};

// UPDATE single slider
export const updateProgramSlider = (id, data) => {
  return axiosInstance.put(`/program-sliders/${id}/`, data);
};

// GET Support Our Mission
export const getProgramMission = () => {
  return axiosInstance.get("/program-mission/");
};

// UPDATE Support Our Mission
export const updateProgramMission = (id, data) => {
  return axiosInstance.put(`/program-mission/${id}/`, data);
};