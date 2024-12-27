import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import ManageCategories from "../components/ManageCategories";
import FullPageLoader from "../components/FullPageLoader";
import { CreateContext } from "../Helper/Context";

function CategoryPage() {
  const { url } = useContext(CreateContext);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditing, setIsEditing] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const token = localStorage.getItem("admin_access_token"); // Get token from localStorage

  // Fetch categories from the API if not in localStorage
  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${url}/get-categories`, {
        headers: {
          Authorization: `Bearer ${token}`, // Add token in the request header
        },
      });
      if (response.status === 200) {
        setIsLoading(false);
        setCategories(response.data.categories);
        localStorage.setItem(
          "categories",
          JSON.stringify(response.data.categories)
        ); // Store in localStorage
      }
    } catch (err) {
      setError("Failed to fetch categories. Please try again.");
    }
  };

  // Check if categories exist in localStorage
  useEffect(() => {
    const storedCategories = localStorage.getItem("categories");
    if (storedCategories) {
      setCategories(JSON.parse(storedCategories));
      setIsLoading(false);
    }
    fetchCategories();
  }, []);

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEditToggle = (index) => setIsEditing(index);

  const handleUpdateCategory = (index, value) => {
    const updatedCategories = [...categories];
    updatedCategories[index].name = value;
    setCategories(updatedCategories);
  };

  const handleSave = async (index) => {
    const category = categories[index];
    try {
      await axios.put(
        `${url}/edit-category/${category._id}`,
        { name: category.name },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add token in the request header
          },
        }
      );
      // Update categories in localStorage after successful update
      localStorage.setItem("categories", JSON.stringify(categories));
      alert("Category updated successfully!");
      setIsEditing(null);
    } catch (err) {
      alert("Failed to update category.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await axios.delete(`${url}/remove-category/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Add token in the request header
          },
        });
        // Remove the category from the state and update localStorage
        const updatedCategories = categories.filter(
          (category) => category._id !== id
        );
        setCategories(updatedCategories);
        localStorage.setItem("categories", JSON.stringify(updatedCategories)); // Update localStorage
        alert("Category deleted successfully!");
      } catch (err) {
        alert("Failed to delete category.");
      }
    }
  };

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) {
      alert("Category name is required!");
      return;
    }
    try {
      const response = await axios.post(
        `${url}/create-category`,
        { name: newCategoryName },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add token in the request header
          },
        }
      );
      const updatedCategories = [...categories, response.data.category];
      setCategories(updatedCategories);
      localStorage.setItem("categories", JSON.stringify(updatedCategories)); // Update localStorage
      setNewCategoryName("");
      alert("Category added successfully!");
    } catch (err) {
      alert("Failed to add category.");
    }
  };

  // Disable scrolling when loading
  useEffect(() => {
    if (isLoading) {
      document.body.classList.add("prevent-scroll"); // Add class to prevent scrolling
    } else {
      document.body.classList.remove("prevent-scroll"); // Ensure scrollbar is removed
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove("prevent-scroll");
    };
  }, [isLoading]);

  return (
    <div>
      {isLoading ? (
        <FullPageLoader />
      ) : (
        <div className="pt-10">
          <div>
            <ManageCategories
              searchQuery={searchQuery}
              isEditing={isEditing}
              newCategoryName={newCategoryName}
              error={error}
              isLoading={isLoading}
              filteredCategories={filteredCategories}
              handleEditToggle={handleEditToggle}
              handleUpdateCategory={handleUpdateCategory}
              handleSave={handleSave}
              handleDelete={handleDelete}
              handleAddCategory={handleAddCategory}
              setSearchQuery={setSearchQuery}
              setNewCategoryName={setNewCategoryName}
              setIsEditing={setIsEditing}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default CategoryPage;
