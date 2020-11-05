import React, { useState, useEffect } from "react"
import axios from 'axios'
import Filter from "./components/Filter"
import Display from "./components/Display"


const App = () => {

  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState("")
  //const [matches, setMatches] = useState([])

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log("response fullfied")
        setCountries(response.data)
      })
  }, [])



  // updating my search input data by each render
  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  const isSubstring = (s1, s2) => {
    return s1.toLowerCase().includes(s2.toLowerCase())
  }

  const findMatches = (search) => {
    return search !== "" ? countries.filter(country => isSubstring(country.name, search)) : []
  }
  /*
    const findMatches1 = (search) => {
     const regex = RegExp(search, 'i')
      return countries.filter(country => regex.test(country.name))
  }*/

  const matches = findMatches(search)
  console.log(matches.name)

  return (
    <>
      <Filter fieldName={search} onChange={handleSearch} />

      <Display result={matches} />

    </>
  )

}

export default App

