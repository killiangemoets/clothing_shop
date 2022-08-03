import { FormInputLabel, Input, Group } from "./form-input.style";
import { FC, InputHTMLAttributes } from "react";

type FormInputProps = { label: string } & InputHTMLAttributes<HTMLInputElement>;

const FormInput: FC<FormInputProps> = ({ label, ...otherProps }) => {
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
        <FormInputLabel shrink={Boolean((otherProps.value as String).length)}>
          {/* <FormInputLabel
          shrink={Boolean(
            otherProps.value &&
              typeof otherProps.value === "string" &&
              otherProps.value.length
          )}
        > */}
          {label}
        </FormInputLabel>
      )}
    </Group>
  );
};

export default FormInput;
