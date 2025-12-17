import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Trash2Icon } from "lucide-react";
import MultiTagSelect from "../addons/MultiTagSelect";

export default function VariantItemForm({ item, onChange, onRemove }) {
  return (
    <Card className="p-4">
      <div className="grid grid-cols-[1fr_1fr_2fr_auto] gap-4">
        <div>
          <label className="text-xs font-medium">Name</label>
          <Input
            value={item.name}
            onChange={(e) => onChange({ ...item, name: e.target.value })}
          />
        </div>

        <div>
          <label className="text-xs font-medium">Price</label>
          <Input
            type="number"
            value={item.price}
            onChange={(e) =>
              onChange({ ...item, price: Number(e.target.value || 0) })
            }
          />
        </div>

        <div>
          <label className="text-xs font-medium">Tags</label>
          <MultiTagSelect
            value={item.tags?.[0] || ""}
            onChange={(val) => onChange({ ...item, tags: [val] })}
          />
        </div>

        <button type="button" onClick={onRemove} className="text-destructive">
          <Trash2Icon />
        </button>
      </div>

      <div className="flex gap-6 pt-4">
        <label className="flex items-center gap-2 text-sm">
          <Switch
            checked={item.isDefault}
            onCheckedChange={(v) => onChange({ ...item, isDefault: !!v })}
          />
          Default
        </label>

        <label className="flex items-center gap-2 text-sm">
          <Switch
            checked={item.isAvailable}
            onCheckedChange={(v) => onChange({ ...item, isAvailable: !!v })}
          />
          Available
        </label>

        <label className="flex items-center gap-2 text-sm">
          <Switch
            checked={item.isVeg}
            onCheckedChange={(v) => onChange({ ...item, isVeg: !!v })}
          />
          Veg
        </label>
      </div>
    </Card>
  );
}
