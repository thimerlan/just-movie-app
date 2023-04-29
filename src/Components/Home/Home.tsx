import { FC } from "react";
interface Props {}
import "./Home.scss";

const Home: FC<Props> = () => {
  // async function getRec() {
  //   const res = await axios.get(
  //     "https://api.themoviedb.org/3/movie/830784/recommendations?api_key=d39c2fb1b1580a4f6618a3b23b2f7093&language=en-US&page=1"
  //   );
  //   console.log(res.data);
  // }
  // getRec();
  return (
    <section className="mainPage">
      <div>
        <h1>
          Welcome to <span>Movie club!</span>
        </h1>
        <p>
          Here you can find super and popular films !!!
          <br />
          <span>Make yourself at home :)</span>
        </p>
      </div>

      <p className="b">
        To make it usable, I made a simple UI, but it's still AWESOME! Is not it
        :)
      </p>
    </section>
  );
};

export default Home;
