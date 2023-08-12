const CButton = ({children, className}) => {
  return (
    <>
      <button className={`w-[153px] h-[40px] rounded-[8px] bg-[#BBD1E8] text-[14px] font-[500] ${className}`}>
       {children}
      </button>
    </>
  );
};

export default CButton;
