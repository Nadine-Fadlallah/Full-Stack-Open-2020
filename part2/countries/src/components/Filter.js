import React from "react"

const Filter = ({ fieldName, onChange }) => {
    return (
        <>
            <form>
                <div>
                    find countries
          <input value={fieldName} onChange={onChange} />
                </div>
            </form>
        </>
    )
}
export default Filter
