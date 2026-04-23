import { Icon } from "@iconify/react";

export default function Input({
  className,
  onChange,
  value,
  icon,
  label,
  placeholder,
  required = false,
  type_,
}) {
  return (
    <div className="d-flex input-group-custom">
      <div className="d-flex input-label">
        {icon && <Icon inline className="mx-2 my-auto" icon={icon} />}
        {label && <span className="me-2 my-auto text-truncate">{label}</span>}
      </div>
      <input
        onChange={onChange}
        value={value}
        className={className + " form-control"}
        placeholder={placeholder}
        required={required}
        autoComplete="off"
        type={type_}
      />
    </div>
  );
}
