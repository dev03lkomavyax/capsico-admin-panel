import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { TrashIcon } from "lucide-react";
import MultiTagSelect from "./MultiTagSelect";

/* ======================
   AddonItemForm Component
   Controlled component to edit a single addon item
   Props:
     - item: object
     - onChange(updatedItem)
     - onRemove()
 ====================== */
export const AddonItemForm = ({ item, onChange, onRemove }) => {
  return (
    <Card className="p-4 border border-border-light dark:border-border-dark">
      <div className="grid grid-cols-[1fr_1fr_2fr_auto] gap-x-4 gap-y-4">
        <div className="">
          <label className="block text-xs font-medium text-text-light-secondary dark:text-text-dark-secondary mb-1">
            Name
          </label>
          <Input
            value={item.name}
            onChange={(e) => onChange({ ...item, name: e.target.value })}
            placeholder="Addon name"
          />
        </div>

        <div className="">
          <label className="block text-xs font-medium text-text-light-secondary dark:text-text-dark-secondary mb-1">
            Price (₹)
          </label>
          <Input
            type="number"
            value={item.price}
            onChange={(e) =>
              onChange({ ...item, price: Number(e.target.value || 0) })
            }
            placeholder="0"
          />
        </div>

        <div className="">
          <label className="block text-xs font-medium text-text-light-secondary dark:text-text-dark-secondary mb-1">
            Tags
          </label>
          {/* <Input
            value={(item.tags || []).join(", ")}
            onChange={(e) =>
              onChange({
                ...item,
                tags: e.target.value
                  .split(",")
                  .map((t) => t.trim())
                  .filter(Boolean),
              })
            }
            placeholder="comma separated tags"
          /> */}
          <MultiTagSelect
            value={item.tags[0] || ""}
            onChange={(value) => onChange({ ...item, tags: [value] })}
          />
        </div>

        <div className="lg:col-span-1 flex justify-end self-center">
          <button
            type="button"
            onClick={onRemove}
            className="flex size-9 items-center justify-center rounded-md text-destructive hover:bg-destructive/10"
            aria-label="Remove item"
          >
            <TrashIcon className="size-5" />
          </button>
        </div>
      </div>
      <div className="lg:col-span-3 flex items-center gap-4 pt-5 self-center">
        <div className="flex items-center gap-2">
          <Switch
            checked={!!item.isDefault}
            onCheckedChange={(v) => onChange({ ...item, isDefault: !!v })}
            className="data-[state=checked]:bg-[#4A67FF]"
          />
          <span className="text-sm">Default</span>
        </div>

        <div className="flex items-center gap-2">
          <Switch
            checked={!!item.isAvailable}
            onCheckedChange={(v) => onChange({ ...item, isAvailable: !!v })}
            className="data-[state=checked]:bg-[#4A67FF]"
          />
          <span className="text-sm">Available</span>
        </div>

        <div className="flex items-center gap-2">
          <Switch
            checked={!!item.isVeg}
            onCheckedChange={(v) => onChange({ ...item, isVeg: !!v })}
            className="data-[state=checked]:bg-[#4A67FF]"
          />
          <span className="text-sm">Veg</span>
        </div>
      </div>
    </Card>
  );
};
