import "./Search.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";
import { Result } from "../SearchResult/Result";

export const Search = ({searchBarVisibility, setSearchBarVisibility, lat, lng, setCentre, setRoute}) => {
    const [suggestions, setSuggestions] = useState([]);
    const [info, setInfo] = useState(undefined);
    const [hidden, setHidden] = useState(false);
    const geocode = (q) => {
        const params = {
            access_token: process.env.REACT_APP_MAPBOX_API_TOKEN,
            proximity: `${lat},${lng}`,
        }
        const url = new URL(`https://api.mapbox.com/geocoding/v5/mapbox.places/${q}.json`);
        url.search = new URLSearchParams(params).toString();
        fetch(url).then(resp => resp.json()).then(({features}) => {
            setSuggestions(features.map(feature => ({
                name: feature["place_name"],
                coords: feature["center"],
            })));
        })
    }

    return (
        <div className={"modal"}>
            <div className="hide" style={{display: hidden ? "none": "block"}}>
                <button className={"close"} onClick={() => setSearchBarVisibility(!searchBarVisibility)}>
                    <FontAwesomeIcon icon={faXmark}/>
                </button>
                <form>
                    <label htmlFor={"search"}>Search</label>
                    <input type={"text"} id={"search"} placeholder={"Enter Search Term"}
                        onChange={({target: {value}}) => geocode(value)}/>
                    <div className={"suggestions"}>
                        {
                            suggestions.map((place, key) => <div key={key} className={"suggestion"} onClick={() => {
                                // setHidden(true);
                                var src_lng = Math.round(lng * 10000) / 10000;
                                var src_lat = Math.round(lat * 10000) / 10000;
                                var dest_lng = Math.round(place.coords[0] * 10000) / 10000;
                                var dest_lat = Math.round(place.coords[1] * 10000) / 10000;
                                fetch(`${process.env.REACT_APP_BACKEND_URL}/navigation?src_long=${src_lng}&src_lat=${src_lat}&dest_long=${dest_lng}&dest_lat=${dest_lat}`)
                                .then(res => res.json()).then(j => {console.log(j); setInfo(j.data);});
                            }}>{place.name}</div>)
                        }
                    </div>
                </form>
            </div>
            <div className="stuff">
                {info !== undefined && <Result recommendations={info} setSearchBarVisibility={setSearchBarVisibility} setRoute={setRoute} />}
            </div>
        </div>
    )
}