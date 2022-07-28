import { FormInputLabel, Input, Group } from "./form-input.style.js";

const FormInput = ({ label, ...otherProps }) => {
  return (
    <Group>
      <Input {...otherProps} />
      {/* We render a label only if the label exists */}
      {label && (
        // <label
        //   className={`${
        //     otherProps.value.length ? "shrink" : ""
        //   } form-input-label`}
        // >
        //   {label}
        // </label>
        <FormInputLabel shrink={otherProps.value.length}>
          {label}
        </FormInputLabel>
      )}
    </Group>
  );
};

export default FormInput;
