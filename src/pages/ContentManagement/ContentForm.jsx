// pages/admin/ContentManagement/ContentForm.jsx
import { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import usePostApiReq from '@/hooks/usePostApiReq';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

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
    images: []
  });

  const { res, isLoading, fetchData } = usePostApiReq();

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

    // Append images
    formData.images.forEach((image) => {
      submitData.append('images', image);
    });

    // Use your existing endpoint
    await fetchData('/banner/create', submitData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  useEffect(() => {
    if (res?.status === 200 || res?.status === 201) {
      navigate('/admin/content-management');
    }
  }, [res, navigate]);

  return (
    <div className="p-6 bg-white min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/admin/content-management')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {isEditing ? 'Edit Banner' : 'Add New Banner'}
            </h1>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* City */}
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
              City *
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter city name"
            />
          </div>

          {/* Banner Type */}
          <div>
            <label htmlFor="bannerType" className="block text-sm font-medium text-gray-700 mb-2">
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
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter banner title"
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter banner description"
            />
          </div>

          {/* Radius */}
          <div>
            <label htmlFor="radius" className="block text-sm font-medium text-gray-700 mb-2">
              Radius (km)
            </label>
            <input
              type="number"
              id="radius"
              name="radius"
              value={formData.radius}
              onChange={handleInputChange}
              min="1"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="10"
            />
          </div>

          {/* Images */}
          <div>
            <label htmlFor="images" className="block text-sm font-medium text-gray-700 mb-2">
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
            <p className="text-xs text-gray-500 mt-1">Select multiple images for the banner</p>
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
                    className="px-3 py-2 text-red-600 hover:text-red-800"
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
            onClick={() => navigate('/admin/content-management')}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            {isLoading ? 'Saving...' : (isEditing ? 'Update Banner' : 'Create Banner')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ContentForm;
