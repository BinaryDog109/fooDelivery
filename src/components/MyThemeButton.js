import { Button } from "@chakra-ui/react"

export const MyThemeButton = ({children, onClick, ...props}) => {
  return (
    <Button {...props}
              px={2}
              py={1}
              bgGradient="linear(to-r, band1.100, band2.600)"
              fontSize="xs"
              color="white"
              fontWeight="bold"
              rounded="lg"
              textTransform="uppercase"
              _hover={{
                bgGradient: "linear(to-r, band1.50, band2.600)",
              }}
              _focus={{
                bgGradient: "linear(to-r, band1.200, band2.700)",
              }}
              onClick={onClick}
            >
              {children}
            </Button>
  )
}