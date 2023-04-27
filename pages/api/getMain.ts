import { NextApiRequest, NextApiResponse } from "next";
import { getApp, getApps, initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  increment,
  query,
  orderBy,
  limit,
  startAt,
  where,
  Firestore,
  Query,
  QuerySnapshot,
  DocumentSnapshot,
  QueryDocumentSnapshot,
  DocumentData,
} from "firebase/firestore";
import FirebaseConfig from "../../service/firebaseConfig";

// Initialize Firebase
const app = !getApps().length ? initializeApp(FirebaseConfig) : getApp();
const db = getFirestore(app);
const storage = getStorage(app);

interface Post {
  id: string;
  postTyp: string;
  noticeYn: boolean;
  regDt: Date;
  writer: string;
  title: string;
  content: string;
  imgIncYn: boolean;
  commentCnt?: number;
  nickName?: string;
}

export async function getAllData() {
  const res = await fetch("http://localhost:3000/api/getMain");
  const data = await res.json();

  return data;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    let data: {
      ntcList: Post[];
      allList: Post[];
      freeList: Post[];
      qnaList: Post[];
      photoList: Post[];
    } = {
      ntcList: [],
      allList: [],
      freeList: [],
      qnaList: [],
      photoList: [],
    };
    const collectionRef = collection(db, "post");
    // 상단 공지사항
    const topNtclist = await query(
      collectionRef,
      where("postTyp", "==", "notice"),
      where("noticeYn", "==", true),
      orderBy("regDt", "desc"),
      limit(2)
    );
    const ntcSnap = await getDocs(topNtclist);
    let ntcList: Post[] = [];
    for (const item of ntcSnap.docs) {
      const post = item.data() as Post;
      post.id = item.id;

      const commentRef = collection(db, "comment");
      let commentDoc;
      commentDoc = await query(
        commentRef,
        where("postId", "==", item.id),
        orderBy("regDt", "desc")
      );
      const commentSnap = await getDocs(commentDoc);
      post.commentCnt = commentSnap.docs.length;

      ntcList.push(post);
    }

    // 전체게시글
    const allPostList = query(
      collectionRef,
      orderBy("regDt", "desc"),
      limit(6)
    );
    const allSnap = await getDocs(allPostList);
    let allList: Post[] = [];
    for (const item of allSnap.docs) {
      const post: Post = item.data() as Post;
      post.id = item.id;

      const commentRef = collection(db, "comment");
      let commentDoc;
      commentDoc = query(
        commentRef,
        where("postId", "==", item.id),
        orderBy("regDt", "desc")
      );
      const commentSnap = await getDocs(commentDoc);
      post.commentCnt = commentSnap.docs.length;
      allList.push(post);
    }

    // 자유게시판
    const freePostList = await query(
      collectionRef,
      where("postTyp", "==", "free"),
      orderBy("regDt", "desc"),
      limit(6)
    );
    const freePostSnap = await getDocs(freePostList);
    let freeList: Post[] = [];
    for (const item of freePostSnap.docs) {
      const post = item.data() as Post;
      post.id = item.id;

      const commentRef = collection(db, "comment");
      let commentDoc;
      commentDoc = await query(
        commentRef,
        where("postId", "==", item.id),
        orderBy("regDt", "desc")
      );
      const commentSnap = await getDocs(commentDoc);
      post.commentCnt = commentSnap.docs.length;
      freeList.push(post);
    }

    // 질문게시판
    const qnaPostList = await query(
      collectionRef,
      where("postTyp", "==", "qna"),
      orderBy("regDt", "desc"),
      limit(6)
    );
    const qnaPostSnap = await getDocs(qnaPostList);
    let qnaList: Post[] = [];
    for (const item of qnaPostSnap.docs) {
      const post = item.data() as Post;
      post.id = item.id;

      const commentRef = collection(db, "comment");
      let commentDoc;
      commentDoc = await query(
        commentRef,
        where("postId", "==", item.id),
        orderBy("regDt", "desc")
      );
      const commentSnap = await getDocs(commentDoc);
      post.commentCnt = commentSnap.docs.length;
      qnaList.push(post);
    }

    // 사진게시판
    const photoPostList = await query(
      collectionRef,
      where("postTyp", "==", "photo"),
      where("imgIncYn", "==", true),
      orderBy("regDt", "desc"),
      limit(6)
    );
    const photoPostSnap = await getDocs(photoPostList);
    let photoList: Post[] = [];
    for (const item of photoPostSnap.docs) {
      const post = item.data() as Post;
      const memberRef = doc(db, "member", post.writer);
      const mbSnap = await getDoc(memberRef);
      post.nickName = mbSnap.data()?.nickName;
      post.id = item.id;

      const commentRef = collection(db, "comment");
      let commentDoc;
      commentDoc = await query(
        commentRef,
        where("postId", "==", item.id),
        orderBy("regDt", "desc")
      );
      const commentSnap = await getDocs(commentDoc);
      post.commentCnt = commentSnap.docs.length;
      photoList.push(post);
    }

    data.ntcList = ntcList;
    data.allList = allList;
    data.freeList = freeList;
    data.qnaList = qnaList;
    data.photoList = photoList;

    res.status(200).json({ data });
  } catch (error) {
    console.log("asdf");
  }
}
