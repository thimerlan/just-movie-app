import { useEffect, useState, useContext } from "react";
import { IPMovies } from "../Interface";
import axios from "axios";
import MovieContext from "../../../Context/MovieContext";
const useGetRecommendations = () => {
  const [recommendations, setRecommendations] = useState<IPMovies>();
  const { idR, setIdR } = useContext(MovieContext);

  
  useEffect(() => {
    async function getRecommendations() {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${idR}/recommendations?api_key=d39c2fb1b1580a4f6618a3b23b2f7093&language=en-US&page=1`
        );
        setRecommendations(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    idR !== null && getRecommendations();
  }, [idR]);

  return {
    recommendations,
  };
};
export default useGetRecommendations;
