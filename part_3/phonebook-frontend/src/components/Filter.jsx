const Filter = ({ filter, handleFilterChange }) => {
  return (
    <div>
      <label>
        Filter shown with:
        <input type="text" value={filter} onChange={handleFilterChange} />
      </label>
    </div>
  )
}

export default Filter
