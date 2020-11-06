import React, { useState } from "react"
import Country from "./Country"

const Countries = ({ country }) => {

    const [clicked, setClicked] = useState([])
    const [button, setButton] = useState("show")

    const handleClick = (country_name) => {
        // Alter the button after clicking on it
        button === "show" ? setButton("hide") : setButton("show")
        // Update the cicked array 
        setClicked([true, country_name, button])
    }
    //console.log(clicked)

    return (
        <>
            <div>
                {country.name}
                <button onClick={() => handleClick(country)}>{button}</button>
                {clicked[0] && clicked[2] === "show" && <Country key={clicked[1].alpha3Code} country={clicked[1]} />}
            </div>

        </>
    )
}

export default Countries