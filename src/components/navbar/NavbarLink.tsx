import { Link } from "react-router-dom";
import type { NavbarItem } from "../../types/NavbarItem";
import { classNames } from "../../utils/classNames";

interface NavLinkProps {
  item: NavbarItem;
  pathname: string;
  className: string;
  activeClassName: string;
  onClick?: () => void;
}

const NavbarLink = ({
  item,
  pathname,
  className,
  activeClassName,
  onClick,
}: NavLinkProps) => {
  const isActive = item.isActive?.(pathname) ?? false;

  return (
    <Link
      to={item.to}
      onClick={onClick}
      className={classNames(className, isActive && activeClassName)}
    >
      {item.label}
    </Link>
  );
};

export default NavbarLink;
