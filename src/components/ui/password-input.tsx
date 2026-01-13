import { forwardRef, useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import type { FormControlProps } from "react-bootstrap";

interface PasswordInputProps extends FormControlProps {
  autofocus?: boolean;
  errorMessage?: string;
}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ autofocus = false, errorMessage, ...rest }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <InputGroup hasValidation>
        <Form.Control
          type={showPassword ? "text" : "password"}
          autoFocus={autofocus}
          ref={ref}
          {...rest}
        />
        <InputGroup.Text
          className="cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
        >
          <i className={`bi ${showPassword ? "bi-eye" : "bi-eye-slash"}`}></i>
        </InputGroup.Text>
        <Form.Control.Feedback type="invalid">
          {errorMessage}
        </Form.Control.Feedback>
      </InputGroup>
    );
  }
);

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
