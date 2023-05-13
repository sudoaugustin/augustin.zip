import * as $ScrollArea from '@radix-ui/react-scroll-area';

type Props = $ScrollArea.ScrollAreaViewportProps;

export default function ScrollArea(props: Props) {
  return (
    <$ScrollArea.Root type='always' className='overflow-hidden'>
      <$ScrollArea.Viewport {...props} />
      <$ScrollArea.Scrollbar
        className="select-none touch-none p-1 w-4 duration-250 opacity-0 group-hover/window:opacity-100"
        orientation="vertical"
      >
        <$ScrollArea.Thumb className="bg-white/10 rounded-md" />
      </$ScrollArea.Scrollbar>
    </$ScrollArea.Root>
  );
}
