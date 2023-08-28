import { usePostTestOrdersMutation, usePostTestUserMutation } from "../../redux/feature/test/testApi";
import { setGeneratedId } from "../../redux/feature/test/testSlice";

export const createUserAndOrders = (userData, ordersData) => async (dispatch) => {
const [postTestUser] = usePostTestUserMutation();
const [postTestOrders] = usePostTestOrdersMutation();

  try {
    const userResponse = await postTestUser(userData);
    const id = userResponse.data.generatedId;

    dispatch(setGeneratedId(id)); // Assuming setGeneratedId is an action creator
    await Promise.all(
      ordersData.map(async (order) => {
        const cartItemData = {
          ...order,
          userGeneratedId: id,
        };

        await postTestOrders(cartItemData);
      })
    );
  } catch (error) {
    console.log(error);
  }
};
