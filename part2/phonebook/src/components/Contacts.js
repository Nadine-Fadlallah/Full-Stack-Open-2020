import React from "react"

const Contacts = ({ name, number, onClick }) => {
  return (
    <>
      <div>{name} {number}
        <button onClick={onClick}>delete</button>
      </div>

    </>
  )
}
export default Contacts
