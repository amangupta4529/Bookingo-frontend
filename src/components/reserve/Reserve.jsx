import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

import "./reserve.css";
import useFetch from "../../hooks/useFetch";
import { useContext, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { displayRazorpay } from "../../functions/Payment";
import { SyncLoader } from "react-spinners";
import Success from "../success page/Success";

const Reserve = ({ setOpen, hotelId }) => {
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return  diffDays;
  }
  const initialValue = 0;
  const [amount, setAmount] = useState(initialValue);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const { data, loading, setLoading } = useFetch(`/hotels/room/${hotelId}`);
  const { dates, options } = useContext(SearchContext);
  const [days, setdays] = useState(
    dayDifference(dates[0].startDate, dates[0].endDate)+1
  );
  const [amountRooms, setamountRooms] = useState([]);
  const [success, setsuccess] = useState(0);
  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const date = new Date(start.getTime());
    const dates = [];
    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }
    return dates;
  };
  const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      alldates.includes(new Date(date).getTime())
    );
    return !isFound;
  };
  const handleSelect = (e, item) => {
    const checked = e.target.checked;
    const value = e.target.value;
    const price = item.price;
    if (checked) {
      setAmount(amount + price);
    } else setAmount(amount - price);
    setamountRooms(
      checked
        ? ([...amountRooms,item._id] )
        : (amountRooms.filter((items) => items !== item._id))
    );
    setSelectedRooms(
      checked
        ? ([...selectedRooms, value] )
        : (selectedRooms.filter((items) => items !== value))
    );
  };

  const navigate = useNavigate();
  const handleClick = async () => {
    setLoading(true);
    try {
      const rootapi = "https://bookingo-backend.onrender.com/api/validation/amount";
      axios
        .post(rootapi, {
          rooms: amountRooms,
        })
        .then((actualAmount) => {
          setLoading(false);
          displayRazorpay(actualAmount.data, setsuccess,selectedRooms,alldates,days);
        })
        .catch((err) => {
          setLoading(false);
          alert(err);
        });
      
    } catch (err) {}
  };

  return (
    <div className="reserve">
      {loading && <SyncLoader className="loading_icon" />}
          <div className="rContainer">
            <div className="mHead">
              <div className="headText">
                {success==0 && <>
                <span className="headText">Prizes For :</span>
                <span className="headText">{days} Nights</span>
                </>}
              </div>
              <div className="mCancel">
                <FontAwesomeIcon
                  icon={faCircleXmark}
                  className="rClose"
                  onClick={() => setOpen(false)}
                  size={"1x"}
                />
              </div>
            </div>
            {
            success == 0 ? 
              <>
            <div className="modal-container">
              {data.map((item) => (
                <div className="rItem" key={item._id}>
                  <div className="rItemInfo">
                    <div className="rTitle">{item.title}</div>
                    <div className="rDesc">{item.desc}</div>
                    <div className="rMax">
                      Max people: <b>{item.maxPeople}</b>
                    </div>
                    <div className="rPrice">
                      <span>&#8377; </span>
                      {item.price * days}
                    </div>
                  </div>
                  <div className="rSelectRooms">
                    {item.roomNumbers.map((roomNumber) => (
                      <div className="room" key={roomNumber._id}>
                        <label>{roomNumber.number}</label>
                        <input
                          type="checkbox"
                          value={roomNumber._id}
                          onChange={(e) => handleSelect(e, item)}
                          disabled={!isAvailable(roomNumber)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="modalFooter">
              <div>Amount: &#8377;{amount * days}</div>
              <button onClick={handleClick} className="rButton">
                Reserve Now!
              </button>
            </div>
            </> :
            <Success success={success} setOpen={setOpen} />
          }
          </div>
    </div>
  );
};

export default Reserve;
