// Breadcrumbs.tsx
import { Link, useMatches } from "react-router-dom";

import styles from './Breadcrumbs.module.css'

interface MatchHandle {
  crumb?: string | ((data: any, params: Record<string, string>) => React.ReactNode);
}
interface Match {
  id: string;
  pathname: string;
  pathnameBase: string;
  data: any;
  params: Record<string, string>;
  handle?: MatchHandle;
}
interface BreadcrumbItem {
  pathname: string;
  label: React.ReactNode;
  isLast: boolean;
}

const Breadcrumbs = () => {
  const matches = useMatches() as unknown as Match[];

  const crumbs: BreadcrumbItem[] = matches
    .filter((m): m is Match & { handle: { crumb: any } } => Boolean(m.handle?.crumb))
    .map((m, idx, arr) => {
      const value = m.handle!.crumb;
      const label = typeof value === "function" ? value(m.data, m.params) : value;
      return {
        pathname: m.pathname,
        label,
        isLast: idx === arr.length - 1
      };
    });

  return (
    <nav className={styles.breadcrumbs}>
      {crumbs.map((c, i) => (
        <span className={styles.breadcrumb_item} key={`${c.pathname}-${i}`}>
          {c.isLast ? (
            <span>{c.label}</span>
          ) : (
            <>
              <Link to={c.pathname} className={styles.breadcrumb_item}>{c.label}</Link>
              <span className={styles.breadcrumb_item}> / </span>
            </>
          )}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumbs;