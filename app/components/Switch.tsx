import * as RdxSwitch from '@radix-ui/react-switch';

export default function Switch({ className, ...rest }: RdxSwitch.SwitchProps) {
  return (
    <RdxSwitch.Root {...rest} className={`w-8 rounded-full bg-theme-400 state-checked:bg-brand-600 p-[1px] duration-300 ${className}`}>
      <RdxSwitch.Thumb className="block h-2.5 w-4 state-checked:translate-x-3.5 rounded-full bg-theme-100 state-checked:bg-brand-100 duration-150" />
    </RdxSwitch.Root>
  );
}
