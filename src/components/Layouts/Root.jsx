import { Link, Outlet } from "react-router-dom";

import styles from './Root.module.css';

const Root = (props) => {
  return (
    <div>
      <nav className={styles.linksWrapper}>
        <ul className={styles.links}>
          <li>
            <Link to="/">Laboratory 0</Link>
          </li>
          <li>
            <Link to="/lab1">Laboratory 1</Link>
          </li>
        </ul>
      </nav>

      <div className={styles.contentWrapper}>
        <Outlet />
      </div>
    </div>
  );
};
export default Root;
