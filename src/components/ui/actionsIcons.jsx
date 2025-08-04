// components/RowActions.jsx
import { Eye, Edit, Trash2 } from "lucide-react";
import PropTypes from "prop-types";
import React from "react";

// permissions: {view: true, edit: false, delete: false}
export default function RowActions({
  onView,
  onEdit,
  onDelete,
  permissions = { view: true, edit: true, delete: true },
  isDeleting = false,
  className = "",
}) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* View */}
      <button
        onClick={onView}
        disabled={!permissions.view}
        className={`group relative inline-flex items-center justify-center w-9 h-9 rounded-lg border border-green-200 bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 hover:border-green-300 hover:shadow-lg hover:shadow-green-200/50
          focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95
          ${!permissions.view && "opacity-60 cursor-not-allowed"}
        `}
        title="View Details"
        type="button"
      >
        <Eye className="h-4 w-4 text-green-600 group-hover:text-green-700 transition-colors duration-200" />
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-green-200 to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
      </button>

      {/* Edit */}
      <button
        onClick={onEdit}
        disabled={!permissions.edit}
        className={`group relative inline-flex items-center justify-center w-9 h-9 rounded-lg border border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 hover:border-purple-300 hover:shadow-lg hover:shadow-purple-200/50
          focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95
          ${!permissions.edit && "opacity-60 cursor-not-allowed"}
        `}
        title="Edit"
        type="button"
      >
        <Edit className="h-4 w-4 text-purple-600 group-hover:text-purple-700 transition-colors duration-200" />
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-purple-200 to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
      </button>

      {/* Delete */}
      <button
        onClick={onDelete}
        disabled={!permissions.delete || isDeleting}
        className={`group relative inline-flex items-center justify-center w-9 h-9 rounded-lg border border-red-200 bg-gradient-to-br from-red-50 to-red-100 hover:from-red-100 hover:to-red-200 hover:border-red-300 hover:shadow-lg hover:shadow-red-200/50
          focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95
          ${(isDeleting || !permissions.delete) && "opacity-60 cursor-not-allowed"}
        `}
        title="Delete"
        type="button"
      >
        <Trash2 className="h-4 w-4 text-red-600 group-hover:text-red-700 transition-colors duration-200" />
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-red-200 to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
      </button>
    </div>
  );
}

RowActions.propTypes = {
  onView: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  permissions: PropTypes.shape({
    view: PropTypes.bool,
    edit: PropTypes.bool,
    delete: PropTypes.bool,
  }),
  isDeleting: PropTypes.bool,
  className: PropTypes.string,
};
