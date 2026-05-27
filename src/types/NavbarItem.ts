export interface NavbarItem {
  label: string;
  to: string;
  showBadge?: boolean;
  isActive?: (pathname: string) => boolean;
}
