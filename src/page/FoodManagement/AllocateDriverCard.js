import { Box, Radio, RadioGroup, Spinner, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useDelivery } from "../../hooks/useDelivery";
export const AllocateDriverCard = ({selected, setSelected}) => {
  const { drivers, error, isPending } = useDelivery();
  
  return isPending ? (
    <Spinner />
  ) : (
    <RadioGroup onChange={setSelected} value={selected}>
      <Stack>
        {drivers &&
          drivers.map((driver) => (
            <Radio justifyContent={"center"} key={driver.id} value={driver.id}>
              {driver.firstname}, {driver.lastname}
            </Radio>
          ))}
          
      </Stack>
      <Text fontWeight={"600"}>{!drivers || drivers.length === 0 ? "No available drivers at the moment" : null}</Text>
    </RadioGroup>
  );
};
