const CButton = ({children}) => {
  return (
    <>
      <button className="w-[153px] h-[40px] rounded-[8px] bg-[#BBD1E8] text-[14px] font-[500]">
       {children}
      </button>
    </>
  );
};

export default CButton;
