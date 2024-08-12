import {useEffect, useState} from "react";
import Places from "./Places.jsx";

export default function AvailablePlaces({ onSelectPlace }) {
  const[availablePlaces, setAvailablePlaces] = useState([])

  useEffect(() => {
    fetch("http://localhost:3000/places").then((response) => {
      return response.json()
    }).then((resData)=>{
      console.log(resData.places);
      setAvailablePlaces(resData.places)
    })
  }, []);
  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
