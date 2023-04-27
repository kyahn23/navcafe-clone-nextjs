import Link from "next/link";
import classes from "./BoardTypList.module.css";
import { BiImageAlt } from "react-icons/bi";

export const regDtFormat = (val: string) => {
  let dt = new Date(val).toLocaleDateString();
  let time = new Date(val).toTimeString().split(" ")[0];

  time = time.substring(0, 5);
  let now = new Date().toLocaleDateString();
  if (dt === now) {
    return time;
  } else {
    return dt;
  }
};

interface Post {
  id: number;
  title: string;
  imgIncYn: boolean;
  commentCnt: number;
  nickName: string;
  regDt: string;
  viewCnt: number;
}

interface BoardTypListProps {
  postList: Post[];
  totLength: number;
  postCnt: number;
  page: number;
}

const BoardTypList: React.FC<BoardTypListProps> = (props) => {
  let empty: boolean;
  props.postList.length ? (empty = false) : (empty = true);
  const noData = (
    <tr>
      <td colSpan={5}>
        <div className={classes.noData}>등록된 게시글이 없습니다.</div>
      </td>
    </tr>
  );

  return (
    <div>
      <table>
        <colgroup>
          <col style={{ width: "88px" }} />
          <col />
          <col style={{ width: "110px" }} />
          <col style={{ width: "88px" }} />
          <col style={{ width: "68px" }} />
          {/* <col style={{ width: "68px" }} /> */}
        </colgroup>
        <tbody>
          {props.postList.map((post, idx) => (
            <tr key={post.id}>
              <td className={classes.tdArticle}>
                <div className={classes.boardNumber}>
                  <div className={classes.innerNumber}>
                    {props.totLength - props.postCnt * (props.page - 1) - idx}
                  </div>
                </div>
              </td>
              <td className={classes.tdTitle}>
                <Link
                  href={{
                    pathname: "/board/detail",
                    query: { id: post.id },
                  }}
                >
                  {post.title}
                </Link>
                {post.imgIncYn && (
                  <span className={classes.imgInc}>
                    <BiImageAlt />
                  </span>
                )}
                {post.commentCnt > 0 ? (
                  <span className={classes.commentCnt}>
                    [{post.commentCnt}]
                  </span>
                ) : null}
              </td>
              <td className={classes.tdName}>{post.nickName}</td>
              <td className={classes.tdDate}>{regDtFormat(post.regDt)}</td>
              <td className={classes.tdView}>{post.viewCnt}</td>
              {/* <td className={classes.tdLikes}>a</td> */}
            </tr>
          ))}
          {empty && noData}
        </tbody>
      </table>
    </div>
  );
};

export default BoardTypList;
