import axios from "axios";

export const getCategories = async () => {
  const res = await axios.get("http://localhost:8080/categories");
  return res.data;
};

export const getAllProducts = async () => {
  const res = await axios.get("http://localhost:8080/products");
  return res.data;
};

export const updateCategory = async (categories) => {
  console.log(categories);

  const res = await axios.put(
    `http://localhost:8080/categories/${categories.id}`,
    categories
  );
  return res.data;
};
