import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { id } from "@/utils/Id-util";
import { AddonItemForm } from "./AddonItemForm";
import { PlusSquareIcon, Trash2Icon } from "lucide-react";

/* ======================
   AddonGroupForm Component
   Props:
     - group: object
     - onChange(updatedGroup)
     - onDelete()
 ====================== */
export const AddonGroupForm = ({ group, onChange, onDelete }) => {
  const handleItemChange = (index, newItem) => {
    const newItems = [...(group.adonsGroup || [])];
    newItems[index] = newItem;
    onChange({ ...group, adonsGroup: newItems });
  };

  const handleAddItem = () => {
    const newItems = [
      ...(group.adonsGroup || []),
      {
        id: id("item"),
        name: "",
        price: 0,
        isDefault: false,
        isAvailable: true,
        isVeg: true,
        tags: [],
      },
    ];
    onChange({ ...group, adonsGroup: newItems });
  };

  const handleRemoveItem = (index) => {
    const newItems = [...(group.adonsGroup || [])];
    newItems.splice(index, 1);
    onChange({ ...group, adonsGroup: newItems });
  };

  return (
    <Card className="rounded-xl border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark shadow-sm">
      <div className="p-6">
        <h2 className="text-lg font-bold">Edit Group</h2>
        <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary mt-1">
          Modify the details for the group.
        </p>
      </div>

      <div className="border-t border-border-light dark:border-border-dark px-6 py-6">
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-text-light-secondary dark:text-text-dark-secondary mb-1.5">
                Group Name
              </label>
              <Input
                value={group.groupName}
                onChange={(e) =>
                  onChange({ ...group, groupName: e.target.value })
                }
                placeholder="Group Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-light-secondary dark:text-text-dark-secondary mb-1.5">
                Maximum Selections
              </label>
              <Input
                type="number"
                value={group.maxSelection}
                onChange={(e) =>
                  onChange({
                    ...group,
                    maxSelection: Number(e.target.value || 0),
                  })
                }
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-medium">
                Allow Multiple Selections
              </h3>
              <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
                Customers can select more than one item.
              </p>
            </div>
            <Switch
              checked={!!group.chooseMultiple}
              onCheckedChange={(v) =>
                onChange({ ...group, chooseMultiple: !!v })
              }
              className="data-[state=checked]:bg-[#4A67FF]"
            />
          </div>
        </div>
      </div>

      <div className="border-t border-border-light dark:border-border-dark px-6 py-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold">Items (Addons)</h3>
          <Button
            type="button"
            className="w-auto px-4"
            variant="outline"
            onClick={handleAddItem}
          >
            <PlusSquareIcon />
            Add New Item
          </Button>
        </div>

        <div className="space-y-4">
          {(group.adonsGroup || []).map((addon, i) => (
            <AddonItemForm
              key={addon.id || i}
              item={addon}
              onChange={(upd) => handleItemChange(i, upd)}
              onRemove={() => handleRemoveItem(i)}
            />
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-3 border-t border-border-light dark:border-border-dark bg-gray-50 dark:bg-card-dark/50 px-6 py-4 rounded-b-xl">
        <Button className="w-auto px-4" type="button" variant="destructive" onClick={onDelete}>
          <Trash2Icon />
          Delete Group
        </Button>
        {/* <Button
          type="button"
          variant="capsico"
          onClick={() => {
          }}
        >
          Save Group
        </Button> */}
      </div>
    </Card>
  );
};
