import { useGetDocuments } from "./useGetDocuments";
import { useUserContext } from "./useUserContext";
// A hook that gets the user id from context, and gets the notifications
export const useNotifications = () => {
  const context = useUserContext();
  const { id } = context;
  const { docs } = useGetDocuments("Notification", null, null, [
    "users",
    "array-contains",
    { id: id, hasRead: false },
  ]);
  return { docs };
};
