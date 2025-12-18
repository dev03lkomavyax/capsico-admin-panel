import { useState } from "react";
import { Button } from "@/components/ui/button";
import { GroupIcon, PlusIcon } from "lucide-react";
import { id } from "@/utils/Id-util";
import VariantGroupForm from "./VariantGroupForm";

export default function VariantGroupsManager({ groups, setGroups }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleAddGroup = () => {
    const newGroup = {
      id: id("variant-group"),
      groupName: "",
      variantTextLabel: "",
      required: true,
      variantType: "single",
      minSelection: 0,
      maxSelection: 1,
      variants: [],
    };
    setGroups((prev) => [...prev, newGroup]);
    setSelectedIndex(groups.length);
  };

  const handleUpdateGroup = (index, updatedGroup) => {
    const copy = [...groups];
    copy[index] = updatedGroup;
    setGroups(copy);
  };

  const handleDeleteGroup = (index) => {
    // if (!confirm("Delete this variant group?")) return;
    const copy = [...groups];
    copy.splice(index, 1);
    setGroups(copy);
    setSelectedIndex((i) => Math.max(0, i - 1));
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Group List */}
      <div className="rounded-xl border bg-card shadow-sm">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold">Variant Groups</h2>
          <Button
            type="button"
            onClick={handleAddGroup}
            className="flex items-center gap-2 w-auto px-4"
            variant="capsico"
          >
            <PlusIcon />
            New Group
          </Button>
        </div>

        {groups.length > 0 && <p className="px-4 pt-2 text-sm">Select group</p>}
        <div className="grid grid-cols-1 gap-4 p-4">
          {groups.map((group, i) => (
            <div
              key={group.id}
              onClick={() => setSelectedIndex(i)}
              className={`cursor-pointer flex items-center justify-between rounded-lg border px-4 py-3 ${
                i === selectedIndex ? "bg-primary/10" : "hover:bg-muted"
              }`}
            >
              <div className="flex items-center gap-3">
                <GroupIcon className="size-5" />
                <span className="text-sm font-medium truncate">
                  {group.groupName || "Unnamed Group"}
                </span>
              </div>
              <span className="text-xs bg-muted rounded-full px-2 py-0.5">
                {group.variants.length} items
              </span>
            </div>
          ))}

          {groups.length === 0 && <p>No groups added</p>}
        </div>
      </div>

      {/* Editor */}
      <div className="rounded-xl border bg-card shadow-sm">
        {groups[selectedIndex] ? (
          <VariantGroupForm
            group={groups[selectedIndex]}
            onChange={(g) => handleUpdateGroup(selectedIndex, g)}
            onDelete={() => handleDeleteGroup(selectedIndex)}
          />
        ) : (
          <div className="p-6">No group selected</div>
        )}
      </div>
    </div>
  );
}
