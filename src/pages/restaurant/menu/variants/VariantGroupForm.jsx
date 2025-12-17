import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { PlusSquareIcon, Trash2Icon } from "lucide-react";
import { id } from "@/utils/Id-util";
import VariantItemForm from "./VariantItemForm";

export default function VariantGroupForm({ group, onChange, onDelete }) {
  const updateVariant = (index, updatedItem) => {
    const variants = [...group.variants];
    variants[index] = updatedItem;
    onChange({ ...group, variants });
  };

  const addVariant = () => {
    onChange({
      ...group,
      variants: [
        ...group.variants,
        {
          id: id("variant"),
          name: "",
          price: 0,
          isDefault: false,
          isAvailable: true,
          isVeg: true,
          tags: [],
        },
      ],
    });
  };

  const removeVariant = (index) => {
    const variants = [...group.variants];
    variants.splice(index, 1);
    onChange({ ...group, variants });
  };

  return (
    <Card className="rounded-xl">
      <div className="p-6 border-b">
        <h3 className="text-lg font-bold">Edit Variant Group</h3>
      </div>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Group Name</label>
            <Input
              value={group.groupName}
              onChange={(e) =>
                onChange({ ...group, groupName: e.target.value })
              }
            />
          </div>

          <div>
            <label className="text-sm font-medium">Label Text</label>
            <Input
              value={group.variantTextLabel}
              onChange={(e) =>
                onChange({ ...group, variantTextLabel: e.target.value })
              }
              placeholder={`Select ${group.groupName || "option"}`}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium">Min Selection</label>
            <Input
              type="number"
              value={group.minSelection}
              onChange={(e) =>
                onChange({
                  ...group,
                  minSelection: Number(e.target.value || 0),
                })
              }
            />
          </div>

          <div>
            <label className="text-sm font-medium">Max Selection</label>
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

          <div className="flex items-center gap-3 pt-6">
            <Switch
              checked={group.variantType === "multiple"}
              onCheckedChange={(v) =>
                onChange({
                  ...group,
                  variantType: v ? "multiple" : "single",
                })
              }
            />
            <span>Allow Multiple</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="font-medium">Required</span>
          <Switch
            checked={group.required}
            onCheckedChange={(v) => onChange({ ...group, required: !!v })}
          />
        </div>
      </div>

      <div className="border-t p-6">
        <div className="flex justify-between mb-4">
          <h4 className="font-bold">Variants</h4>

          <Button
            type="button"
            className="w-auto px-4"
            variant="outline"
            onClick={addVariant}
          >
            <PlusSquareIcon />
            Add Variant
          </Button>
        </div>

        <div className="space-y-4">
          {group.variants.map((variant, i) => (
            <VariantItemForm
              key={variant.id}
              item={variant}
              onChange={(v) => updateVariant(i, v)}
              onRemove={() => removeVariant(i)}
            />
          ))}
        </div>
      </div>

      <div className="border-t p-4 flex justify-end">
        <Button type="button" variant="destructive" onClick={onDelete}>
          <Trash2Icon /> Delete Group
        </Button>
      </div>
    </Card>
  );
}
