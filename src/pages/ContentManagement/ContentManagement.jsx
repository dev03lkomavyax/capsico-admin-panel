// pages/admin/ContentManagement/ContentManagement.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useGetApiReq from '@/hooks/useGetApiReq';
import BannerComp from '@/components/bannerContent/BannerComp';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableHead,
    TableCell,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Plus } from 'lucide-react';

const ContentManagement = () => {
  const [banners, setBanners] = useState([]);
  const [filters, setFilters] = useState({
    bannerType: '',
    city: '',
    page: 1,
    limit: 10
  });

  const { res: bannersRes, isLoading, fetchData: fetchBanners } = useGetApiReq();

  const getBanners = () => {
    // Build query parameters
    const params = new URLSearchParams();
    
    if (filters.bannerType) params.append('bannerType', filters.bannerType);
    if (filters.city) params.append('city', filters.city);
    params.append('page', filters.page.toString());
    params.append('limit', filters.limit.toString());

    // Use your existing endpoint - your backend expects these as query params
    const queryString = params.toString();
    const url = `/banner/getAllBannerType${queryString ? `?${queryString}` : ''}`;
    
    fetchBanners(url);
  };

  useEffect(() => {
    getBanners();
  }, [filters]);

  useEffect(() => {
    if (bannersRes?.status === 200) {
      setBanners(bannersRes.data.banners || []);
    }
  }, [bannersRes]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      page: 1 // Reset to first page when filtering
    }));
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      {/* Header - matching your Available Cities layout */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Content Management</h1>
        </div>
        <Link to="/admin/content-management/add">
          <Button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Banner
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Banner Type
            </label>
            <select
              value={filters.bannerType}
              onChange={(e) => handleFilterChange('bannerType', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Types</option>
              <option value="capsico">Capsico</option>
              <option value="quickly">Quickly</option>
              <option value="global">Global</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              City
            </label>
            <input
              type="text"
              value={filters.city}
              onChange={(e) => handleFilterChange('city', e.target.value)}
              placeholder="Filter by city"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Items per page
            </label>
            <select
              value={filters.limit}
              onChange={(e) => handleFilterChange('limit', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>
          <div className="flex items-end">
            <Button 
              onClick={getBanners}
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? 'Loading...' : 'Search'}
            </Button>
          </div>
        </div>
      </div>

      {/* Table - matching your screenshot layout */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</TableHead>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">City</TableHead>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Banner Type</TableHead>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Radius</TableHead>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</TableHead>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Images</TableHead>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</TableHead>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</TableHead>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {banners.map((banner) => (
              <BannerComp
                key={banner._id}
                banner={banner}
                getBanners={getBanners}
              />
            ))}
            {banners.length === 0 && !isLoading && (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-8 text-gray-500">
                  No banners found. Create your first banner to get started.
                </TableCell>
              </TableRow>
            )}
            {isLoading && (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-8 text-gray-500">
                  Loading banners...
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {bannersRes?.data?.totalPages > 1 && (
        <div className="flex items-center justify-center py-4">
          <nav className="flex items-center space-x-1">
            <button 
              onClick={() => handleFilterChange('page', Math.max(1, filters.page - 1))}
              disabled={filters.page <= 1}
              className="p-2 text-gray-500 hover:text-gray-700 disabled:opacity-50"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"/>
              </svg>
            </button>
            <span className="px-3 py-1 text-sm text-blue-600 bg-blue-50 rounded">
              {filters.page} of {bannersRes?.data?.totalPages || 1}
            </span>
            <button 
              onClick={() => handleFilterChange('page', Math.min(bannersRes?.data?.totalPages || 1, filters.page + 1))}
              disabled={filters.page >= (bannersRes?.data?.totalPages || 1)}
              className="p-2 text-gray-500 hover:text-gray-700 disabled:opacity-50"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"/>
              </svg>
            </button>
          </nav>
        </div>
      )}
    </div>
  );
};

export default ContentManagement;
