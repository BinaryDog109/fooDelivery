import { FormControl, FormLabel, Input, Textarea } from "@chakra-ui/react";

export const ExtraManagerForm = ({ form, handleChange }) => {
  return (
    <>
      <FormControl isRequired>
        <FormLabel>Restaurant Name</FormLabel>
        <Input
          id="restaurantName"
          value={form.restaurantName || ''}
          onChange={handleChange}
          type="text"
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Restaurant Description</FormLabel>
        <Textarea
          value={form.restaurantDescription || ''}
          onChange={handleChange}
          id="restaurantDescription"
          type="text"
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Restaurant Address</FormLabel>
        <Input
          id="restaurantAddress"
          value={form.restaurantAddress || ''}
          onChange={handleChange}
          type="text"
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Postcode</FormLabel>
        <Input
          value={form.postCode || ''}
          onChange={handleChange}
          id="postCode"
          type="text"
        />
      </FormControl>
    </>
  );
};
