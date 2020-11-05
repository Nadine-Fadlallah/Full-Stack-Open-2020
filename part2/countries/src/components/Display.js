import React from "react"
import Countries from "./Countries"
import Country from "./Country"

const Display = ({ result }) => {


    if (result.length > 10)
        return (
            <div>Too many matches, specify another filter</div>
        )

    else if (result.length === 1)
        return (
            <>
                {result.map(country => (
                    <Country country={country} />))}
            </>
        )

    return (
        <>
            {result.map(country => (
                <Countries
                    key={country.name}
                    name={country.name}

                />))
            }
        </>
    )

}
export default Display
