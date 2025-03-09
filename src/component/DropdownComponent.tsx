import React from "react";
import { Select, Typography } from "antd";
import "./component.css";

interface DropdownComponentProps {
  label?: string;
  options: { label: string; value: string }[];
  value: string;
  onChange: (value: string) => void;
}

const DropdownComponent: React.FC<DropdownComponentProps> = ({
  label,
  options,
  value,
  onChange,
}) => {
  return (
    <div className="destination-container">
      {label && (
        <Typography.Text className="dropdown-label">
          Select Destination:
        </Typography.Text>
      )}
      <Select
        options={options}
        value={value}
        onChange={onChange}
        className="dropdown-select"
      />
    </div>
  );
};

export default DropdownComponent;
