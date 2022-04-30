import { SimpleGrid } from "@chakra-ui/react";
import { useMemo } from "react";

export const ItemGrid = ({ data, Card, columns = {sm: 2, md: 3}, elemProps }) => {
  // Optimise using useMemo so that it wont rerender again after clicking the Add button
  return useMemo(
    () => (
      <SimpleGrid
        columns={columns}
        spacing="8"
        p="0"
        textAlign="center"
        rounded="lg"
        color="gray.400"
      >
        {data.map((elem, index) => (
          <Card {...elemProps} data={elem} key={elem.id} />
        ))}
      </SimpleGrid>
    ),
    [data]
  );
};
