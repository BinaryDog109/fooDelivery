import { useUserContext } from "./useUserContext";
// A hook that get the user id from context, and get its cart info
export const useCart = () => {
  const context = useUserContext();
  const { id, response, updateUser } = context;
  const { document: userInfo } = response;
  const { success, error, isPending } = response;
  const cart = userInfo && userInfo.cart;
  return { userId: id, cart, success, error, isPending, updateUser };
};
