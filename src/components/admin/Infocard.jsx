
const Infocard = ({ img, value, label, percentage, trendIcon,navigate=()=>{} }) => {
    return (
        <div onClick={navigate} className="bg-[#FEFEFE] p-4 rounded-md flex gap-4 items-center">
            <img className="w-20" src={img} alt="info-icon" />
            <div>
                <h2 className="font-inter text-[#232323] font-semibold text-4xl">{value}</h2>
                <p className="font-inter font-semibold mt-3 text-[#858C92] text-sm">{label}</p>
                <div className="flex gap-1 items-center mt-2">
                    {trendIcon && <img className="w-4" src={trendIcon} alt="trend-icon" />}
                    <p className="font-inter text-xs text-[#BEC1C4]">{percentage}</p>
                </div>
            </div>
        </div>
    );
};

export default Infocard;
