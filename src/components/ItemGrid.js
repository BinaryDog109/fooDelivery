import { SimpleGrid } from "@chakra-ui/react"
import { Card } from "./Card"

export const ItemGrid = ({data}) => {
  return (
    <SimpleGrid
        columns={{ sm: 2, md: 3 }}
        spacing="8"
        p="0"
        pt="5"
        textAlign="center"
        rounded="lg"
        color="gray.400"       
      >
        {data.map((elem, index)=>(
            <Card data={elem} key={index} />
        ))}
      </SimpleGrid>
  )
}