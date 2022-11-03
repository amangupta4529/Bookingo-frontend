import {
  faBed,
  faCalendarDays,
  faCar,
  faCheck,
  faPerson,
  faPlane,
  faTaxi,
} from "@fortawesome/free-solid-svg-icons";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./header.css";
import { DateRange } from "react-date-range";
import { useContext, useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const Header = ({ type }) => {
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);


  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const { dispatch } = useContext(SearchContext);

  const handleSearch = () => {
    dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } });
    navigate("/hotels", { state: { destination, dates, options } });
  };

  return (
    <div className="header">
      <div
        className={
          type === "list" ? "headerContainer listMode" : "headerContainer"
        }
      >
        <div className="headerList">
          <div className="headerListItem active">
            <FontAwesomeIcon icon={faBed} className="header-svg"/>
            <span>Stays</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faPlane} className="header-svg" />
            <span>Flights</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faCar} className="header-svg"/>
            <span>Car rentals</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faBed} className="header-svg"/>
            <span>Attractions</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faTaxi} className="header-svg"/>
            <span>Airport taxis</span>
          </div>
        </div>
        {type !== "list" && (
          <>
            <h1 className="headerTitle">
              A lifetime of discounts? It's Genius.
            </h1>
            <p className="headerDesc">
              Get rewarded for your travels – unlock instant savings of 10% or
              more with a free bookingo account
            </p>
            {!user && <button className="headerBtns"><Link style={{"textDecoration":"none","color":"white"}} to={"/login"}>Sign in</Link> / <Link style={{"textDecoration":"none","color":"white"}} to={"/register"}>Register</Link></button>}
            <div className="headerSearch">
              <div className="headerSearchItem part1"  id="minheaderSearchItem"  >
                <FontAwesomeIcon icon={faBed} className="headerIcon" />
                <div className="partition">    
                <input
                  type="text"
                  placeholder="Around current location"
                  className="headerSearchInput"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value.toUpperCase())}
                />
                </div>
              </div>
              <div className="headerSearchItem part2" id="minheaderSearchItem">
                <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                <div className="partition dateBlock"> 
                    <div className="datetext">
                      <span
                      onClick={() => setOpenDate(!openDate)}
                      className="headerSearchText "
                    >{`${format(dates[0].startDate, "MM/dd/yyyy")}`}
                    </span>
                    </div>
                  <div  id="seprator"> to</div>
                  <div className="datetext">
                    <span
                    onClick={() => setOpenDate(!openDate)}
                    className="headerSearchText"
                  >
                  {` ${format(
                    dates[0].endDate,
                    "MM/dd/yyyy"
                  )}`}</span>
                  </div>
                </div>
                {openDate && (
                  <div className="dateBox">
                    <div className="iconCover">
                    <FontAwesomeIcon
          icon={faCheck}
          className="dateclose"
          onClick={() => setOpenDate(!openDate)}
        />
                    </div>
                    <DateRange
                      editableDateInputs={true}
                      onChange={(item) => {
                        setDates([item.selection])
                      }}
                      moveRangeOnFirstSelection={false}
                      ranges={dates}
                      className="date"
                      minDate={new Date()}
                    />
                  </div>
                )}
              </div>
              <div className="headerSearchItem part3" id="minheaderSearchItem">
                <FontAwesomeIcon icon={faPerson} className="headerIcon" />
                <div className="partition">
                <span
                  onClick={() => setOpenOptions(!openOptions)}
                  className="headerSearchText"
                >{`${options.adult} adult · ${options.children} children · ${options.room} room`}</span>
                
                </div>
                {openOptions && (
                  <div className="options">
                    <div className="optionItem">
                      <span className="optionText">Adult</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.adult <= 1}
                          className="optionCounterButton"
                          onClick={() => handleOption("adult", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.adult}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("adult", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Children</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.children <= 0}
                          className="optionCounterButton"
                          onClick={() => handleOption("children", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.children}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("children", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Room</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.room <= 1}
                          className="optionCounterButton"
                          onClick={() => handleOption("room", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.room}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("room", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="headerSearchItem btndiv part4" id="minheaderSearchItem">
                <button className="headerBtn" onClick={handleSearch}>
                  Search
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
