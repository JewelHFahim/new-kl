/* eslint-disable react/prop-types */
import img from  "../assets/box.jpeg";

const ProductView = ({item}) => {

    return (
        <div>
            <div  className="flex  items-center gap-3">
              <img
                src={img}
                alt=""
                className="w-[48px] h-[48px] rounded-[8px] shadow-md"
              />
              <p className="text-[12px] font-worksans text-textColorBlack font-[500]">  {item?.product_name} </p>
            </div>
        </div>
    );
};

export default ProductView;