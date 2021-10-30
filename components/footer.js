import styles from "./footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <hr />
      <ul className={styles.navItems}>
        <li className={styles.navItem}>
          <a href="https://github.com/lavaldi">
            <em>lavaldi</em>
          </a>
        </li>
      </ul>
    </footer>
  );
}
