import { Link } from "react-router-dom";
import type { NavbarItem } from "../../types/NavbarItem";
import { classNames } from "../../utils/classNames";

interface NavLinkProps {
  item: NavbarItem;
  pathname: string;
  favouriteCount: number;
  className: string;
  activeClassName: string;
  onClick?: () => void;
}

const NavbarLink = ({
  item,
  pathname,
  favouriteCount,
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

      {item.showBadge && favouriteCount > 0 && (
        <span className="inline-flex rounded-full bg-primary px-2 py-0 text-sm font-semibold text-on-primary">
          {favouriteCount}
        </span>
      )}
    </Link>
  );
};

export default NavbarLink;
