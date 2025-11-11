import useGetApiReq from "@/hooks/useGetApiReq";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import DataNotFound from "@/components/DataNotFound";

const MultiTagSelect = ({ value, onChange }) => {
  const [tags, setTags] = useState([]);

  const {
    res: tagsRes,
    fetchData: fetchTags,
    isLoading: isLoadingTags,
  } = useGetApiReq();

  const getTags = () => {
    fetchTags("/capsicoTag/for-addon");
  };

  useEffect(() => {
    getTags();
  }, []);

  useEffect(() => {
    if (tagsRes?.status === 200) {
      const tags = tagsRes.data?.data || tagsRes.data || [];

      setTags(tags.map((tag) => ({ label: tag.name, value: tag.id })));
    }
  }, [tagsRes]);

//   console.log("tags", tags);

  return (
    <div>
      <Select onValueChange={onChange} value={value || tags?.[0]?.id}>
        <SelectTrigger>
          <SelectValue placeholder="Select Tag" />
        </SelectTrigger>
        <SelectContent>
          {tags.map((tag) => (
            <SelectItem key={tag.value} value={tag.value}>
              {tag.label}
            </SelectItem>
          ))}
          {tags.length === 0 && <DataNotFound name="Tags" />}
        </SelectContent>
      </Select>
    </div>
  );
};

export default MultiTagSelect;
