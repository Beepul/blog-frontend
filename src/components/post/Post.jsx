
import { Link } from "react-router-dom";
import "./post.css";

export default function Post({index,post}) {
  return (
    <div className="post" key={index}>
      {post.thumbnail && (
        <img
          className="postImg"
          src={post.thumbnail}
          alt=""
        />
      )}
      <div className="postInfo">
        <div className="postCats">
          {
            post.category.map((c,i) => (
          <span className="postCat" key={i}>
            <Link className="link" to="/posts?cat=Music">
              {c}
            </Link>
          </span>
            ))
          }
        </div>
        <span className="postTitle">
          <Link to={`/post/${post._id}`} className="link">
            {post.title}
          </Link>
        </span>
        <hr />
        <span className="postDate">{new Date(post.createdAt).toDateString()}</span>
      </div>
      <p className="postDesc">
        {post.description}
      </p>
    </div>
  );
}
