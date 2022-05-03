import { FormControl, FormLabel, Input } from "@chakra-ui/react";

export const ExtraCustomerForm = ({ form, handleChange }) => {
  return (
    <>
      <FormControl isRequired>
        <FormLabel>Address</FormLabel>
        <Input
          value={form.address || ''}
          onChange={handleChange}
          id="address"
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
