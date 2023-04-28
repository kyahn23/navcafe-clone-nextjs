import { Fragment, useCallback, useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import classes from "./Header.module.css";

const Header = (props: any) => {
  const loc = useLocation();
  const navigate = useNavigate();
  const [authPageChk, setAuthPageChk] = useState<boolean>(false);

  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  const logoBtn = () => {
    setAuthPageChk(false);
    navigate("/");
  };

  const logoutHandler = () => {
    authCtx.logout();
    alert("로그아웃되었습니다.");
    navigate("/", { replace: true });
  };

  const authChkLayout = useCallback(() => {
    if (!isLoggedIn) {
      if (loc.pathname.includes("/auth")) {
        setAuthPageChk(true);
      } else {
        setAuthPageChk(false);
      }
    } else {
      setAuthPageChk(false);
    }
  }, [isLoggedIn, loc.pathname]);

  useEffect(() => {
    authChkLayout();
  }, [authChkLayout]);

  useEffect(() => {}, [loc.pathname, isLoggedIn]);

  let layout: JSX.Element | null = null;
  if (!isLoggedIn && !authPageChk) {
    layout = (
      <li>
        <Link to={{ pathname: "/auth", state: { authPageChk: true } }}>
          로그인
        </Link>
      </li>
    );
  } else if (isLoggedIn) {
    layout = (
      <Fragment>
        <li>
          <span className={classes.logout} onClick={logoutHandler}>
            로그아웃
          </span>
        </li>
      </Fragment>
    );
  }

  return (
    <header className={classes.header}>
      <div className={classes.logo} onClick={logoBtn}>
        CAFE_CLONE
      </div>
      <nav>
        <ul>{layout}</ul>
      </nav>
    </header>
  );
};

export default Header;
