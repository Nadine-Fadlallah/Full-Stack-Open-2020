import React from "react"
import Weather from "./Weather"

const Country = ({ country }) => {

    return (
        <>
            <h1> {country.name} </h1>
            <div> capital {country.capital}</div>
            <div>popultaion {country.population}</div>
            <h3>Spoken languages</h3>
            <ul>
                {country.languages.map(language =>
                    <li key={language.iso639_1}>
                        {language.name}
                    </li>
                )}
            </ul>
            <img src={country.flag} width="200" height="100" />
            <Weather capital={country.capital} />
        </>
    )
}
export default Country