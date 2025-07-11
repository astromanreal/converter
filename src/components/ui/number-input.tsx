
'use client';

import * as React from 'react';
import { Input } from '@/components/ui/input';

interface NumberInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  value: number;
  onChange: (value: number) => void;
  allowDecimal?: boolean;
}

export const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  ({ value, onChange, allowDecimal = true, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const stringValue = e.target.value;
      if (stringValue === '') {
        onChange(0);
        return;
      }
      
      const regex = allowDecimal ? /^-?\d*\.?\d*$/ : /^-?\d*$/;
      if (regex.test(stringValue)) {
        const numericValue = parseFloat(stringValue);
        if (!isNaN(numericValue)) {
            onChange(numericValue);
        } else if (stringValue === "-") {
            // Allow typing a negative sign
            onChange(0); // or handle as a special state if needed
        }
      }
    };

    return (
      <Input
        ref={ref}
        type="text"
        inputMode={allowDecimal ? "decimal" : "numeric"}
        value={value === 0 && props.defaultValue === value ? '' : String(value)}
        onChange={handleChange}
        {...props}
      />
    );
  }
);
NumberInput.displayName = 'NumberInput';
