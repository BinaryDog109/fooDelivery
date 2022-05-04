import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  IconButton,
  Button,
  Stack,
} from "@chakra-ui/react";

import { AiOutlineLogout, AiOutlineSetting } from "react-icons/ai";
import { useLogout } from "../hooks/useLogout";

export const SettingsButton = () => {
  const { logout, error, isPending } = useLogout()
  const handleLogout = () => {
    logout()
  }
  return (
    <Popover placement="bottom" isLazy>
      <PopoverTrigger>
        <IconButton
          aria-label="More server options"
          icon={<AiOutlineSetting />}
          variant="solid"
          w="fit-content"
        />
      </PopoverTrigger>
      <PopoverContent w="fit-content" _focus={{ boxShadow: "none" }}>
        <PopoverArrow />
        <PopoverBody>
          <Stack>
            <Button
              w="194px"
              variant="ghost"
              rightIcon={<AiOutlineLogout />}
              justifyContent="space-between"
              fontWeight="normal"
              fontSize="sm"
              onClick={handleLogout}
              disabled={isPending}
            >
              Log out
            </Button>
          </Stack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
