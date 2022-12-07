import { Link } from "react-router-dom";
import "./searchItem.css";

const SearchItem = ({ item }) => {


  const expand=()=>{
    var dots = document.getElementById("dots"+""+item._id);
    var moreText = document.getElementById("hoteldesc"+""+item._id);
    var btnText = document.getElementById("readMoreBTN"+""+item._id);
  
    if (dots.style.display === "none") {
      dots.style.display = "inline";
      btnText.innerHTML = "Read more";
      moreText.innerHTML=item.desc.substring(0,70)+"...";
    } else {
      dots.style.display = "none";
      btnText.innerHTML = "Read less";
      moreText.innerHTML=item.desc;
    }
  }
  return (
    <div className="searchItem">
      <div>
      </div>
      <img src={item.photos[0]} alt="" className="siImg" />
      <div className="siDesc">
        <h1 className="siTitle">{item.name}</h1>
        <span className="siDistance">{item.distance}m from center</span>
        <span className="siTaxiOp">Free airport taxi</span>
        <span className="siSubtitle">
          Studio Apartment with Air conditioning
        </span>
        <div className="hotelDesc">
        <span className="siFeatures"  id={`hoteldesc${item._id}`}>{item.desc.substring(0,60)}...</span>
        <p id={`dots${item._id}`} ></p>
        <button onClick={expand} class="readMoreBTN" id={`readMoreBTN${item._id}`}>Read more</button>
        </div>
        <span className="siCancelOp">Free cancellation </span>
        <span className="siCancelOpSubtitle">
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className="siDetails">
        {item.rating && <div className="siRating">
          <span>Excellent</span>
          <button>{item.rating}</button>
        </div>}
      </div>
      <div className="siDetailTexts">
          <span className="siPrice"> &#8377;{item.cheapestPrice}</span>
          <span className="siTaxOp">Includes taxes and fees</span>
          <Link to={`/hotels/${item._id}`}>
          <button className="siCheckButton">See availability</button>
          </Link>
        </div>
    </div>
  );
};

export default SearchItem;
