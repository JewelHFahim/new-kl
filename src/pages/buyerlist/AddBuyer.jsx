import { useForm } from "react-hook-form";
import { usePostSupplierMutation } from "../../redux/feature/supplier/supplierApi";

const AddBuyer = () => {
  const { register, handleSubmit } = useForm();
  const [createSupplier] = usePostSupplierMutation();

  const onSubmit = (data) => {
    createSupplier(data);
    console.log(data);
  };

  return (
    <>
      <dialog id="my_modal_3" className="modal">
        <form
          method="dialog"
          className="modal-box"
          onSubmit={handleSubmit(onSubmit)}
        >
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
          <h2 className="text-center text-sm">Add Supplier</h2>

          <input
            {...register("shop_name", { required: true })}
            type="text"
            placeholder="shop name"
            className="input input-bordered "
          />
          <input
            {...register("address", { required: true })}
            type="text"
            placeholder="address"
            className="input input-bordered "
          />
          <input
            {...register("person_name", { required: true })}
            type="text"
            placeholder="person name"
            className="input input-bordered "
          />
          <input
            {...register("phone_no", { required: true })}
            type="number"
            placeholder="phone"
            className="input input-bordered "
          />

          <button type="submit" className="border px-2 rounded-lg py-1 text-sm">
            Submit
          </button>
        </form>
      </dialog>
    </>
  );
};

export default AddBuyer;
