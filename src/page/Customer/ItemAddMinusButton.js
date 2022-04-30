import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { Box, IconButton } from "@chakra-ui/react";

export const ItemAddMinusButton = ({
  handleClick = ()=>{},
  item,
  isPending = false,
  midNumber = 0,
  midNumberDisplay = false
}) => {
  return (
    <Box className="add-minus-buttons" flexShrink={0}>
      <IconButton
        disabled={isPending}
        onClick={() => {
          handleClick("+", item);
        }}
        size={"xs"}
        icon={<AddIcon />}
        isRound
      ></IconButton>
      <span style={{color: "purple"}}>{midNumberDisplay && midNumber}</span>
      <IconButton
        disabled={isPending}
        onClick={() => {
          handleClick("-", item);
        }}
        ml={1}
        size={"xs"}
        icon={<MinusIcon />}
        isRound
      ></IconButton>
    </Box>
  );
};
