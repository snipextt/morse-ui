import Post from "../Components/Post";
import Stories from "../Components/Stories";

const Home = () => {
  return (
    <div className="feed">
      <Stories />
      <Post />
      <Post />
    </div>
  );
};

export default Home;
