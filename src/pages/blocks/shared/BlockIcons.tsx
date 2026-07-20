import type { ComponentType, SVGProps } from 'react';

/**
 * Block icons for the docs left rail.
 *
 * Paths are ported from the editor's own block-menu icons in ahd-fe
 * (`InspectorDrawer/LayoutPanel/icons/index.tsx`) so the documentation shows
 * the same glyph the user clicks in the Add Block menu. Those originals are
 * MUI `SvgIcon` components; this app has no MUI, so each is re-expressed as a
 * plain `<svg>` that inherits `currentColor` and sizes from Tailwind classes.
 */

type IconProps = SVGProps<SVGSVGElement>;

/** Shared wrapper: 24×24 viewBox, stroke-based, inherits color and size. */
function StrokeIcon({ d, ...props }: IconProps & { d: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d={d} />
    </svg>
  );
}

/** Shared wrapper for solid/filled glyphs. */
function FillIcon({ d, ...props }: IconProps & { d: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d={d} />
    </svg>
  );
}

export const HeadingIcon = (p: IconProps) => (
  <StrokeIcon
    {...p}
    d="M6 4V20M18 4V20M9.5 4V20M11.5 4H4M18 12H9.5M11.5 20H4M20 20H16M20 4H16"
  />
);

export const TextIcon = (p: IconProps) => (
  <StrokeIcon {...p} d="M16 10H3M20 6H3M20 14H3M16 18H3" />
);

export const ListIcon = (p: IconProps) => (
  <StrokeIcon {...p} d="M8 6H21M8 12H21M8 18H21M3 6H3.01M3 12H3.01M3 18H3.01" />
);

export const TableIcon = (p: IconProps) => (
  <StrokeIcon
    {...p}
    d="M3 9H21M3 15H21M9 9V21M15 9V21M7.8 3H16.2C17.88 3 18.72 3 19.36 3.33C19.93 3.61 20.39 4.07 20.67 4.64C21 5.28 21 6.12 21 7.8V16.2C21 17.88 21 18.72 20.67 19.36C20.39 19.93 19.93 20.39 19.36 20.67C18.72 21 17.88 21 16.2 21H7.8C6.12 21 5.28 21 4.64 20.67C4.07 20.39 3.61 19.93 3.33 19.36C3 18.72 3 17.88 3 16.2V7.8C3 6.12 3 5.28 3.33 4.64C3.61 4.07 4.07 3.61 4.64 3.33C5.28 3 6.12 3 7.8 3Z"
  />
);

export const MarkdownIcon = (p: IconProps) => (
  <FillIcon
    {...p}
    d="M12 21V12H22V21H20V14H18V19H16V14H14V21H12ZM3 21V3H9.175C9.35833 2.41667 9.71667 1.93767 10.25 1.563C10.7833 1.18833 11.3667 1.00067 12 1C12.6667 1 13.2627 1.18767 13.788 1.563C14.3133 1.93833 14.6673 2.41733 14.85 3H21V10H19V5H17V8H7V5H5V19H10V21H3ZM12.713 4.712C12.9043 4.52067 13 4.28333 13 4C13 3.71667 12.904 3.47933 12.712 3.288C12.52 3.09667 12.2827 3.00067 12 3C11.7173 2.99933 11.48 3.09533 11.288 3.288C11.096 3.48067 11 3.718 11 4C11 4.282 11.096 4.51967 11.288 4.713C11.48 4.90633 11.7173 5.002 12 5C12.2827 4.998 12.5203 4.902 12.713 4.712Z"
  />
);

export const QuillIcon = (p: IconProps) => (
  <StrokeIcon
    {...p}
    d="M12 20H21M3 20L4 16L15.5 4.5C16.33 3.67 17.67 3.67 18.5 4.5C19.33 5.33 19.33 6.67 18.5 7.5L7 19L3 20Z"
  />
);

export const ButtonIcon = (p: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...p}
  >
    <path d="M17.25 6.5H6.75C4.54086 6.5 2.75 8.29086 2.75 10.5V13.5C2.75 15.7091 4.54086 17.5 6.75 17.5H17.25C19.4591 17.5 21.25 15.7091 21.25 13.5V10.5C21.25 8.29086 19.4591 6.5 17.25 6.5Z" />
    <path d="M7 12H17" />
  </svg>
);

export const ButtonGroupIcon = (p: IconProps) => (
  <FillIcon
    {...p}
    d="M2 7.75C2 7.02065 2.28973 6.32118 2.80546 5.80546C3.32118 5.28973 4.02065 5 4.75 5H17.25C17.6111 5 17.9687 5.07113 18.3024 5.20933C18.636 5.34753 18.9392 5.5501 19.1945 5.80546C19.4499 6.06082 19.6525 6.36398 19.7907 6.69762C19.9289 7.03127 20 7.38886 20 7.75V13.25C20 13.6111 19.9289 13.9687 19.7907 14.3024C19.6525 14.636 19.4499 14.9392 19.1945 15.1945C18.9392 15.4499 18.636 15.6525 18.3024 15.7907C17.9687 15.9289 17.6111 16 17.25 16H4.75C4.02065 16 3.32118 15.7103 2.80546 15.1945C2.28973 14.6788 2 13.9793 2 13.25V7.75ZM4.75 6.5C4.06 6.5 3.5 7.06 3.5 7.75V13.25C3.5 13.94 4.06 14.5 4.75 14.5H17.25C17.94 14.5 18.5 13.94 18.5 13.25V7.75C18.5 7.06 17.94 6.5 17.25 6.5H4.75ZM4.797 17C5.02744 17.4516 5.37821 17.8306 5.81057 18.0953C6.24293 18.3601 6.74004 18.5001 7.247 18.5H17.247C18.6394 18.5 19.9747 17.9469 20.9593 16.9623C21.9439 15.9777 22.497 14.6424 22.497 13.25V10.25C22.4974 9.74335 22.3578 9.24645 22.0936 8.81412C21.8295 8.3818 21.451 8.03085 21 7.8V13.25C21 14.2446 20.6049 15.1984 19.9017 15.9017C19.1984 16.6049 18.2446 17 17.25 17H4.797ZM7.25 9.75C7.05109 9.75 6.86032 9.82902 6.71967 9.96967C6.57902 10.1103 6.5 10.3011 6.5 10.5C6.5 10.6989 6.57902 10.8897 6.71967 11.0303C6.86032 11.171 7.05109 11.25 7.25 11.25H14.75C14.9489 11.25 15.1397 11.171 15.2803 11.0303C15.421 10.8897 15.5 10.6989 15.5 10.5C15.5 10.3011 15.421 10.1103 15.2803 9.96967C15.1397 9.82902 14.9489 9.75 14.75 9.75H7.25Z"
  />
);

export const AccordionIcon = (p: IconProps) => (
  <StrokeIcon
    {...p}
    d="M3 5H21M3 19H21M6 10L12 14L18 10"
  />
);

export const TabsIcon = (p: IconProps) => (
  <StrokeIcon
    {...p}
    d="M3 9V19C3 19.55 3.45 20 4 20H20C20.55 20 21 19.55 21 19V9M3 9V6C3 5.45 3.45 5 4 5H9L11 7H20C20.55 7 21 7.45 21 8V9M3 9H21"
  />
);

export const StepperIcon = (p: IconProps) => (
  <StrokeIcon
    {...p}
    d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13ZM19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13ZM5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z"
  />
);

export const ImageIcon = (p: IconProps) => (
  <StrokeIcon
    {...p}
    d="M4.27209 20.7279L10.8686 14.1314C11.2646 13.7354 11.4627 13.5373 11.691 13.4632C11.8918 13.3979 12.1082 13.3979 12.309 13.4632C12.5373 13.5373 12.7354 13.7354 13.1314 14.1314L19.6839 20.6839M14 15L16.8686 12.1314C17.2646 11.7354 17.4627 11.5373 17.691 11.4632C17.8918 11.3979 18.1082 11.3979 18.309 11.4632C18.5373 11.5373 18.7354 11.7354 19.1314 12.1314L22 15M10 9C10 10.1046 9.10457 11 8 11C6.89543 11 6 10.1046 6 9C6 7.89543 6.89543 7 8 7C9.10457 7 10 7.89543 10 9ZM6.8 21H17.2C18.8802 21 19.7202 21 20.362 20.673C20.9265 20.3854 21.3854 19.9265 21.673 19.362C22 18.7202 22 17.8802 22 16.2V7.8C22 6.11984 22 5.27976 21.673 4.63803C21.3854 4.07354 20.9265 3.6146 20.362 3.32698C19.7202 3 18.8802 3 17.2 3H6.8C5.11984 3 4.27976 3 3.63803 3.32698C3.07354 3.6146 2.6146 4.07354 2.32698 4.63803C2 5.27976 2 6.11984 2 7.8V16.2C2 17.8802 2 18.7202 2.32698 19.362C2.6146 19.9265 3.07354 20.3854 3.63803 20.673C4.27976 21 5.11984 21 6.8 21Z"
  />
);

export const LogoIcon = (p: IconProps) => (
  <FillIcon
    {...p}
    d="M15 18H18V15H20V18H23V20H20V23H18V20H15V18ZM12 17.5C9.67 17.5 7.69 16.04 6.89 14H15.69C14.4914 14.7865 13.6177 15.9798 13.23 17.36C12.83 17.45 12.42 17.5 12 17.5ZM8.5 11C7.67 11 7 10.33 7 9.5C7 8.67 7.67 8 8.5 8C9.33 8 10 8.67 10 9.5C10 10.33 9.33 11 8.5 11ZM15.5 11C14.67 11 14 10.33 14 9.5C14 8.67 14.67 8 15.5 8C16.33 8 17 8.67 17 9.5C17 10.33 16.33 11 15.5 11ZM12 20L13.07 19.93C13.18 20.61 13.4 21.26 13.72 21.85C13.16 21.95 12.58 22 12 22C6.47 22 2 17.5 2 12C2 6.5 6.47 2 12 2C17.5 2 22 6.5 22 12C22 12.59 21.95 13.16 21.85 13.72C21.26 13.4 20.62 13.18 19.93 13.07L20 12C20 7.58 16.42 4 12 4C7.58 4 4 7.58 4 12C4 16.42 7.58 20 12 20Z"
  />
);

export const VideoIcon = (p: IconProps) => (
  <FillIcon
    {...p}
    d="M18.7 3H5.3C4 3 3 4 3 5.3V18.7C3 20 4 21 5.3 21H18.7C20 21 21 20 21 18.7V5.3C21 4 20 3 18.7 3ZM19.5 18.7C19.5 19.1 19.1 19.5 18.7 19.5H5.3C4.9 19.5 4.5 19.1 4.5 18.7V5.3C4.5 4.9 4.9 4.5 5.3 4.5H18.7C19.1 4.5 19.5 4.9 19.5 5.3V18.7ZM10 15L15 12L10 9V15Z"
  />
);

export const AvatarIcon = (p: IconProps) => (
  <StrokeIcon
    {...p}
    d="M5.3163 19.4384C5.92462 18.0052 7.34492 17 9 17H15C16.6551 17 18.0754 18.0052 18.6837 19.4384M16 9.5C16 11.7091 14.2091 13.5 12 13.5C9.79086 13.5 8 11.7091 8 9.5C8 7.29086 9.79086 5.5 12 5.5C14.2091 5.5 16 7.29086 16 9.5ZM22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
  />
);

export const ContainerIcon = (p: IconProps) => (
  <StrokeIcon
    {...p}
    d="M16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3Z"
  />
);

export const ColumnsIcon = (p: IconProps) => (
  <StrokeIcon
    {...p}
    d="M9 3V21M15 3V21M7.8 3H16.2C17.8802 3 18.7202 3 19.362 3.32698C19.9265 3.6146 20.3854 4.07354 20.673 4.63803C21 5.27976 21 6.11984 21 7.8V16.2C21 17.8802 21 18.7202 20.673 19.362C20.3854 19.9265 19.9265 20.3854 19.362 20.673C18.7202 21 17.8802 21 16.2 21H7.8C6.11984 21 5.27976 21 4.63803 20.673C4.07354 20.3854 3.6146 19.9265 3.32698 19.362C3 18.7202 3 17.8802 3 16.2V7.8C3 6.11984 3 5.27976 3.32698 4.63803C3.6146 4.07354 4.07354 3.6146 4.63803 3.32698C5.27976 3 6.11984 3 7.8 3Z"
  />
);

export const FlexColumnsIcon = (p: IconProps) => (
  <StrokeIcon {...p} d="M4 4H10V20H4V4ZM14 4H20V12H14V4ZM14 16H20V20H14V16Z" />
);

export const GridIcon = (p: IconProps) => (
  <StrokeIcon
    {...p}
    d="M3 12H21M12 3V21M7.8 3H16.2C17.8802 3 18.7202 3 19.362 3.32698C19.9265 3.6146 20.3854 4.07354 20.673 4.63803C21 5.27976 21 6.11984 21 7.8V16.2C21 17.8802 21 18.7202 20.673 19.362C20.3854 19.9265 19.9265 20.3854 19.362 20.673C18.7202 21 17.8802 21 16.2 21H7.8C6.11984 21 5.27976 21 4.63803 20.673C4.07354 20.3854 3.6146 19.9265 3.32698 19.362C3 18.7202 3 17.8802 3 16.2V7.8C3 6.11984 3 5.27976 3.32698 4.63803C3.6146 4.07354 4.07354 3.6146 4.63803 3.32698C5.27976 3 6.11984 3 7.8 3Z"
  />
);

export const CarouselIcon = (p: IconProps) => (
  <StrokeIcon
    {...p}
    d="M7 7H17V17H7V7ZM3 9V15M21 9V15"
  />
);

export const PaginationIcon = (p: IconProps) => (
  <StrokeIcon
    {...p}
    d="M4 6H10V12H4V6ZM14 6H20V12H14V6ZM6 18H8M11 18H13M16 18H18"
  />
);

export const MarqueeIcon = (p: IconProps) => (
  <StrokeIcon {...p} d="M3 8H21M3 16H15M18 13L21 16L18 19" />
);

export const DividerIcon = (p: IconProps) => <StrokeIcon {...p} d="M3 12H21" />;

export const SpacerIcon = (p: IconProps) => (
  <FillIcon
    {...p}
    d="M7.72266 14.7773L8.77734 13.7227L10.5 15.4336V12H12V15.4336L13.7227 13.7227L14.7773 14.7773L11.25 18.3047L7.72266 14.7773ZM10.5 10.5V7.06641L8.77734 8.77734L7.72266 7.72266L11.25 4.19531L14.7773 7.72266L13.7227 8.77734L12 7.06641V10.5H10.5ZM22.5 1.5V3H0V1.5H22.5ZM0 19.5H22.5V21H0V19.5Z"
  />
);

export const HtmlIcon = (p: IconProps) => (
  <StrokeIcon {...p} d="M16 18L22 12L16 6M8 6L2 12L8 18" />
);

/** Route path → icon, so the rail can look one up without extra wiring. */
export const BLOCK_ICONS: Record<string, ComponentType<IconProps>> = {
  '/blocks/heading': HeadingIcon,
  '/blocks/text': TextIcon,
  '/blocks/list': ListIcon,
  '/blocks/table': TableIcon,
  '/blocks/markdown': MarkdownIcon,
  '/blocks/quill': QuillIcon,
  '/blocks/button': ButtonIcon,
  '/blocks/button-group': ButtonGroupIcon,
  '/blocks/accordion': AccordionIcon,
  '/blocks/tabs': TabsIcon,
  '/blocks/stepper': StepperIcon,
  '/blocks/image': ImageIcon,
  '/blocks/logo': LogoIcon,
  '/blocks/video': VideoIcon,
  '/blocks/avatar': AvatarIcon,
  '/blocks/container': ContainerIcon,
  '/blocks/columns': ColumnsIcon,
  '/blocks/flex-columns': FlexColumnsIcon,
  '/blocks/grid': GridIcon,
  '/blocks/carousel': CarouselIcon,
  '/blocks/pagination': PaginationIcon,
  '/blocks/marquee': MarqueeIcon,
  '/blocks/divider': DividerIcon,
  '/blocks/spacer': SpacerIcon,
  '/blocks/html': HtmlIcon,
};
