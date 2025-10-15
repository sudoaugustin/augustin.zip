import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/16/solid';
import { Select as RdxSelect } from 'radix-ui';

type Props = RdxSelect.SelectProps & {
  options: { label: string; value: string }[];
  className?: string;
};

export default function Select({ value, options, className, ...rest }: Props) {
  const selectedOption = options.find((option) => option.value === value);

  return (
    <RdxSelect.Root value={value} {...rest}>
      <RdxSelect.Trigger
        className={`flex items-center justify-between space-x-1 rounded-lg p-1 pl-1.5 duration-500 hover:bg-theme-300/50 ${className}`}
      >
        <RdxSelect.Value className="text-theme-600">{selectedOption?.label}</RdxSelect.Value>
        <RdxSelect.Icon>
          <ChevronUpDownIcon className="w-4 text-theme-400" />
        </RdxSelect.Icon>
      </RdxSelect.Trigger>

      <RdxSelect.Content className="motion-preset-fade z-5 translate-x-40 overflow-hidden rounded-lg bg-theme-200">
        {options.map((option) => (
          <RdxSelect.Item
            key={option.value}
            value={option.value}
            className="flex cursor-pointer items-center space-x-1 p-1 pr-8 state-unchecked:pl-6 text-theme-600 duration-200 hover:bg-theme-300"
          >
            <RdxSelect.ItemIndicator>
              <CheckIcon className="w-4 text-theme-400" />
            </RdxSelect.ItemIndicator>
            <RdxSelect.ItemText>{option.label}</RdxSelect.ItemText>
          </RdxSelect.Item>
        ))}
      </RdxSelect.Content>
    </RdxSelect.Root>
  );
}
