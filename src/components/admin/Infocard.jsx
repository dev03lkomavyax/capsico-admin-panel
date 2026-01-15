import { IndianRupee } from "lucide-react";

const Infocard = ({
  img,
  value,
  label,
  percentage,
  trendIcon,
  navigate = () => {},
  icon: Icon,
}) => {
  return (
    <div className="bg-[#FEFEFE] p-4 rounded-md" onClick={navigate}>
      <div className="flex gap-4 items-center justify-between">
        {img && <img className="w-14" src={img} alt="info-icon" />}
        <p className="font-inter font-semibold  text-[#858C92] text-sm text-right">
          {label}
        </p>
        {Icon && (
          <div className="size-12 bg-[#DEE3FF] rounded-full flex justify-center items-center">
            <Icon className="text-[#2C4EF6] size-7" />
          </div>
        )}
      </div>
      <h2 className="font-inter text-[#232323] font-semibold text-4xl mt-2">
        {value}
      </h2>
    </div>
  );
};

export default Infocard;
