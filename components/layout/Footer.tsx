import classes from "./Footer.module.css";

const Footer: React.FC = () => {
  return (
    <footer className={classes.footer}>
      <h2 className={classes.title}>CAFE CLONE</h2>
      <a
        target="_blank"
        rel="noreferrer"
        href="https://github.com/kyahn23/navcafe-clone-nextjs"
        className={classes.link}
      >
        https://github.com/kyahn23/navcafe-clone-nextjs
      </a>
    </footer>
  );
};

export default Footer;
