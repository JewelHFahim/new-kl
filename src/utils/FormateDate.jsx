const FormateDate = (dateString) => {
    const options = {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
    };
    const formattedDate = new Date(dateString).toLocaleString("en-GB", options);
    return formattedDate;
  };
  
  export default FormateDate;