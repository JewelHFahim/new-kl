/* eslint-disable react/prop-types */
import DatePicker from "react-datepicker";

const DropdownMonth = ({ startDate, setStartDate, endDate, setEndDate }) => {
  return (
    <>

      <div>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          className="bg-transparent w-[110px] rounded-[20px] px-2 text-sm border"
        />
      </div>

      <div>
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          className="bg-transparent w-[110px] rounded-[20px] px-2 text-sm border"
        />
      </div>
    </>
  );
};

export default DropdownMonth;
