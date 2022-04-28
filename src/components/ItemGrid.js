import { SimpleGrid } from "@chakra-ui/react";
import { useMemo } from "react";

export const ItemGrid = ({ data, Card }) => {
  // Optimise using useMemo so that it wont rerender again after clicking the Add button
  return useMemo(
    () => (
      <SimpleGrid
        columns={{ sm: 2, md: 3 }}
        spacing="8"
        p="0"
        pt="5"
        textAlign="center"
        rounded="lg"
        color="gray.400"
      >
        {data.map((elem, index) => (
          <Card data={elem} key={index} />
        ))}
      </SimpleGrid>
    ),
    [data]
  );
};
