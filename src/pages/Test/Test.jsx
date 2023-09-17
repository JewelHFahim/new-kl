import { useRef } from "react";
import ReactToPrint from "react-to-print";

const Test = () => {
  const componentRef = useRef();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
      <h1>Buyer Invoice</h1>

      <ReactToPrint
        trigger={() => <button className="btn">Print</button>}
        content={() => componentRef.current}
      />

      <div ref={componentRef}>
        <p className="text-green-600 text-xl font-semibold">Print My InVoice</p>
      </div>
      
    </div>
  );
};

export default Test;
