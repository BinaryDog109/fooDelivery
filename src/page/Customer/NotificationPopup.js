import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Button,
  Portal,
  chakra,
  IconButton,
  Text,
  Flex,
  Box,
  useToast,
  Divider,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { AiOutlineNotification } from "react-icons/ai";
import { useCRUD } from "../../hooks/useCRUD";
import { useNotifications } from "../../hooks/useNotifications";
import { useUserContext } from "../../hooks/useUserContext";
export const NotificationPopup = () => {
  const { docs } = useNotifications();
  const { updateDoc, response } = useCRUD("Notification");
  const { id: userId } = useUserContext();
  const toast = useToast();
  const handleRead = (notification) => {
    const users = notification.users;
    const user = users.find((elem) => elem.id === userId);
    user.hasRead = true;
    updateDoc(notification.id, { users: [...users] });
  };
  useEffect(() => {
    if (response.success) {
      toast({
        title: "Notification updated.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  }, [response.success, toast]);
  return (
    <Popover>
      <PopoverTrigger>
        <IconButton
          isRound
          icon={
            <>
              <AiOutlineNotification size={25} />
              <chakra.span
                pos="absolute"
                top="0px"
                left="-1px"
                px={2}
                py={1}
                fontSize="xs"
                fontWeight="bold"
                lineHeight="none"
                color="red.100"
                transform="translate(-50%, -50%)"
                bg="red.600"
                rounded="full"
              >
                {docs && docs.length}
              </chakra.span>
            </>
          }
        />
      </PopoverTrigger>
      <Portal>
        <PopoverContent>
          <PopoverArrow />
          <PopoverHeader
            bgGradient="linear(to-r, band1.100, band2.600)"
            bgClip="text"
            fontWeight={"800"}
          >
            Your Unread Notifications
          </PopoverHeader>
          <PopoverCloseButton />

          <PopoverBody>
            {docs &&
              docs.map((notification) => (
                <Box key={notification.id}>
                  <Text>{notification.content}</Text>
                  <Button onClick={() => handleRead(notification)} size={"sm"}>
                    Mark Read
                  </Button>
                  <Divider mt={2}></Divider>
                </Box>
              ))}
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
};
