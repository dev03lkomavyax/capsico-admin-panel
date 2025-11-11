import { useState } from "react";

// shadcn/ui component imports (adjust paths to your project)
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { id } from "@/utils/Id-util";
import { AddonGroupForm } from "./AddonGroupForm";
import { JSONPreview } from "./JSONPreview";
import { GroupIcon, PlusIcon } from "lucide-react";

/* ======================
   AddonsManager (root) - Vite compatible
 ====================== */
export default function AddonsManager({ groups, setGroups }) {
  // const [groups, setGroups] = useState([
  //   // pre-populated example group
  //   {
  //     id: id("group"),
  //     groupName: "Pizza Toppings",
  //     chooseMultiple: true,
  //     maxSelection: 3,
  //     adonsGroup: [
  //       {
  //         id: id("item"),
  //         name: "Pepperoni",
  //         price: 50,
  //         isDefault: true,
  //         isAvailable: true,
  //         isVeg: false,
  //         tags: ["Spicy"],
  //       },
  //       {
  //         id: id("item"),
  //         name: "Mushrooms",
  //         price: 40,
  //         isDefault: false,
  //         isAvailable: true,
  //         isVeg: true,
  //         tags: ["Bestseller"],
  //       },
  //     ],
  //   },
  // ]);

  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleAddGroup = () => {
    const g = {
      id: id("group"),
      groupName: "",
      chooseMultiple: false,
      maxSelection: 1,
      adonsGroup: [],
    };
    setGroups((s) => [...s, g]);
    setSelectedIndex(groups.length);
  };

  const handleUpdateGroup = (index, newGroup) => {
    const copy = [...groups];
    copy[index] = newGroup;
    setGroups(copy);
  };

  const handleDeleteGroup = (index) => {
    if (!confirm("Delete this group?")) return;
    const copy = [...groups];
    copy.splice(index, 1);
    setGroups(copy);
    setSelectedIndex((i) => Math.max(0, i - 1));
  };

  const handleSave = () => {
    // In real app: send groups to backend. For now, log and show alert.
    console.log("Saved groups:", groups);
    alert("Groups saved — check console for JSON output.");
  };

  return (
    <div className="">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6">
          {/* Groups list & New Group button */}
          <div className="flex flex-col gap-4 rounded-xl border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3 p-4 border-b border-border-light dark:border-border-dark">
              <p className="text-xl font-bold leading-tight tracking-tight">
                Add-on Groups
              </p>
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

            <div className="p-2 grid grid-cols-4 gap-4">
              {groups.map((g, i) => (
                <div
                  key={g.id}
                  onClick={() => setSelectedIndex(i)}
                  className={`flex-1 min-w-[200px] flex cursor-pointer items-center gap-4 rounded-lg px-4 min-h-14 justify-between ${
                    i === selectedIndex
                      ? "bg-primary/10 dark:bg-primary/20"
                      : "hover:bg-gray-100 dark:hover:bg-white/5 border"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <GroupIcon className="size-5" />

                    <p
                      className={`${
                        i === selectedIndex
                          ? "text-primary font-semibold"
                          : "text-text-light-primary font-normal"
                      } text-sm leading-normal flex-1 truncate`}
                    >
                      {g.groupName || "Unnamed Group"}
                    </p>
                  </div>

                  <div className="shrink-0">
                    <div className="flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 text-text-light-secondary dark:text-text-dark-secondary text-xs font-medium px-2.5 py-0.5">
                      {(g.adonsGroup || []).length} items
                    </div>
                  </div>
                </div>
              ))}

              {groups.length === 0 && <div className="px-3">No Groups added</div>}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            {/* Group editor & JSON preview */}
            <div className="rounded-xl border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark shadow-sm">
              {groups[selectedIndex] ? (
                <div>
                  <AddonGroupForm
                    group={groups[selectedIndex]}
                    onChange={(g) => handleUpdateGroup(selectedIndex, g)}
                    onDelete={() => handleDeleteGroup(selectedIndex)}
                  />

                  <div className="px-6 py-4 flex items-center justify-end gap-3">
                    <Button
                      type="button"
                      variant="ghost"
                      className="w-auto px-4"
                      onClick={() => {
                        setGroups([]);
                        setSelectedIndex(0);
                      }}
                    >
                      Reset All
                    </Button>
                    {/* <Button variant="capsico" className="w-auto px-4" type="button" onClick={handleSave}>
                      Save
                    </Button> */}
                  </div>
                </div>
              ) : (
                <div className="p-6">No group selected</div>
              )}
            </div>

            {/* <div className="grid md:grid-cols-2 gap-4">
              <JSONPreview data={groups} />
              <div className="p-4">
                <Card className="p-4">
                  <CardHeader>
                    <CardTitle>Help & Notes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc list-inside text-sm text-text-light-secondary dark:text-text-dark-secondary space-y-2">
                      <li>Click a group on the left to edit.</li>
                      <li>Use switches to toggle Default / Available / Veg.</li>
                      <li>Tags are comma separated in the Tags input.</li>
                      <li>
                        &quot;Save&quot; will log the JSON to console (replace
                        with API call in production).
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
