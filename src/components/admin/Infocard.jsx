import { IndianRupee } from "lucide-react";

const Infocard = ({
  img,
  value,
  label,
  percentage,
  trendIcon,
  navigate = () => {},
  icon:Icon,
}) => {
  return (
    <div className="bg-[#FEFEFE] p-4 rounded-md" onClick={navigate}>
      <div className="flex gap-4 items-center justify-between">
        {img && <img className="w-14" src={img} alt="info-icon" />}
        {Icon && (
          <div className="size-14 bg-[#DEE3FF] rounded-full flex justify-center items-center">
            <Icon className="text-[#2C4EF6] size-7" />
          </div>
        )}
        <h2 className="font-inter text-[#232323] font-semibold text-4xl text-right">
          {value}
        </h2>
        {/* <div className="flex gap-1 items-center mt-2">
            {trendIcon && (
              <img className="w-4" src={trendIcon} alt="trend-icon" />
            )}
          </div> */}
      </div>
      <p className="font-inter font-semibold mt-3 text-[#858C92] text-sm text-right">
        {label}
      </p>
      <p className="font-inter text-xs text-[#BEC1C4]">{percentage}</p>
    </div>
  );
};

export default Infocard;
