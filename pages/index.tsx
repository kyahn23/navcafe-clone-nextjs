import Head from "next/head";
import Image from "next/image";
import classes from "./MainPage.module.css";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { getAllData } from "./api/getMain";
import { FC, useState } from "react";
import { regDtFormat } from "@/components/board/boardTypList";

interface Props {
  allData: any;
}

type Item = {
  id: string;
  title: string;
  commentCnt: number;
  viewCnt: number;
  regDt: string;
  nickName: string;
  imgUrl: any[];
};

export default function Home(props: Props) {
  const { ntcList, allList, freeList, qnaList, photoList } = props.allData.data;

  const ntcRender = (list: Item[] | undefined) => {
    return (
      <>
        {list?.map((item) => (
          <tr key={item.id} className={classes.board_notice}>
            <td className={classes.td_article}>
              <div className={classes.board_tag}>
                <strong className={classes.board_tag_txt}>
                  <span className="inner">공지</span>
                </strong>
              </div>
              <div className={classes.board_list}>
                <div className={classes.inner_list}>
                  <Link
                    className={classes.article}
                    href={{ pathname: "/board/detail", query: { id: item.id } }}
                  >
                    <span className={classes.inner}>{item.title}</span>
                  </Link>

                  <div className={classes.article_append}>
                    <span className={classes.article}>
                      {item.commentCnt > 0 ? (
                        <em>[{item.commentCnt}]</em>
                      ) : null}
                    </span>
                  </div>
                </div>
              </div>
            </td>
            <td className={classes.td_view}>{item.viewCnt}</td>
          </tr>
        ))}
      </>
    );
  };

  const listRender = (list: Item[] | undefined) => {
    return (
      <>
        {list?.map((item) => (
          <tr key={item.id}>
            <td className={classes.td_article}>
              <div className={`${classes.board_tag} ${classes.type_dot}`}>
                <img width="3" height="3" alt="" className={classes.tcol_c} />
              </div>
              <div className={classes.board_list}>
                <div className={classes.inner_list}>
                  <Link
                    href={{ pathname: "/board/detail", query: { id: item.id } }}
                    legacyBehavior
                  >
                    <a className={classes.article}>
                      <span className={classes.inner}>{item.title}</span>
                    </a>
                  </Link>

                  <div className={classes.article_append}>
                    <span className={classes.article}>
                      {item.commentCnt > 0 ? (
                        <em>[{item.commentCnt}]</em>
                      ) : null}
                    </span>
                  </div>
                </div>
              </div>
            </td>
            <td className={classes.td_view}>{item.viewCnt}</td>
          </tr>
        ))}
      </>
    );
  };

  const photoRender = (list: Item[] | undefined) => {
    return list?.map((item) => (
      <li key={item.id}>
        <dl>
          <dt className={classes.photo}>
            <Link href={{ pathname: "/board/detail", query: { id: item.id } }}>
              <img src={item.imgUrl[0].url} alt="컨텐츠이미지" />
            </Link>
          </dt>
          <dd className={classes.tit}>
            <Link
              href={{ pathname: "/board/detail", query: { id: item.id } }}
              legacyBehavior
            >
              <a>
                <span className={classes.inner}>
                  <span className={classes.ellipsis}>{item.title}</span>
                </span>
              </a>
            </Link>
            <span className={classes.commentCnt}>
              {item.commentCnt > 0 ? (
                <span className={classes.num}>[{item.commentCnt}]</span>
              ) : null}
            </span>
          </dd>
          <dd>
            <div className={classes.nickArea}>
              <div className={classes.nn}>{item.nickName}</div>
            </div>
          </dd>
          <dd className={classes.dtVcntArea}>
            <div className={classes.dtVcnt}>
              <span>{regDtFormat(item.regDt)}</span>
              <span className={classes.vCnt}> 조회 {item.viewCnt}</span>
            </div>
          </dd>
        </dl>
      </li>
    ));
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="네이버 카페 클론 by nextjs" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={classes.mainData}>
        <div className={classes.cont_L}>
          <div className={classes.boardTitleArea}>
            <h3 className={classes.title}>
              <Link
                href={{
                  pathname: "/board",
                  query: { typ: "all", txt: "전체글보기" },
                }}
              >
                전체게시글
              </Link>
            </h3>
            <span className={classes.more}>
              <Link
                href={{
                  pathname: "/board",
                  query: { typ: "all", txt: "전체글보기" },
                }}
              >
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
              {/* {[...Array(8)].map((empty, idx) => {
                return (
                  <tr key={idx}>
                    <td className={classes.td_article}></td>
                    <td className={classes.td_view}></td>
                  </tr>
                );
              })} */}
              {ntcList.length > 0 && ntcRender(ntcList)}
              {listRender(allList)}
              {[...Array(6 - allList.length)].map((empty, idx) => {
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
              <Link
                href={{
                  pathname: "/board",
                  query: { typ: "free", txt: "자유게시판" },
                }}
              >
                자유게시판
              </Link>
            </h3>
            <span className={classes.more}>
              <Link
                href={{
                  pathname: "/board",
                  query: { typ: "free", txt: "자유게시판" },
                }}
              >
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
              {/* {[...Array(8)].map((empty, idx) => {
                return (
                  <tr key={idx}>
                    <td className={classes.td_article}></td>
                    <td className={classes.td_view}></td>
                  </tr>
                );
              })} */}
              {ntcList.length > 0 && ntcRender(ntcList)}
              {listRender(freeList)}
              {[...Array(6 - freeList.length)].map((empty, idx) => {
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
              <Link
                href={{
                  pathname: "/board",
                  query: { typ: "qna", txt: "질문게시판" },
                }}
              >
                질문게시판
              </Link>
            </h3>
            <span className={classes.more}>
              <Link
                href={{
                  pathname: "/board",
                  query: { typ: "qna", txt: "질문게시판" },
                }}
              >
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
              {/* {[...Array(8)].map((empty, idx) => {
                return (
                  <tr key={idx}>
                    <td className={classes.td_article}></td>
                    <td className={classes.td_view}></td>
                  </tr>
                );
              })} */}
              {ntcList.length > 0 && ntcRender(ntcList)}
              {listRender(qnaList)}
              {[...Array(6 - qnaList.length)].map((empty, idx) => {
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
              <Link
                href={{
                  pathname: "/board",
                  query: { typ: "photo", txt: "사진게시판" },
                }}
              >
                사진게시판
              </Link>
            </h3>
            <span className={classes.more}>
              <Link
                href={{
                  pathname: "/board",
                  query: { typ: "photo", txt: "사진게시판" },
                }}
              >
                더보기
                <FiArrowRight />
              </Link>
            </span>
          </div>
          <ul className={classes.albumBox}>
            {/* {[...Array(6)].map((empty, idx) => {
              return <li key={idx} className={classes.noContent}></li>;
            })} */}
            {photoRender(photoList)}
            {[...Array(6 - photoList.length)].map((empty, idx) => {
              return <li key={idx} className={classes.noContent}></li>;
            })}
          </ul>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context: any) {
  const allData = await getAllData();
  return {
    props: {
      allData,
    },
  };
}
