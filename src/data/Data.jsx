import carousel1 from "../assets/images/carousel1.jpg";
import carousel2 from "../assets/images/carousel2.jpg";
import carousel3 from "../assets/images/carousel3.jpg";
import carousel4 from "../assets/images/carousel4.jpg";
import carousel5 from "../assets/images/carousel5.jpg";
import carousel6 from "../assets/images/carousel6.jpg";
import carousel7 from "../assets/images/carousel7.jpg";
import electro1 from "../assets/images/electronics1.jpg";
import jew3 from "../assets/images/jewlery3.jpg";
import men3 from "../assets/images/men3.jpg";
import women2 from "../assets/images/womenBag.webp";

const carouselImage = [
  carousel2,
  carousel1,
  carousel3,
  carousel4,
  carousel5,
  carousel6,
  carousel7,
];
export default carouselImage;

const categoryData = [
  {
    title: "Electronics",
    category: "electronics",
    image:  electro1 ,
  },
  {
    title: "Discover fashion trends",
    category: "women's clothing",
    image:  women2 ,
  },
  {
    title: "Men's clothing",
    category: "men's clothing",
    image:  men3 ,
  },
  {
    title: "Jewelery",
    category: "jewelery",
    image: jew3 ,
  },
];
export { categoryData };
