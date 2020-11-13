import React from "react";

const Filter = ({ fieldName, onChange }) => {
  return (
    <>
      <form>
        <div>
          filter shown with
          <input value={fieldName} onChange={onChange} />
        </div>
      </form>
    </>
  );
};
export default Filter;
