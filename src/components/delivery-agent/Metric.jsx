export const Metric = ({ label, value, negative = false }) => {
  const isNegative = negative && value !== 0;
  return (
    <div className="rounded-md border p-3 w-full">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p
        className={`font-medium ${
          isNegative ? "text-destructive-foreground" : ""
        }`}
      >
        {isNegative ? `- ₹ ${Math.abs(value)}` : `₹ ${value}`}
      </p>
    </div>
  );
};
