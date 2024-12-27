import React from "react";

const ManageCategories = ({
  searchQuery,
  isEditing,
  newCategoryName,
  error,
  isLoading,
  filteredCategories,
  handleEditToggle,
  handleUpdateCategory,
  handleSave,
  handleDelete,
  handleAddCategory,
  setSearchQuery,
  setNewCategoryName,
  setIsEditing,
}) => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-[#262D35] rounded-lg shadow-lg border border-gray-700">
      <h2 className="text-3xl font-bold text-gray-100 mb-6 text-center">
        Manage Categories
      </h2>

      {/* Search and Add Category */}
      <div className="flex gap-6 mb-6">
        {/* Search Input */}
        <div className="w-full sm:w-1/2">
          <label
            htmlFor="search"
            className="block text-gray-300 font-medium mb-2"
          >
            Search Category
          </label>
          <input
            type="text"
            id="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search categories..."
            className="w-full px-4 py-2 bg-[#262D35] text-gray-200 border border-gray-600 rounded-md focus:outline-none"
          />
        </div>

        {/* Add Category Input */}
        <div className="w-full sm:w-1/2">
          <label
            htmlFor="new-category"
            className="block text-gray-300 font-medium mb-2"
          >
            Add New Category
          </label>
          <div className="flex space-x-2">
            <input
              type="text"
              id="new-category"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="Category name"
              className="flex-grow px-4 py-2 bg-[#262D35] text-gray-200 border border-gray-600 rounded-md focus:outline-none"
            />
            <button
              onClick={handleAddCategory}
              className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none transition-all duration-300 ease-in-out"
            >
              Add
            </button>
          </div>
        </div>
      </div>

      {/* Categories Table */}
      {isLoading ? (
        <p className="text-center text-gray-400">Loading categories...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : filteredCategories.length === 0 ? (
        <p className="text-center text-gray-400">No categories found.</p>
      ) : (
        <div className="overflow-x-auto max-h-96">
          <table className="min-w-full bg-[#262D35] border border-gray-700 rounded-lg">
            <thead className="bg-gray-700 sticky top-0 z-10">
              <tr>
                <th className="px-4 py-3 text-left text-gray-300 font-semibold">
                  No.
                </th>
                <th className="px-4 py-3 text-left text-gray-300 font-semibold">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-gray-300 font-semibold">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-gray-300 font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredCategories.map((category, index) => (
                <tr
                  key={category._id}
                  className="border-b border-gray-700 hover:bg-gray-700 transition-all duration-300 ease-in-out"
                >
                  <td className="px-4 py-2 text-gray-200">{index + 1}</td>
                  <td className="px-4 py-2 text-gray-200">
                    {isEditing === index ? (
                      <input
                        type="text"
                        value={category.name}
                        onChange={(e) =>
                          handleUpdateCategory(index, e.target.value)
                        }
                        className="px-3 py-1 bg-[#262D35] text-gray-200 border border-gray-600 rounded-md focus:outline-none"
                      />
                    ) : (
                      category.name
                    )}
                  </td>
                  <td className="px-4 py-2 text-gray-400">
                    {new Date(category.createdAt).toLocaleDateString(
                      "default",
                      {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      }
                    )}
                  </td>
                  <td className="px-4 py-2 flex items-center space-x-3">
                    {isEditing === index ? (
                      <>
                        <button
                          onClick={() => handleSave(index)}
                          className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setIsEditing(null)}
                          className="px-3 py-1 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-300 ease-in-out"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEditToggle(index)}
                          className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 ease-in-out"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(category._id)}
                          className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300 ease-in-out"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageCategories;
