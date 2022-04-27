import { SimpleGrid } from "@chakra-ui/react"
import { Card } from "./Card"

export const ItemGrid = ({cardNum = 10}) => {
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
        {[...Array(cardNum).keys()].map((elem, index)=>(
            <Card key={index} />
        ))}
      </SimpleGrid>
  )
}