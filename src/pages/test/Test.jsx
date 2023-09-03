import { createRef } from "react";
import Pdf from "react-to-pdf";

const ref = createRef();

const Test = () =>  {

  return (
    <div>

      <Pdf targetRef={ref} filename="code-example.pdf"> {({ toPdf }) => <button onClick={toPdf}>Generate Pdf</button>} </Pdf>

      <div ref={ref}>

        <h1>Hello CodeSandbox</h1>
        <h2>Start editing to see some magic happen!</h2>

      </div>
    </div>
  );
}

export default Test;