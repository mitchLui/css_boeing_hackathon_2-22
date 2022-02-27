import "./Result.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBus, faP } from "@fortawesome/free-solid-svg-icons";
import { faPersonWalking } from "@fortawesome/free-solid-svg-icons";
import { faTrainSubway } from "@fortawesome/free-solid-svg-icons";


export const Result = (recommendations) => {
    return <div className="result">
        {recommendations.routes.routes.map(route => {
            return <div className="route">
                <div className="time-taken">
                    {route.time + "min time"}
                </div>
                <div className="emissions">
                    {route.emissions + "g of CO2 produced"}
                </div>
                {route.legs.map(leg => {
                    if (leg.mode === "bus") {
                        return <FontAwesomeIcon icon={faBus} />
                    } else if (leg.mode === "walk") {
                        return <FontAwesomeIcon icon={faPersonWalking} />
                    } else if (leg.mode === "train") {
                        return <FontAwesomeIcon icon={faTrainSubway} />
                    } else if (leg.mode === "voi") {
                        return <svg href="/voi-icon.svg"></svg>
                    }
                    return <span>{leg.mode}</span>;
                })}
                <br />
            </div>
        })}
    </div>
}