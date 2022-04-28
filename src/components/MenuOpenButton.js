import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";

export const MenuOpenButton = ({ Icon, data }) => {
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
        {data &&
          data.map((elem, index) => (
            <MenuItem
            key={elem.id}
              onClick={() => {
                window.location.href =
                  `#${elem.id}`;
             }}
              
            >
              Paid Order No.{index + 1}
            </MenuItem>
          ))}
      </MenuList>
    </Menu>
  );
};
