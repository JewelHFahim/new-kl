
/* eslint-disable react/prop-types */
const DashBoardStatisticks = ({ data }) => {

  return (
    <>
      <div className="w-full h-[112px] rounded-[8px] border border-[#150F33] px-4 py-6 flex flex-col gap-2 shadow-xl">
        <div className="flex justify-between items-center">
          <p className="text-2xl"> {data.icon} </p>
          <p className="text-[24px] font-[500] text-[#3D5797]">
            {data.amount}
          </p>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-[14px] font-[600] text-textColorBlack ">
            {data.title}
          </p>
          <p className="text-4xl">{data.graph}</p>
        </div>
      </div>
    </>
  );
};

export default DashBoardStatisticks;
