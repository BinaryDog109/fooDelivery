import { IconButton, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";

export const MenuOpenButton = ({Icon}) => {
  return (
    <Menu>
      <MenuButton
        rounded={"full"}
        as={IconButton}
        border="0px"
        icon={<Icon w={8} h={8} />}
        variant="outline"
      />
      <MenuList>
          {/* Optional: icon={<IconName />} command="⌘T" */}
        <MenuItem >
          New Tab
        </MenuItem>
        <MenuItem>
          New Window
        </MenuItem>
        <MenuItem>
          Open Closed Tab
        </MenuItem>
        <MenuItem>
          Open File...
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
