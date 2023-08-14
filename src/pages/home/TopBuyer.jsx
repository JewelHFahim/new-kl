/* eslint-disable react/prop-types */

const TopBuyer = ({sellerData, user}) => {
    return (
        <>
            <div className="mt-12">
        <h1 className="text-textColorBlack font-worksans font-[600] mb-6">
          Top Buyer
        </h1>

        <div className="overflow-x-auto font-worksans ">
          <table className="table font-worksans">
            <thead className=" bg-[#BAD1E8] rounded-[8px]">
              <tr>
                <th>Buyer</th>
                <th>Sale</th>
                <th>Transaction</th>
              </tr>
            </thead>

            {sellerData?.map((data, i) => (
              <tbody key={i}>
                <tr>
                  <td className="flex items-center gap-2">
                    <img
                      src={user}
                      alt=""
                      className="w-12 h-12 rounded-[8px]"
                    />
                    <p className="text-[12px] font-[500] font-worksans text-textColorBlack">
                      Hart Hagerty
                    </p>
                  </td>

                  <td>
                    <p className="text-[12px]">{data.sale}</p>
                  </td>

                  <td>
                    <p className="bg-[#EEF2FA] w-[53px] h-[24px] text-[#5348D1] text-[12px] font-[500] rounded-[8px] flex justify-center items-center">
                      ${data.transaction}
                    </p>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
        </>
    );
};

export default TopBuyer;