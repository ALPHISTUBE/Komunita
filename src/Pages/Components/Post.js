import "./Post.css";
import {
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  doc,
  setDoc,
  enableNetwork,
} from "firebase/firestore";
import { db, auth } from "../../firebase";
import { useState, useEffect } from "react";
function Post() {
  const [content, setContent] = useState("");
  const documentRef = collection(db, "Posts");
  const post = async () => {
    await addDoc(documentRef, {
      content,
      name: auth.currentUser.displayName,
      uid: auth.currentUser.uid,
      like: [auth.currentUser.uid],
    });
    window.location.reload();
  };

  const [postList, setPostList] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(documentRef);
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getPosts();
  }, []);

  const deletePost = async (id) => {
    const postDoc = doc(db, "Posts", id);
    await deleteDoc(postDoc);
    window.location.reload();
  };

  const setRating = async (id, uid, con, name, authurUid) => {
    let l = [];
    for (let j = 0; j < postList.length; j++) {
      if (id === postList[j].id) {
        l = postList[j].like;
        for (let i = 0; i < l.length; i++) {
          if (l[i] === uid) {
            return;
          }
        }
      }
    }
    l.push(uid);

    const postDoc = doc(db, "Posts", id);
    await setDoc(postDoc, {
      content: con,
      name: name,
      uid: authurUid,
      like: l,
    });

    window.location.reload();
  };

  const delRating = async (id, uid, con, name, authurUid) => {
    let l = [];
    for (let j = 0; j < postList.length; j++) {
      if (id === postList[j].id) {
        l = postList[j].like;
        for (let i = 0; i < l.length; i++) {
          if (l[i] === uid) {
            const x = l.splice(i, 1);
          }
        }
      }
    }

    const postDoc = doc(db, "Posts", id);
    await setDoc(postDoc, {
      content: con,
      name: name,
      uid: authurUid,
      like: l,
    });

    window.location.reload();
  };

  return (
    <section className="ContentHolder">
      <div className="PostEdit">
        <div className="PostEditTitle">
          <p>Create Post</p>
          <button
            onClick={() => {
              post();
            }}
          >
            Post
          </button>
        </div>
        <div className="PostEditInput">
          <textarea
            onChange={(event) => {
              setContent(event.target.value);
            }}
          />
        </div>
      </div>
      <div className="Posts">
        {postList.map((Posts) => {
          return (
            <div className="post">
              <section className="Header">
                <h1>{Posts.name}</h1>
                {auth.currentUser.uid === Posts.uid && (
                  <button
                    onClick={() => {
                      deletePost(Posts.id);
                    }}
                  >
                    <ion-icon name="close-outline"></ion-icon>
                  </button>
                )}
              </section>
              <div>{Posts.content}</div>
              {auth.currentUser.uid !== Posts.uid && (
                <section className="Footer">
                  <button
                    className="Like"
                    onClick={(event) => {
                      setRating(
                        Posts.id,
                        auth.currentUser.uid,
                        Posts.content,
                        Posts.name,
                        Posts.uid
                      );
                    }}
                  >
                    LIKE
                  </button>
                  <button
                    className="UnLike"
                    onClick={() => {
                      delRating(
                        Posts.id,
                        auth.currentUser.uid,
                        Posts.content,
                        Posts.name,
                        Posts.uid
                      );
                    }}
                  >
                    DISLIKE
                  </button>
                </section>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Post;
