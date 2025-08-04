import React from "react";
import PropTypes from "prop-types";


export default function StatusToggleButton({
  active = false,
  loading = false,
  onClick,
  activeLabel = "Active",
  inactiveLabel = "Inactive",
  className = ""
}) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <button
        disabled={loading}
        onClick={onClick}
        type="button"
        className={`group relative inline-flex h-7 w-12 items-center rounded-full border-2 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2
        ${active 
          ? 'bg-gradient-to-r from-green-400 to-green-500 border-green-500 focus:ring-green-500 shadow-lg shadow-green-200/50' 
          : 'bg-gradient-to-r from-orange-400 to-orange-500 border-orange-500 focus:ring-orange-500 shadow-lg shadow-orange-200/50'
        }
        ${loading ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer hover:shadow-xl transform hover:scale-105 active:scale-95'}`}
        title={active ? 'Deactivate' : 'Activate'}
      >
        <span
          className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition-all duration-300 ease-in-out
            ${active ? 'translate-x-6' : 'translate-x-0.5'}
            ${loading ? '' : 'group-hover:shadow-xl'}`}
        >
          <span className={`absolute inset-0.5 rounded-full
            ${active ? 'bg-green-100' : 'bg-orange-100'} opacity-50`}></span>
        </span>

        {/* Track glow on hover */}
        <div className={`absolute inset-0 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300 
          ${active ? 'bg-green-300' : 'bg-orange-300'}`}></div>
      </button>
      <span className={`text-xs font-medium transition-colors duration-300 
        ${active ? 'text-green-600' : 'text-orange-600'}`}>
        {loading ? "Updating..." : (active ? activeLabel : inactiveLabel)}
      </span>
    </div>
  );
}

StatusToggleButton.propTypes = {
  active: PropTypes.bool,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
  activeLabel: PropTypes.string,
  inactiveLabel: PropTypes.string,
  className: PropTypes.string,
};
