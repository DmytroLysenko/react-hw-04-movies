import dummyImg from "../assets/images.png";

export default (fileName) =>
  fileName ? `https://image.tmdb.org/t/p/original${fileName}` : dummyImg;
