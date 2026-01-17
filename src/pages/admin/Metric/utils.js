export const fillMissingBuckets = (data = [], range, valueKey = "value") => {
  const map = new Map(data.map((d) => [d.label, d]));

  let buckets = [];

  if (range === "today") {
    buckets = Array.from({ length: 24 }, (_, i) => i);
  }

  if (range === "month") {
    buckets = [1, 2, 3, 4, 5];
  }

  if (range === "year") {
    buckets = Array.from({ length: 12 }, (_, i) => i + 1);
  }

  return buckets.map((label) => {
    const item = map.get(label);
    return item ? item : { label, [valueKey]: 0 };
  });
};

export const round2 = (value) => Number((Number(value) || 0).toFixed(2));
