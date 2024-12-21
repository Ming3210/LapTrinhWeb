import axios from "axios";

export const getAllUsers = async () => {
  const res = await axios.get("http://localhost:8080/users");
  return res.data;
};
export const registerUser = async (userData) => {
  try {
    const res = await axios.post("http://localhost:8080/users", userData);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const getCurrentUser = async (id) => {
  const res = await axios.get(`http://localhost:8080/users/${id}`);
  return res.data;
};
