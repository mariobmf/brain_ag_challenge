import React, {
  PropsWithChildren,
  SelectHTMLAttributes,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { ErrorOption } from 'react-hook-form';
import * as Select from '@radix-ui/react-select';
import classnames from 'classnames';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';

interface InputSelectProps
  extends PropsWithChildren<SelectHTMLAttributes<HTMLButtonElement>> {
  options: { label: string; value: string }[];
  label?: string;
  placeholder?: string;
  error?: ErrorOption;
}

const InputSelect = React.forwardRef<HTMLButtonElement, InputSelectProps>(
  (
    { name, onChange, required, disabled, options, placeholder, label },
    ref,
  ) => {
    const selectRef = useRef<HTMLButtonElement>(null);
    const [itemWidth, setItemWidth] = useState(0);

    useLayoutEffect(() => {
      if (selectRef.current) setItemWidth(selectRef.current.offsetWidth);
    }, []);

    return (
      <div className="flex w-full flex-col items-start">
        {label && <span className="mb-2 font-bold text-zinc-700">{label}</span>}
        <Select.Root
          name={name}
          onValueChange={value =>
            onChange ? onChange({ target: { name, value } } as any) : null
          }
          required={required}
          disabled={disabled}
        >
          <Select.Trigger
            ref={selectRef}
            className="inline-flex h-[40px] w-full items-center justify-between rounded-xl border-[1px] border-zinc-700 bg-slate-300 px-3 text-base leading-none text-zinc-700 outline-none data-[state=error]:border-2 data-[state=error]:border-red-500 data-[state=open]:border-primary data-[placeholder]:text-zinc-400"
            aria-label={name}
          >
            <Select.Value placeholder={placeholder ?? 'Selecionar'} />
            <Select.Icon className="text-zinc-700">
              <ChevronDown size={18} />
            </Select.Icon>
          </Select.Trigger>
          <Select.Portal>
            <Select.Content
              className="z-50 overflow-hidden rounded-xl bg-slate-300"
              style={{
                width: itemWidth,
              }}
            >
              <Select.ScrollUpButton className="flex h-[25px] cursor-default items-center justify-center text-zinc-700">
                <ChevronUp />
              </Select.ScrollUpButton>
              <Select.Viewport>
                {options.map(option => (
                  <Select.Item
                    key={option.value}
                    value={option.value}
                    className="flex w-full cursor-pointer items-center justify-between p-3 text-base leading-none text-zinc-700 outline-none hover:bg-slate-400"
                  >
                    <Select.ItemText>{option.label}</Select.ItemText>
                    <Select.ItemIndicator />
                  </Select.Item>
                ))}
              </Select.Viewport>
              <Select.ScrollDownButton className="flex h-[25px] cursor-default items-center justify-center text-zinc-700">
                <ChevronDown />
              </Select.ScrollDownButton>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </div>
    );
  },
);

InputSelect.displayName = 'InputSelect';

export default InputSelect;
