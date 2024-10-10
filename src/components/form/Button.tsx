import React, { ReactNode, MouseEventHandler } from "react";
import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

interface ButtonProps {
  parentClassName?: string;
  type?: "button" | "submit" | "reset";
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  className?: string;
  role?: string;
  label?: string;
  children?: ReactNode;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  parentClassName,
  type = "button",
  onClick,
  disabled,
  className,
  role,
  label = "",
  children,
  loading,
}) => (
  <div className={parentClassName}>
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={` w-[25vw] rounded-md px-2 py-3   text-white sm:text-[12px] my-2 focus:bg-[#56C870] bg-primary dark:bg-[#56C870] hover:bg-primary dark:hover:bg-[#80d293] cursor-pointer  ${className}`}
      role={role}
    >
       {loading ? (
        <Skeleton width={20} height={20} /> 
      ) : (
        label || children 
      )}
      {/* {label} {children} */}
    </button>
  </div>
);

Button.propTypes = {
  parentClassName: PropTypes.string,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  role: PropTypes.string,
  label: PropTypes.string,
  children: PropTypes.node,
  loading: PropTypes.bool,
};

Button.defaultProps = {
  label: "",
  onClick: () => {},
  loading: false,
};

export default Button;
