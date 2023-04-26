import Head from "next/head";
import Image from "next/image";
import classes from "./MainPage.module.css";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { getAllData } from "./api/getMain";

interface Props {
  allData: any;
}

export default function Home(props: Props) {
  const data = props;
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="네이버 카페 클론 by nextjs" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>test</h1>
      {/* <div className={classes.mainData}>
        <div className={classes.cont_L}>
          <div className={classes.boardTitleArea}>
            <h3 className={classes.title}>
              <Link href="/board" state={{ typ: "all", txt: "전체글보기" }}>
                전체게시글
              </Link>
            </h3>
            <span className={classes.more}>
              <Link href="/board" state={{ typ: "all", txt: "전체글보기" }}>
                더보기
                <FiArrowRight />
              </Link>
            </span>
          </div>
          <table className={classes.boardTable}>
            <colgroup>
              <col />
              <col width="80" />
            </colgroup>
            <tbody className="postList">
              {isLoading &&
                [...Array(8)].map((empty, idx) => {
                  return (
                    <tr key={idx}>
                      <td className={classes.td_article}></td>
                      <td className={classes.td_view}></td>
                    </tr>
                  );
                })}
              {!isLoading && topNtc.length > 0 && ntcRender(topNtc)}
              {!isLoading && listRender(allPost)}
              {!isLoading &&
                [...Array(6 - allPost.length)].map((empty, idx) => {
                  return (
                    <tr key={idx}>
                      <td className={classes.td_article}></td>
                      <td className={classes.td_view}></td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>

        <div className={classes.cont_R}>
          <div className={classes.boardTitleArea}>
            <h3 className={classes.title}>
              <Link to="/board" state={{ typ: "free", txt: "자유게시판" }}>
                자유게시판
              </Link>
            </h3>
            <span className={classes.more}>
              <Link to="/board" state={{ typ: "free", txt: "자유게시판" }}>
                더보기
                <FiArrowRight />
              </Link>
            </span>
          </div>
          <table className={classes.boardTable}>
            <colgroup>
              <col />
              <col width="80" />
            </colgroup>
            <tbody>
              {isLoading &&
                [...Array(8)].map((empty, idx) => {
                  return (
                    <tr key={idx}>
                      <td className={classes.td_article}></td>
                      <td className={classes.td_view}></td>
                    </tr>
                  );
                })}
              {!isLoading && topNtc.length > 0 && ntcRender(topNtc)}
              {!isLoading && listRender(freePost)}
              {!isLoading &&
                [...Array(6 - freePost.length)].map((empty, idx) => {
                  return (
                    <tr key={idx}>
                      <td className={classes.td_article}></td>
                      <td className={classes.td_view}></td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
      <div className={classes.mainData}>
        <div className={classes.cont_L}>
          <div className={classes.boardTitleArea}>
            <h3 className={classes.title}>
              <Link to="/board" state={{ typ: "qna", txt: "질문게시판" }}>
                질문게시판
              </Link>
            </h3>
            <span className={classes.more}>
              <Link to="/board" state={{ typ: "qna", txt: "질문게시판" }}>
                더보기
                <FiArrowRight />
              </Link>
            </span>
          </div>
          <table className={classes.boardTable}>
            <colgroup>
              <col />
              <col width="80" />
            </colgroup>
            <tbody>
              {isLoading &&
                [...Array(8)].map((empty, idx) => {
                  return (
                    <tr key={idx}>
                      <td className={classes.td_article}></td>
                      <td className={classes.td_view}></td>
                    </tr>
                  );
                })}
              {!isLoading && topNtc.length > 0 && ntcRender(topNtc)}
              {!isLoading && listRender(qnaPost)}
              {!isLoading &&
                [...Array(6 - qnaPost.length)].map((empty, idx) => {
                  return (
                    <tr key={idx}>
                      <td className={classes.td_article}></td>
                      <td className={classes.td_view}></td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>

        <div className={classes.cont_R}>
          <div className={classes.boardTitleArea}>
            <h3 className={classes.title}>
              <Link to="/board" state={{ typ: "photo", txt: "사진게시판" }}>
                사진게시판
              </Link>
            </h3>
            <span className={classes.more}>
              <Link to="/board" state={{ typ: "photo", txt: "사진게시판" }}>
                더보기
                <FiArrowRight />
              </Link>
            </span>
          </div>
          <ul className={classes.albumBox}>
            {isLoading &&
              [...Array(6)].map((empty, idx) => {
                return <li key={idx} className={classes.noContent}></li>;
              })}
            {!isLoading && photoRender(photoPost)}
            {!isLoading &&
              [...Array(6 - photoPost.length)].map((empty, idx) => {
                return <li key={idx} className={classes.noContent}></li>;
              })}
          </ul>
        </div>
      </div> */}
    </>
  );
}

export async function getServerSideProps(context: any) {
  const data = await getAllData();
  // console.log(process.env.NEXT_PUBLIC_FB_API_KEY);
  return {
    props: {
      // allData: data,
    },
  };
}
