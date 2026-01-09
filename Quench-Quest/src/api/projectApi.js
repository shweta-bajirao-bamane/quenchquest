import axiosInstance from "../axiosInstance";

// GET all projects
export const getProjects = () => {
  return axiosInstance.get("/projects/");
};

// UPDATE project (admin use)
export const updateProject = (id, data) => {
  return axiosInstance.put(`/projects/${id}/`, data);
};
