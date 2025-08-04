import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import AdminWrapper from "@/components/admin-wrapper/AdminWrapper";
import Spinner from "@/components/Spinner";
import useGetApiReq from "@/hooks/useGetApiReq";
import usePostApiReq from "@/hooks/useGetApiReq";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const CityFormPage = () => {
  const { id } = useParams();
  const query = useQuery();
  const mode = query.get("mode"); // "edit", "view", or "add"
  const isView = mode === "view";
  const isEdit = mode === "edit";
  const isAdd = mode === "add" || (!id && !mode);
  const navigate = useNavigate();

  const { res: getRes, fetchData: fetchCity, isLoading: getLoading } = useGetApiReq();
  const { res: postRes, fetchData: saveCity, isLoading: postLoading } = usePostApiReq();

  const [fields, setFields] = useState({
    city: "",
    latitude: "",
    longitude: "",
    radius: "",
    description: "",
    status: true
  });
  const [error, setError] = useState("");

  useEffect(() => {
    // Only fetch city for edit or view
    if ((isEdit || isView) && id) {
      fetchCity(`/availableCities/getCityById/${id}`);
    }
    // eslint-disable-next-line
  }, [id, isEdit, isView]);

  // Prefill fields when city info is fetched
  useEffect(() => {
    if ((isEdit || isView) && getRes?.status === 200 && getRes.data) {
      setFields({
        city: getRes.data.city || "",
        latitude: getRes.data.latitude || "",
        longitude: getRes.data.longitude || "",
        radius: getRes.data.radius || "",
        description: getRes.data.description || "",
        status: getRes.data.status !== undefined ? getRes.data.status : true
      });
    }
    // For Add mode, clear fields if needed
    if (isAdd) {
      setFields({
        city: "",
        latitude: "",
        longitude: "",
        radius: "",
        description: "",
        status: true
      });
    }
    // eslint-disable-next-line
  }, [getRes, isEdit, isView, isAdd]);

  useEffect(() => {
    if ((postRes?.status === 200 || postRes?.status === 201) && (isAdd || isEdit)) {
      navigate("/admin/available-cities");
    } else if (postRes && postRes.status !== 200 && postRes.status !== 201) {
      setError(postRes?.data?.message || "Failed to save city!");
    }
    // eslint-disable-next-line
  }, [postRes]);

  function handleChange(e) {
    if (isView) return;
    setFields({ ...fields, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!fields.city || !fields.latitude || !fields.longitude || !fields.radius || !fields.description) {
      setError("All fields are required.");
      return;
    }
    if (isEdit && id) {
      saveCity(`/availableCities/updateCity/${id}`, {
        city: fields.city,
        latitude: parseFloat(fields.latitude),
        longitude: parseFloat(fields.longitude),
        radius: parseFloat(fields.radius),
        description: fields.description,
        status: fields.status
      });
    } else if (isAdd) {
      saveCity("/availableCities/create", {
        city: fields.city,
        latitude: parseFloat(fields.latitude),
        longitude: parseFloat(fields.longitude),
        radius: parseFloat(fields.radius),
        description: fields.description,
        status: fields.status
      });
    }
  }


  // Show Spinner while fetching data for edit/view
  if ((isEdit || isView) && getLoading) {
    return (
      <AdminWrapper>
        <div className="w-full flex items-center justify-center min-h-screen">
          <Spinner />
        </div>
      </AdminWrapper>
    );
  }

  return (
    <AdminWrapper>
      <section className="px-0 py-0 w-full min-h-screen">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-[#000000] text-xl font-medium font-roboto">
            {isAdd ? "Add City" : isEdit ? "Edit City" : "View City"}
          </h2>
          <button
            className="h-10 border-[1px] border-[#109cf1] rounded-lg text-[#FFFFFF] text-sm font-medium font-inter px-4 bg-[#109cf1] flex items-center gap-2"
            onClick={() => navigate("/admin/available-cities")}
          >
            Back
          </button>
        </div>
        <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium">City *</label>
              <input
                name="city"
                value={fields.city}
                onChange={handleChange}
                disabled={isView}
                className="w-full border px-3 py-2 rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Latitude *</label>
              <input
                name="latitude"
                type="number"
                step="any"
                value={fields.latitude}
                onChange={handleChange}
                disabled={isView}
                className="w-full border px-3 py-2 rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Longitude *</label>
              <input
                name="longitude"
                type="number"
                step="any"
                value={fields.longitude}
                onChange={handleChange}
                disabled={isView}
                className="w-full border px-3 py-2 rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Radius *</label>
              <input
                name="radius"
                type="number"
                step="any"
                value={fields.radius}
                onChange={handleChange}
                disabled={isView}
                className="w-full border px-3 py-2 rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Description *</label>
              <textarea
                name="description"
                value={fields.description}
                onChange={handleChange}
                disabled={isView}
                className="w-full border px-3 py-2 rounded"
                required
              ></textarea>
            </div>
            <div className="flex items-center gap-2">
              <label>Status:</label>
              <input
                name="status"
                type="checkbox"
                checked={fields.status}
                disabled={isView}
                onChange={e => {
                  if (!isView) setFields({ ...fields, status: e.target.checked });
                }}
              />{" "}
              {fields.status ? "Active" : "Inactive"}
            </div>
            {!isView && (
              <button
                type="submit"
                className="bg-teal-500 text-white rounded px-4 py-2 mt-2 hover:bg-teal-600 disabled:opacity-75"
                disabled={postLoading}
              >
                {postLoading ? <Spinner size={16} /> : (isEdit ? "Update" : "Submit")}
              </button>
            )}
            {(getLoading || postLoading) && <Spinner />}
            {error && <div className="text-red-500 text-sm">{error}</div>}
          </form>
        </div>
      </section>
    </AdminWrapper>
  );
};

export default CityFormPage;
