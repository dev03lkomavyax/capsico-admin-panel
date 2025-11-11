// import React, { useState, useEffect } from 'react';
// import { FiPlus, FiX } from 'react-icons/fi';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Label } from '@/components/ui/label';
// import useGetApiReq from '@/hooks/useGetApiReq';
// import usePostApiReq from '@/hooks/usePostApiReq';

import React, { useState, useEffect } from "react";
import { FiPlus, FiX } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import useGetApiReq from "@/hooks/useGetApiReq";
import usePostApiReq from "@/hooks/usePostApiReq";

// const MenuTagSelector = ({
//   selectedTags = [],
//   onTagsChange,
//   tagType = 'menu', // 'menu', 'addon', or 'both'
//   className = ''
// }) => {
//   const [availableTags, setAvailableTags] = useState([]);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [showCreateForm, setShowCreateForm] = useState(false);
//   const [newTag, setNewTag] = useState({
//     name: '',
//     color: '#ffd700',
//     tagType: tagType === 'menu' ? 'menu' : tagType === 'addon' ? 'addon' : 'both',
//     description: '',
//     priority: 10
//   });

//   // Hooks for API calls
//   const { res: tagsRes, fetchData: fetchTags, isLoading: isLoadingTags } = useGetApiReq();
//   const { res: createRes, fetchData: createTag, isLoading: isCreating } = usePostApiReq();

//   // Fetch available tags
//   const loadTags = () => {
//     const endpoint = tagType === 'addon' ? '/capsicoTag/for-addon' : '/capsicoTag/for-menu';
//     console.log('Loading tags from:', endpoint);
//     fetchTags(endpoint);
//   };

//   useEffect(() => {
//     loadTags();
//   }, [tagType]);

//   useEffect(() => {
//     if (tagsRes?.status === 200) {
//       const tags = tagsRes.data?.data || tagsRes.data || [];
//       console.log('Tags loaded:', tags);
//       setAvailableTags(Array.isArray(tags) ? tags : []);
//     }
//   }, [tagsRes]);

//   useEffect(() => {
//     if (createRes?.status === 200 || createRes?.status === 201) {
//       // Tag created successfully, reload tags and close form
//       console.log('Tag created successfully:', createRes.data);
//       loadTags();
//       setShowCreateForm(false);
//       setNewTag({
//         name: '',
//         color: '#ffd700',
//         tagType: tagType === 'menu' ? 'menu' : tagType === 'addon' ? 'addon' : 'both',
//         description: '',
//         priority: 10
//       });

//       // Auto-select the newly created tag
//       const newTagData = createRes.data?.data;
//       if (newTagData && !selectedTags.includes(newTagData.id || newTagData._id)) {
//         const newTagId = newTagData.id || newTagData._id;
//         onTagsChange([...selectedTags, newTagId]);
//       }
//     }
//   }, [createRes]);

//   // Handle tag selection - Enhanced with better error handling
//   const handleTagSelect = (tag) => {
//     const tagId = tag.id || tag._id;
//     console.log('Selecting tag:', tag, 'ID:', tagId);
//     console.log('Current selected tags:', selectedTags);

//     if (!selectedTags.includes(tagId)) {
//       const newSelectedTags = [...selectedTags, tagId];
//       console.log('New selected tags:', newSelectedTags);
//       onTagsChange(newSelectedTags);
//     }
//     setIsDropdownOpen(false);
//   };

//   // Handle tag removal
//   const handleTagRemove = (tagId) => {
//     console.log('Removing tag:', tagId);
//     const newSelectedTags = selectedTags.filter(id => id !== tagId);
//     console.log('Tags after removal:', newSelectedTags);
//     onTagsChange(newSelectedTags);
//   };

//   // Handle create new tag - Enhanced validation
//   const handleCreateTag = () => {
//     if (!newTag.name.trim()) {
//       alert('Please enter tag name');
//       return;
//     }

//     // Validate color format
//     const colorRegex = /^#[0-9A-F]{6}$/i;
//     if (!colorRegex.test(newTag.color)) {
//       alert('Please enter a valid hex color (e.g., #ffd700)');
//       return;
//     }

//     const tagData = {
//       name: newTag.name.trim(),
//       color: newTag.color.toUpperCase(),
//       tagType: newTag.tagType,
//       description: newTag.description.trim(),
//       priority: parseInt(newTag.priority) || 10,
//       isActive: true
//     };

//     console.log('Creating tag:', tagData);
//     createTag('/capsicoTag/create', tagData);
//   };

//   // Get tag details by ID - Enhanced to handle both string and object IDs
//   const getTagById = (tagId) => {
//     return availableTags.find(tag => {
//       const currentTagId = tag.id || tag._id;
//       return currentTagId === tagId || currentTagId?.toString() === tagId?.toString();
//     });
//   };

//   // Get tag display name - Enhanced fallback logic
//   const getTagDisplayName = (tag) => {
//     if (!tag) return 'Unknown Tag';
//     return tag.displayName || tag.name || 'Unknown Tag';
//   };

//   // Filter available tags (exclude already selected)
//   const availableForSelection = availableTags.filter(
//     tag => !selectedTags.includes(tag.id || tag._id)
//   );

//   // Close dropdown when clicking outside - Enhanced
//   const handleDropdownToggle = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsDropdownOpen(!isDropdownOpen);
//   };

//   // Close dropdown when clicking outside the component
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (isDropdownOpen && !event.target.closest('.tag-dropdown-container')) {
//         setIsDropdownOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [isDropdownOpen]);

//   return (
//     <div className={`space-y-4 ${className}`}>
//       {/* Selected Tags Display */}
//       <div>
//         <Label className="text-sm font-medium text-gray-700">Selected Tags</Label>
//         <div className="flex flex-wrap gap-2 mt-2 min-h-[40px] p-2 border border-gray-200 rounded-md bg-gray-50">
//           {selectedTags.length === 0 ? (
//             <span className="text-gray-400 text-sm">No tags selected</span>
//           ) : (
//             selectedTags.map(tagId => {
//               const tag = getTagById(tagId);
//               const tagName = getTagDisplayName(tag);

//               return (
//                 <span
//                   key={tagId}
//                   style={{ backgroundColor: tag?.color || '#6b7280' }}
//                   className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-white text-sm font-medium shadow-sm"
//                 >
//                   {tagName}
//                   <button
//                     type="button"
//                     onClick={(e) => {
//                       e.preventDefault();
//                       e.stopPropagation();
//                       handleTagRemove(tagId);
//                     }}
//                     className="hover:bg-black/20 rounded-full p-0.5 ml-1 transition-colors"
//                   >
//                     <FiX size={12} />
//                   </button>
//                 </span>
//               );
//             })
//           )}
//         </div>
//       </div>

//       {/* Tags Selector Dropdown */}
//       <div className="relative tag-dropdown-container">
//         <Label className="text-sm font-medium text-gray-700">Available Tags</Label>
//         <div className="relative mt-2">
//           <button
//             type="button"
//             onClick={handleDropdownToggle}
//             className="w-full px-3 py-2 text-left border border-gray-300 rounded-md bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//             disabled={isLoadingTags}
//           >
//             {isLoadingTags ? 'Loading tags...' : 'Click to select tags'}
//             <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
//               {isDropdownOpen ? '▲' : '▼'}
//             </span>
//           </button>

//           {isDropdownOpen && (
//             <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
//               {availableForSelection.length === 0 ? (
//                 <div className="px-4 py-3 text-gray-500 text-sm text-center">
//                   {availableTags.length === 0 ? 'No tags available' : 'All tags selected'}
//                 </div>
//               ) : (
//                 <div className="py-1">
//                   {availableForSelection.map(tag => (
//                     <button
//                       key={tag.id || tag._id}
//                       type="button"
//                       onClick={(e) => {
//                         e.preventDefault();
//                         e.stopPropagation();
//                         console.log('Tag clicked:', tag);
//                         handleTagSelect(tag);
//                       }}
//                       className="w-full px-4 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none flex items-center gap-2 transition-colors"
//                     >
//                       <span
//                         className="inline-block w-4 h-4 rounded-full flex-shrink-0 border border-gray-200"
//                         style={{ backgroundColor: tag.color }}
//                       />
//                       <span className="flex-1 text-sm font-medium">{getTagDisplayName(tag)}</span>
//                       {tag.description && (
//                         <span className="text-xs text-gray-500 truncate max-w-[100px]">
//                           {tag.description}
//                         </span>
//                       )}
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Create New Tag Section */}
//       <div className="border-t pt-4">
//         {!showCreateForm ? (
//           <Button
//             type="button"
//             variant="outline"
//             onClick={(e) => {
//               e.preventDefault();
//               e.stopPropagation();
//               setShowCreateForm(true);
//             }}
//             className="w-full flex items-center gap-2 border-dashed border-blue-400 text-blue-600 hover:bg-blue-50 transition-colors"
//           >
//             <FiPlus size={16} />
//             Create New Tag
//           </Button>
//         ) : (
//           <div className="space-y-4 p-4 border border-dashed border-blue-400 rounded-md bg-blue-50/30">
//             <div className="flex items-center justify-between">
//               <h4 className="font-medium text-blue-900">Create New Tag</h4>
//               {/* Preview */}
//               {newTag.name && (
//                 <span
//                   style={{ backgroundColor: newTag.color }}
//                   className="inline-flex items-center px-2 py-1 rounded-full text-white text-xs font-medium"
//                 >
//                   {newTag.name}
//                 </span>
//               )}
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <Label htmlFor="tagName" className="text-sm font-medium">Tag Name</Label>
//                 <Input
//                   id="tagName"
//                   value={newTag.name}
//                   onChange={(e) => setNewTag(prev => ({ ...prev, name: e.target.value }))}
//                   placeholder="e.g., Bestseller"
//                   className="mt-1"
//                 />
//               </div>

//               <div>
//                 <Label htmlFor="tagColor" className="text-sm font-medium">Color</Label>
//                 <div className="flex gap-2 mt-1">
//                   <input
//                     id="tagColor"
//                     type="color"
//                     value={newTag.color}
//                     onChange={(e) => setNewTag(prev => ({ ...prev, color: e.target.value }))}
//                     className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
//                   />
//                   <Input
//                     value={newTag.color}
//                     onChange={(e) => setNewTag(prev => ({ ...prev, color: e.target.value }))}
//                     placeholder="#ffd700"
//                     className="flex-1"
//                     pattern="^#[0-9A-Fa-f]{6}$"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <Label htmlFor="tagType" className="text-sm font-medium">Tag Type</Label>
//                 <Select
//                   value={newTag.tagType}
//                   onValueChange={(value) => setNewTag(prev => ({ ...prev, tagType: value }))}
//                 >
//                   <SelectTrigger className="mt-1">
//                     <SelectValue />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="menu">Menu Only</SelectItem>
//                     <SelectItem value="addon">Addon Only</SelectItem>
//                     <SelectItem value="both">Both Menu & Addon</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>

//               <div>
//                 <Label htmlFor="priority" className="text-sm font-medium">Priority</Label>
//                 <Input
//                   id="priority"
//                   type="number"
//                   value={newTag.priority}
//                   onChange={(e) => setNewTag(prev => ({ ...prev, priority: parseInt(e.target.value) || 1 }))}
//                   placeholder="10"
//                   min="1"
//                   max="100"
//                   className="mt-1"
//                 />
//               </div>
//             </div>

//             <div>
//               <Label htmlFor="description" className="text-sm font-medium">Description</Label>
//               <Input
//                 id="description"
//                 value={newTag.description}
//                 onChange={(e) => setNewTag(prev => ({ ...prev, description: e.target.value }))}
//                 placeholder="Most popular items"
//                 className="mt-1"
//                 maxLength={200}
//               />
//             </div>

//             <div className="flex gap-2">
//               <Button
//                 type="button"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   e.stopPropagation();
//                   handleCreateTag();
//                 }}
//                 disabled={isCreating || !newTag.name.trim()}
//                 className="flex-1 bg-blue-600 hover:bg-blue-700"
//               >
//                 {isCreating ? 'Creating...' : 'Create Tag'}
//               </Button>
//               <Button
//                 type="button"
//                 variant="outline"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   e.stopPropagation();
//                   setShowCreateForm(false);
//                 }}
//                 className="flex-1"
//               >
//                 Cancel
//               </Button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MenuTagSelector;

// import React, { useState, useEffect } from 'react';
// import { FiPlus, FiX } from 'react-icons/fi';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Label } from '@/components/ui/label';
// import useGetApiReq from '@/hooks/useGetApiReq';
// import usePostApiReq from '@/hooks/usePostApiReq';

const MenuTagSelector = ({
  // For backward compatibility, selectedTags can be an array of IDs or minimal objects [{id,name}]
  selectedTags = [],
  onTagsChange,
  tagType = "menu", // 'menu', 'addon', or 'both'
  className = "",
  // New: when true, emit [{ id, name }] on selection (default true for addon)
  returnMinimalObjects,
}) => {
  // Default behavior: addon returns minimal objects; menu keeps previous IDs
  const [isEmpty, setIsEmpty] = useState(false)
  const shouldReturnObjects =
    typeof returnMinimalObjects === "boolean"
      ? returnMinimalObjects
      : tagType === "addon";

  const [availableTags, setAvailableTags] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newTag, setNewTag] = useState({
    name: "",
    color: "#ffd700",
    tagType:
      tagType === "menu" ? "menu" : tagType === "addon" ? "addon" : "both",
    description: "",
    priority: 10,
  });

  // API hooks
  const {
    res: tagsRes,
    fetchData: fetchTags,
    isLoading: isLoadingTags,
  } = useGetApiReq();
  const {
    res: createRes,
    fetchData: createTag,
    isLoading: isCreating,
  } = usePostApiReq();

  // Load tags for the given type
  const loadTags = () => {
    const endpoint =
      tagType === "addon" ? "/capsicoTag/for-addon" : "/capsicoTag/for-menu";
    fetchTags(endpoint);
  };

  useEffect(() => {
    loadTags();
  }, [tagType]);

  useEffect(() => {
    if (tagsRes?.status === 200) {
      const tags = tagsRes.data?.data || tagsRes.data || [];
      setAvailableTags(Array.isArray(tags) ? tags : []);
    }
  }, [tagsRes]);

  useEffect(() => {
    if (createRes?.status === 200 || createRes?.status === 201) {
      loadTags();
      setShowCreateForm(false);
      setNewTag({
        name: "",
        color: "#ffd700",
        tagType:
          tagType === "menu" ? "menu" : tagType === "addon" ? "addon" : "both",
        description: "",
        priority: 10,
      });
      const newTagData = createRes.data?.data;
      if (newTagData) {
        const newTagId = newTagData.id || newTagData._id;
        // Respect output mode when auto-selecting
        if (shouldReturnObjects) {
          const minimal = makeMinimalTag(newTagId);
          const exists = normalizeSelected(
            selectedTags,
            shouldReturnObjects
          ).some((t) => t.id === minimal.id);
          if (!exists)
            onTagsChange([...normalizeSelected(selectedTags, true), minimal]);
        } else {
          const ids = normalizeSelected(selectedTags, false);
          if (!ids.includes(newTagId)) onTagsChange([...ids, newTagId]);
        }
      }
    }
  }, [createRes]);

  // Build minimal object with Unknown fallback
  const makeMinimalTag = (id) => {
    const found = availableTags.find(
      (t) => (t.id || t._id)?.toString() === id?.toString()
    );
    if (found)
      return {
        id: found.id || found._id,
        name: found.name || found.displayName || "Unknown Tag",
      };
    // free/custom chip like "Extra" -> keep ID, set Unknown name
    return { id, name: "Unknown Tag" };
  };

  // Normalize current selection into either array of ids or array of minimal objects
  const normalizeSelected = (value, toObjects) => {
    if (toObjects) {
      return (value || []).map((v) => {
        if (v && typeof v === "object" && v.id)
          return { id: v.id, name: v.name || "Unknown Tag" };
        return makeMinimalTag(v);
      });
    }
    // to IDs
    return (value || [])
      .map((v) => (typeof v === "object" ? v.id : v))
      .filter(Boolean);
  };

  // Selection handler
  const handleTagSelect = (tag) => {
    const tagId = tag.id || tag._id;
    if (shouldReturnObjects) {
      const current = normalizeSelected(selectedTags, true);
      if (!current.some((t) => t.id === tagId)) {
        onTagsChange([...current, makeMinimalTag(tagId)]);
      }
    } else {
      const ids = normalizeSelected(selectedTags, false);
      if (!ids.includes(tagId)) onTagsChange([...ids, tagId]);
    }
    setIsDropdownOpen(false);
  };

  // Removal handler
  const handleTagRemove = (tagOrId) => {
    if (shouldReturnObjects) {
      const current = normalizeSelected(selectedTags, true).filter(
        (t) => t.id !== (typeof tagOrId === "object" ? tagOrId.id : tagOrId)
      );
      onTagsChange(current);
    } else {
      const ids = normalizeSelected(selectedTags, false).filter(
        (id) => id !== (typeof tagOrId === "object" ? tagOrId.id : tagOrId)
      );
      onTagsChange(ids);
    }
  };

  // Find by id (for coloring in chips)
  const getById = (id) =>
    availableTags.find((t) => (t.id || t._id)?.toString() === id?.toString());

  // Display helpers
  const getDisplayName = (objOrId) => {
    if (objOrId && typeof objOrId === "object" && objOrId.name)
      return objOrId.name;
    const id = typeof objOrId === "object" ? objOrId.id : objOrId;
    const f = getById(id);
    return f?.name || f?.displayName || "Unknown Tag";
  };

  const getColor = (objOrId) => {
    const id = typeof objOrId === "object" ? objOrId.id : objOrId;
    const f = getById(id);
    return f?.color || "#6b7280";
  };

  // Filter available list to exclude current selection (by id)
  const selectedIds = normalizeSelected(selectedTags, false);
  const availableForSelection = availableTags.filter(
    (t) => !selectedIds.includes(t.id || t._id)
  );

  // Dropdown toggle
  const handleDropdownToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Click-outside close
  useEffect(() => {
    const onDocClick = (e) => {
      if (isDropdownOpen && !e.target.closest(".tag-dropdown-container"))
        setIsDropdownOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [isDropdownOpen]);

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Selected Tags */}
      <div>
        <Label className="text-sm font-medium text-gray-700">
          Selected Tags
        </Label>
        <div className="flex flex-wrap gap-2 mt-2 min-h-[40px] p-2 border border-gray-200 rounded-md bg-gray-50">
          {selectedIds.length === 0 ? (
            <span className="text-gray-400 text-sm">No tags selected</span>
          ) : (
            normalizeSelected(selectedTags, shouldReturnObjects).map((item) => {
              const id = item.id || item;
              const name = getDisplayName(item);
              return (
                <span
                  key={id}
                  style={{ backgroundColor: getColor(item) }}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-white text-sm font-medium shadow-sm"
                >
                  {name}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleTagRemove(item);
                    }}
                    className="hover:bg-black/20 rounded-full p-0.5 ml-1 transition-colors"
                  >
                    <FiX size={12} />
                  </button>
                </span>
              );
            })
          )}
        </div>

        {/* Optional: plain text readout for debugging/preview: "Name (ID: ...)" */}
        {selectedIds.length > 0 && (
          <div className="mt-2 text-xs text-gray-600">
            {normalizeSelected(selectedTags, shouldReturnObjects).map(
              (item) => {
                const id = item.id || item;
                const name = getDisplayName(item);
                return (
                  <span key={id} className="mr-3">
                    {name} (ID: {id})
                  </span>
                );
              }
            )}
          </div>
        )}
      </div>

      {/* Tags selector */}
      <div className="relative tag-dropdown-container">
        <Label className="text-sm font-medium text-gray-700">
          Available Tags
        </Label>
        <div className="relative mt-2">
          <button
            type="button"
            onClick={handleDropdownToggle}
            className="w-full px-3 py-2 text-left border border-gray-300 rounded-md bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            disabled={isLoadingTags}
          >
            {isLoadingTags ? "Loading tags..." : "Click to select tags"}
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {isDropdownOpen ? "▲" : "▼"}
            </span>
          </button>

          {isDropdownOpen && (
            <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
              {availableForSelection.length === 0 ? (
                <div className="px-4 py-3 text-gray-500 text-sm text-center">
                  {availableTags.length === 0
                    ? "No tags available"
                    : "All tags selected"}
                </div>
              ) : (
                <div className="py-1">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setIsEmpty(true)
                      onTagsChange([])
                      setIsDropdownOpen(false);
                      // handleTagSelect("");
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none flex items-center gap-2 transition-colors"
                  >
                    <span
                      className="inline-block w-4 h-4 rounded-full flex-shrink-0 border border-gray-200"
                      style={{ backgroundColor: "gray" }}
                    />
                    <span className="flex-1 text-sm font-medium">NO TAG</span>
                    <span className="text-xs text-gray-500 truncate max-w-[100px]">
                      No Tag
                    </span>
                  </button>
                  {availableForSelection.map((tag) => (
                    <button
                      key={tag.id || tag._id}
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleTagSelect(tag);
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none flex items-center gap-2 transition-colors"
                    >
                      <span
                        className="inline-block w-4 h-4 rounded-full flex-shrink-0 border border-gray-200"
                        style={{ backgroundColor: tag.color }}
                      />
                      <span className="flex-1 text-sm font-medium">
                        {tag.name || tag.displayName || "Unknown Tag"}
                      </span>
                      {tag.description && (
                        <span className="text-xs text-gray-500 truncate max-w-[100px]">
                          {tag.description}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Create New Tag */}
      <div className="border-t pt-4">
        {!showCreateForm ? (
          <Button
            type="button"
            variant="outline"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowCreateForm(true);
            }}
            className="w-full flex items-center gap-2 border-dashed border-blue-400 text-blue-600 hover:bg-blue-50 transition-colors"
          >
            <FiPlus size={16} />
            Create New Tag
          </Button>
        ) : (
          <div className="space-y-4 p-4 border border-dashed border-blue-400 rounded-md bg-blue-50/30">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-blue-900">Create New Tag</h4>
              {newTag.name && (
                <span
                  style={{ backgroundColor: newTag.color }}
                  className="inline-flex items-center px-2 py-1 rounded-full text-white text-xs font-medium"
                >
                  {newTag.name}
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="tagName" className="text-sm font-medium">
                  Tag Name
                </Label>
                <Input
                  id="tagName"
                  value={newTag.name}
                  onChange={(e) =>
                    setNewTag((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="e.g., Bestseller"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="tagColor" className="text-sm font-medium">
                  Color
                </Label>
                <div className="flex gap-2 mt-1">
                  <input
                    id="tagColor"
                    type="color"
                    value={newTag.color}
                    onChange={(e) =>
                      setNewTag((prev) => ({ ...prev, color: e.target.value }))
                    }
                    className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                  />
                  <Input
                    value={newTag.color}
                    onChange={(e) =>
                      setNewTag((prev) => ({ ...prev, color: e.target.value }))
                    }
                    placeholder="#ffd700"
                    className="flex-1"
                    pattern="^#[0-9A-Fa-f]{6}$"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="tagType" className="text-sm font-medium">
                  Tag Type
                </Label>
                <Select
                  value={newTag.tagType}
                  onValueChange={(value) =>
                    setNewTag((prev) => ({ ...prev, tagType: value }))
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="menu">Menu Only</SelectItem>
                    <SelectItem value="addon">Addon Only</SelectItem>
                    <SelectItem value="both">Both Menu & Addon</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="priority" className="text-sm font-medium">
                  Priority
                </Label>
                <Input
                  id="priority"
                  type="number"
                  value={newTag.priority}
                  onChange={(e) =>
                    setNewTag((prev) => ({
                      ...prev,
                      priority: parseInt(e.target.value) || 1,
                    }))
                  }
                  placeholder="10"
                  min="1"
                  max="100"
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description" className="text-sm font-medium">
                Description
              </Label>
              <Input
                id="description"
                value={newTag.description}
                onChange={(e) =>
                  setNewTag((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Most popular items"
                className="mt-1"
                maxLength={200}
              />
            </div>

            <div className="flex gap-2">
              <Button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (!newTag.name.trim())
                    return alert("Please enter tag name");
                  const colorRegex = /^#[0-9A-F]{6}$/i;
                  if (!colorRegex.test(newTag.color))
                    return alert(
                      "Please enter a valid hex color (e.g., #ffd700)"
                    );
                  const tagData = {
                    name: newTag.name.trim(),
                    color: newTag.color.toUpperCase(),
                    tagType: newTag.tagType,
                    description: newTag.description.trim(),
                    priority: parseInt(newTag.priority) || 10,
                    isActive: true,
                  };
                  createTag("/capsicoTag/create", tagData);
                }}
                disabled={isCreating || !newTag.name.trim()}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                {isCreating ? "Creating..." : "Create Tag"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowCreateForm(false);
                }}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuTagSelector;
