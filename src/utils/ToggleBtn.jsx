/* eslint-disable react/prop-types */

const ToggleBtn = ({isChecked, setIsChecked}) => {


  console.log(isChecked)

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked)
  }

  return (
    <>
      <label className='themeSwitcherTwo relative inline-flex cursor-pointer select-none items-center'>
        <input
          type='checkbox'
          checked={isChecked}
          onChange={handleCheckboxChange}
          className='sr-only'
        />
        <span className='hidden label lg:flex items-center text-sm font-medium text-black'>
          Credit
        </span>

        <span
          className={`slider mx-4 flex h-4 w-[40px] items-center rounded-full p-1 duration-200 ${
            isChecked ? 'bg-[#212b36]' : 'bg-[#CCCCCE]'
          }`}
        >
          <span
            className={`dot h-5 w-5 rounded-full bg-primary duration-200 ${
              isChecked ? 'translate-x-[20px]' : '-translate-x-[4px]'
            }`}
          ></span>
        </span>

        <span className='hidden label lg:flex items-center text-sm font-medium text-black'>
          Debit
        </span>
      </label>
    </>
  )
}

export default ToggleBtn;
