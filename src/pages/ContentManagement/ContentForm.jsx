// pages/admin/ContentManagement/ContentForm.jsx
import { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import usePostApiReq from '@/hooks/usePostApiReq';
import useGetApiReq from '@/hooks/useGetApiReq';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import AdminWrapper from '@/components/admin-wrapper/AdminWrapper';


// const ContentForm = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { contentId } = useParams();
//   const isEditing = Boolean(contentId);

//   // Get banner data from location state if editing
//   const existingBanner = location.state?.banner;

//   const [formData, setFormData] = useState({
//     city: existingBanner?.city || '',
//     title: existingBanner?.title || '',
//     description: existingBanner?.description || '',
//     radius: existingBanner?.radius?.toString() || '10',
//     bannerType: existingBanner?.bannerType || 'capsico',
//     links: existingBanner?.images?.map(img => img.link) || [''],
//     images: []
//   });

//   const [cities, setCities] = useState([]);
//   const { res, isLoading, fetchData } = usePostApiReq();
//   const { res: cityRes, fetchData: fetchCities } = useGetApiReq();

//   // ✅ Fetch available cities
//   useEffect(() => {
//     fetchCities('/availableCities/getAllCities');
//   }, []);

//   useEffect(() => {
//     if (cityRes?.status === 200 || cityRes?.status === 201) {
//       const _cities = cityRes?.data?.data?.cities || cityRes?.data?.data || [];
//       setCities(_cities);
//     }
//   }, [cityRes]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleLinkChange = (index, value) => {
//     const newLinks = [...formData.links];
//     newLinks[index] = value;
//     setFormData(prev => ({
//       ...prev,
//       links: newLinks
//     }));
//   };

//   const addLinkField = () => {
//     setFormData(prev => ({
//       ...prev,
//       links: [...prev.links, '']
//     }));
//   };

//   const removeLinkField = (index) => {
//     if (formData.links.length > 1) {
//       const newLinks = formData.links.filter((_, i) => i !== index);
//       setFormData(prev => ({
//         ...prev,
//         links: newLinks
//       }));
//     }
//   };

//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);
//     setFormData(prev => ({
//       ...prev,
//       images: files
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const submitData = new FormData();
//     submitData.append('city', formData.city);
//     submitData.append('title', formData.title);
//     submitData.append('description', formData.description);
//     submitData.append('radius', formData.radius);
//     submitData.append('bannerType', formData.bannerType);
//     submitData.append('links', JSON.stringify(formData.links.filter(link => link.trim())));

//     // Append images
//     formData.images.forEach((image) => {
//       submitData.append('images', image);
//     });

//     await fetchData('/banner/create', submitData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     });
//   };

//   useEffect(() => {
//     if (res?.status === 200 || res?.status === 201) {
//       navigate('/admin/content-management');
//     }
//   }, [res, navigate]);

//   return (
//     <div className="p-6 bg-white min-h-screen">
//       {/* Header */}
//       <div className="mb-6">
//         <div className="flex items-center gap-4">
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={() => navigate('/admin/content-management')}
//           >
//             <ArrowLeft className="h-4 w-4 mr-2" />
//             Back
//           </Button>
//           <div>
//             <h1 className="text-2xl font-bold text-gray-800">
//               {isEditing ? 'Edit Banner' : 'Add New Banner'}
//             </h1>
//           </div>
//         </div>
//       </div>

//       {/* Form */}
//       <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

//           {/* ✅ City Dropdown (dynamic) */}
//           <div>
//             <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
//               City *
//             </label>
//             <select
//               id="city"
//               name="city"
//               value={formData.city}
//               onChange={handleInputChange}
//               required
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="">Select City</option>
//               {cities.map((c) => (
//                 <option key={c._id} value={c.city}>
//                   {c.city}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Banner Type */}
//           <div>
//             <label htmlFor="bannerType" className="block text-sm font-medium text-gray-700 mb-2">
//               Banner Type *
//             </label>
//             <select
//               id="bannerType"
//               name="bannerType"
//               value={formData.bannerType}
//               onChange={handleInputChange}
//               required
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="capsico">Capsico</option>
//               <option value="quickly">Quickly</option>
//               <option value="global">Global</option>
//               <option value="other">Other</option>
//             </select>
//           </div>

//           {/* Title */}
//           <div className="md:col-span-2">
//             <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
//               Title *
//             </label>
//             <input
//               type="text"
//               id="title"
//               name="title"
//               value={formData.title}
//               onChange={handleInputChange}
//               required
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter banner title"
//             />
//           </div>

//           {/* Description */}
//           <div className="md:col-span-2">
//             <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
//               Description
//             </label>
//             <textarea
//               id="description"
//               name="description"
//               value={formData.description}
//               onChange={handleInputChange}
//               rows={4}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter banner description"
//             />
//           </div>

//           {/* Radius */}
//           <div>
//             <label htmlFor="radius" className="block text-sm font-medium text-gray-700 mb-2">
//               Radius (km)
//             </label>
//             <input
//               type="number"
//               id="radius"
//               name="radius"
//               value={formData.radius}
//               onChange={handleInputChange}
//               min="1"
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="10"
//             />
//           </div>

//           {/* Images */}
//           <div>
//             <label htmlFor="images" className="block text-sm font-medium text-gray-700 mb-2">
//               Banner Images *
//             </label>
//             <input
//               type="file"
//               id="images"
//               multiple
//               accept="image/*"
//               onChange={handleImageChange}
//               required={!isEditing}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             <p className="text-xs text-gray-500 mt-1">Select multiple images for the banner</p>
//           </div>

//           {/* Links */}
//           <div className="md:col-span-2">
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Banner Links
//             </label>
//             {formData.links.map((link, index) => (
//               <div key={index} className="flex gap-2 mb-2">
//                 <input
//                   type="url"
//                   value={link}
//                   onChange={(e) => handleLinkChange(index, e.target.value)}
//                   className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder="https://example.com"
//                 />
//                 {formData.links.length > 1 && (
//                   <Button
//                     type="button"
//                     variant="outline"
//                     onClick={() => removeLinkField(index)}
//                     className="px-3 py-2 text-red-600 hover:text-red-800"
//                   >
//                     Remove
//                   </Button>
//                 )}
//               </div>
//             ))}
//             <Button
//               type="button"
//               variant="outline"
//               onClick={addLinkField}
//               className="text-blue-600 hover:text-blue-800 text-sm"
//             >
//               + Add another link
//             </Button>
//           </div>
//         </div>

//         {/* Submit Buttons */}
//         <div className="flex justify-end gap-4 mt-8">
//           <Button
//             type="button"
//             variant="outline"
//             onClick={() => navigate('/admin/content-management')}
//           >
//             Cancel
//           </Button>
//           <Button
//             type="submit"
//             disabled={isLoading}
//             className="bg-blue-500 hover:bg-blue-600 text-white"
//           >
//             {isLoading ? 'Saving...' : (isEditing ? 'Update Banner' : 'Create Banner')}
//           </Button>
//         </div>
//       </form>
//     </div>
//   );
// };


const ContentForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { contentId } = useParams();
  const isEditing = Boolean(contentId);

  // Get banner data from location state if editing
  const existingBanner = location.state?.banner;

  const [formData, setFormData] = useState({
    city: existingBanner?.city || '',
    title: existingBanner?.title || '',
    description: existingBanner?.description || '',
    radius: existingBanner?.radius?.toString() || '10',
    bannerType: existingBanner?.bannerType || 'capsico',
    links: existingBanner?.images?.map(img => img.link) || [''],
    images: [],
    startTime: existingBanner?.startTime ? new Date(existingBanner.startTime).toTimeString().slice(0,5) : '',
    endTime: existingBanner?.endTime ? new Date(existingBanner.endTime).toTimeString().slice(0,5) : ''
  });

  const [cities, setCities] = useState([]);
  const { res, isLoading, fetchData } = usePostApiReq();
  const { res: cityRes, fetchData: fetchCities } = useGetApiReq();

  // Fetch available cities
  useEffect(() => {
    fetchCities("/availableCities/get-all");
  }, []);

  useEffect(() => {
    if (cityRes?.status === 200 || cityRes?.status === 201) {
      console.log("cityRes", cityRes);
      
      const _cities = cityRes?.data?.cities || cityRes?.data?.data || [];
      setCities(_cities);
    }
  }, [cityRes]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLinkChange = (index, value) => {
    const newLinks = [...formData.links];
    newLinks[index] = value;
    setFormData(prev => ({
      ...prev,
      links: newLinks
    }));
  };

  const addLinkField = () => {
    setFormData(prev => ({
      ...prev,
      links: [...prev.links, '']
    }));
  };

  const removeLinkField = (index) => {
    if (formData.links.length > 1) {
      const newLinks = formData.links.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        links: newLinks
      }));
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      images: files
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submitData = new FormData();
    submitData.append('city', formData.city);
    submitData.append('title', formData.title);
    submitData.append('description', formData.description);
    submitData.append('radius', formData.radius);
    submitData.append('bannerType', formData.bannerType);
    submitData.append('links', JSON.stringify(formData.links.filter(link => link.trim())));

    // Convert time strings to full Date ISO strings
    if (formData.startTime) {
      const [hStart, mStart] = formData.startTime.split(':');
      const startDate = new Date();
      startDate.setHours(parseInt(hStart), parseInt(mStart), 0, 0);
      submitData.append('startTime', startDate.toISOString());
    }

    if (formData.endTime) {
      const [hEnd, mEnd] = formData.endTime.split(':');
      const endDate = new Date();
      endDate.setHours(parseInt(hEnd), parseInt(mEnd), 0, 0);
      submitData.append('endTime', endDate.toISOString());
    }

    // Append images
    formData.images.forEach((image) => {
      submitData.append('images', image);
    });

    if (contentId){

      await fetchData(`/banner/update/${contentId}`, submitData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } else{

      await fetchData('/banner/create', submitData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    }
  };

  useEffect(() => {
    if (res?.status === 200 || res?.status === 201) {
      navigate('/admin/content-management');
    }
  }, [res, navigate]);

  return (
    <AdminWrapper>
      <div className="min-h-screen">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/admin/content-management")}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {isEditing ? "Edit Banner" : "Add New Banner"}
              </h1>
            </div>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-lg p-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* City */}
            <div>
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                City *
              </label>
              <select
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select City</option>
                {cities.map((c) => (
                  <option key={c._id} value={c.city}>
                    {c.city}
                  </option>
                ))}
              </select>
            </div>

            {/* Banner Type */}
            <div>
              <label
                htmlFor="bannerType"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Banner Type *
              </label>
              <select
                id="bannerType"
                name="bannerType"
                value={formData.bannerType}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="capsico">Capsico</option>
                <option value="quickly">Quickly</option>
                <option value="global">Global</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Title */}
            <div className="md:col-span-2">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter banner title"
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter banner description"
              />
            </div>

            {/* Radius */}
            <div>
              <label
                htmlFor="radius"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Radius (km)
              </label>
              <input
                type="number"
                id="radius"
                name="radius"
                value={formData.radius}
                onChange={handleInputChange}
                min="1"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="10"
              />
            </div>

            {/* Start Time */}
            <div>
              <label
                htmlFor="startTime"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Start Time *
              </label>
              <input
                type="time"
                id="startTime"
                name="startTime"
                value={formData.startTime}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* End Time */}
            <div>
              <label
                htmlFor="endTime"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                End Time *
              </label>
              <input
                type="time"
                id="endTime"
                name="endTime"
                value={formData.endTime}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            {/* Images */}
            <div className="md:col-span-2">
              <label
                htmlFor="images"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Banner Images *
              </label>
              <input
                type="file"
                id="images"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                required={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                Select multiple images for the banner
              </p>
            </div>

            {/* Links */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Banner Links
              </label>
              {formData.links.map((link, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="url"
                    value={link}
                    onChange={(e) => handleLinkChange(index, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://example.com"
                  />
                  {formData.links.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => removeLinkField(index)}
                      className="px-3 py-2 w-auto text-red-600 hover:text-red-800"
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={addLinkField}
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                + Add another link
              </Button>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end gap-4 mt-8">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/admin/content-management")}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              {isLoading
                ? "Saving..."
                : isEditing
                ? "Update Banner"
                : "Create Banner"}
            </Button>
          </div>
        </form>
      </div>
    </AdminWrapper>
  );
};


// const ContentForm = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { contentId } = useParams();
//   const isEditing = Boolean(contentId);

//   const existingBanner = location.state?.banner;

//   const [formData, setFormData] = useState({
//     city: existingBanner?.city || '',
//     title: existingBanner?.title || '',
//     description: existingBanner?.description || '',
//     radius: existingBanner?.radius?.toString() || '10',
//     bannerType: existingBanner?.bannerType || 'capsico',
//     links: existingBanner?.images?.map(img => img.link) || [''],
//     images: [],
//     startTime: existingBanner?.startTime || '',
//     endTime: existingBanner?.endTime || ''
//   });

//   const [cities, setCities] = useState([]);
//   const { res, isLoading, fetchData } = usePostApiReq();
//   const { res: cityRes, fetchData: fetchCities } = useGetApiReq();

//   // ✅ Fetch available cities on mount
//   useEffect(() => {
//     fetchCities('/availableCities/getAllCities');
//   }, []);

//   // ✅ Update state when API responds
//   useEffect(() => {
//     if (cityRes?.status === 200 || cityRes?.status === 201) {
//       const _cities = cityRes?.data?.data?.cities || cityRes?.data?.data || [];
//       setCities(_cities);
//     }
//   }, [cityRes]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const submitData = new FormData();

//     Object.entries(formData).forEach(([key, value]) => {
//       if (key === 'links') {
//         submitData.append('links', JSON.stringify(value.filter(link => link.trim())));
//       } else if (key === 'images') {
//         value.forEach((image) => submitData.append('images', image));
//       } else {
//         submitData.append(key, value);
//       }
//     });

//     await fetchData('/banner/create', submitData, {
//       headers: { 'Content-Type': 'multipart/form-data' },
//     });
//   };

//   useEffect(() => {
//     if (res?.status === 200 || res?.status === 201) {
//       navigate('/admin/content-management');
//     }
//   }, [res, navigate]);

//   return (
//     <div className="p-6 bg-white min-h-screen">
//       <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
//           {/* ✅ City Dropdown (dynamic) */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               City *
//             </label>
//             <select
//               name="city"
//               value={formData.city}
//               onChange={handleInputChange}
//               required
//               className="w-full px-3 py-2 border border-gray-300 rounded-md"
//             >
//               <option value="">Select City</option>
//               {cities.map((c) => (
//                 <option key={c._id} value={c.city}>
//                   {c.city}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Start Time */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Start Time *
//             </label>
//             <input
//               type="datetime-local"
//               name="startTime"
//               value={formData.startTime}
//               onChange={handleInputChange}
//               required
//               className="w-full px-3 py-2 border border-gray-300 rounded-md"
//             />
//           </div>

//           {/* End Time */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               End Time *
//             </label>
//             <input
//               type="datetime-local"
//               name="endTime"
//               value={formData.endTime}
//               onChange={handleInputChange}
//               required
//               className="w-full px-3 py-2 border border-gray-300 rounded-md"
//             />
//           </div>
//         </div>

//         <div className="flex justify-end gap-4 mt-8">
//           <Button type="submit" disabled={isLoading}>
//             {isLoading ? 'Saving...' : (isEditing ? 'Update Banner' : 'Create Banner')}
//           </Button>
//         </div>
//       </form>
//     </div>
//   );
// };























// const ContentForm = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { contentId } = useParams();
//   const isEditing = Boolean(contentId);
  
//   // Get banner data from location state if editing
//   const existingBanner = location.state?.banner;

//   const [formData, setFormData] = useState({
//     city: existingBanner?.city || '',
//     title: existingBanner?.title || '',
//     description: existingBanner?.description || '',
//     radius: existingBanner?.radius?.toString() || '10',
//     bannerType: existingBanner?.bannerType || 'capsico',
//     links: existingBanner?.images?.map(img => img.link) || [''],
//     images: []
//   });

//   const { res, isLoading, fetchData } = usePostApiReq();

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleLinkChange = (index, value) => {
//     const newLinks = [...formData.links];
//     newLinks[index] = value;
//     setFormData(prev => ({
//       ...prev,
//       links: newLinks
//     }));
//   };

//   const addLinkField = () => {
//     setFormData(prev => ({
//       ...prev,
//       links: [...prev.links, '']
//     }));
//   };

//   const removeLinkField = (index) => {
//     if (formData.links.length > 1) {
//       const newLinks = formData.links.filter((_, i) => i !== index);
//       setFormData(prev => ({
//         ...prev,
//         links: newLinks
//       }));
//     }
//   };

//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);
//     setFormData(prev => ({
//       ...prev,
//       images: files
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const submitData = new FormData();
//     submitData.append('city', formData.city);
//     submitData.append('title', formData.title);
//     submitData.append('description', formData.description);
//     submitData.append('radius', formData.radius);
//     submitData.append('bannerType', formData.bannerType);
//     submitData.append('links', JSON.stringify(formData.links.filter(link => link.trim())));

//     // Append images
//     formData.images.forEach((image) => {
//       submitData.append('images', image);
//     });

//     // Use your existing endpoint
//     await fetchData('/banner/create', submitData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     });
//   };

//   useEffect(() => {
//     if (res?.status === 200 || res?.status === 201) {
//       navigate('/admin/content-management');
//     }
//   }, [res, navigate]);

//   return (
//     <div className="p-6 bg-white min-h-screen">
//       {/* Header */}
//       <div className="mb-6">
//         <div className="flex items-center gap-4">
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={() => navigate('/admin/content-management')}
//           >
//             <ArrowLeft className="h-4 w-4 mr-2" />
//             Back
//           </Button>
//           <div>
//             <h1 className="text-2xl font-bold text-gray-800">
//               {isEditing ? 'Edit Banner' : 'Add New Banner'}
//             </h1>
//           </div>
//         </div>
//       </div>

//       {/* Form */}
//       <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {/* City */}
//           <div>
//             <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
//               City *
//             </label>
//             <input
//               type="text"
//               id="city"
//               name="city"
//               value={formData.city}
//               onChange={handleInputChange}
//               required
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter city name"
//             />
//           </div>

//           {/* Banner Type */}
//           <div>
//             <label htmlFor="bannerType" className="block text-sm font-medium text-gray-700 mb-2">
//               Banner Type *
//             </label>
//             <select
//               id="bannerType"
//               name="bannerType"
//               value={formData.bannerType}
//               onChange={handleInputChange}
//               required
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="capsico">Capsico</option>
//               <option value="quickly">Quickly</option>
//               <option value="global">Global</option>
//               <option value="other">Other</option>
//             </select>
//           </div>

//           {/* Title */}
//           <div className="md:col-span-2">
//             <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
//               Title *
//             </label>
//             <input
//               type="text"
//               id="title"
//               name="title"
//               value={formData.title}
//               onChange={handleInputChange}
//               required
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter banner title"
//             />
//           </div>

//           {/* Description */}
//           <div className="md:col-span-2">
//             <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
//               Description
//             </label>
//             <textarea
//               id="description"
//               name="description"
//               value={formData.description}
//               onChange={handleInputChange}
//               rows={4}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter banner description"
//             />
//           </div>

//           {/* Radius */}
//           <div>
//             <label htmlFor="radius" className="block text-sm font-medium text-gray-700 mb-2">
//               Radius (km)
//             </label>
//             <input
//               type="number"
//               id="radius"
//               name="radius"
//               value={formData.radius}
//               onChange={handleInputChange}
//               min="1"
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="10"
//             />
//           </div>

//           {/* Images */}
//           <div>
//             <label htmlFor="images" className="block text-sm font-medium text-gray-700 mb-2">
//               Banner Images *
//             </label>
//             <input
//               type="file"
//               id="images"
//               multiple
//               accept="image/*"
//               onChange={handleImageChange}
//               required={!isEditing}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             <p className="text-xs text-gray-500 mt-1">Select multiple images for the banner</p>
//           </div>

//           {/* Links */}
//           <div className="md:col-span-2">
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Banner Links
//             </label>
//             {formData.links.map((link, index) => (
//               <div key={index} className="flex gap-2 mb-2">
//                 <input
//                   type="url"
//                   value={link}
//                   onChange={(e) => handleLinkChange(index, e.target.value)}
//                   className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder="https://example.com"
//                 />
//                 {formData.links.length > 1 && (
//                   <Button
//                     type="button"
//                     variant="outline"
//                     onClick={() => removeLinkField(index)}
//                     className="px-3 py-2 text-red-600 hover:text-red-800"
//                   >
//                     Remove
//                   </Button>
//                 )}
//               </div>
//             ))}
//             <Button
//               type="button"
//               variant="outline"
//               onClick={addLinkField}
//               className="text-blue-600 hover:text-blue-800 text-sm"
//             >
//               + Add another link
//             </Button>
//           </div>
//         </div>

//         {/* Submit Buttons */}
//         <div className="flex justify-end gap-4 mt-8">
//           <Button
//             type="button"
//             variant="outline"
//             onClick={() => navigate('/admin/content-management')}
//           >
//             Cancel
//           </Button>
//           <Button
//             type="submit"
//             disabled={isLoading}
//             className="bg-blue-500 hover:bg-blue-600 text-white"
//           >
//             {isLoading ? 'Saving...' : (isEditing ? 'Update Banner' : 'Create Banner')}
//           </Button>
//         </div>
//       </form>
//     </div>
//   );
// };

export default ContentForm;
