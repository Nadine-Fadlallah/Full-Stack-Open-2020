import React from "react"

const Country = ({ country }) => {

    return (
        <>
            <h1> {country.name} </h1>
            <div> capital {country.capital}</div>
            <div>popultaion {country.population}</div>
            <h3>languages</h3>
            <ul>
                {country.languages.map((language, i) =>
                    <li key={i}>
                        {language.name}
                    </li>
                )}
            </ul>
            <img src={country.flag} width="200" height="100" />
        </>
    )
}
export default Country