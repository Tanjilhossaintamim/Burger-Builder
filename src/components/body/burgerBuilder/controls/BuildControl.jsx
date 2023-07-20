const BuildControl = ({ add, remove, label }) => {
  return (
    <div className="d-flex justify-content-between">
      <div className="mr-auto ml-5 fs-4 fw-bold">{label}</div>
      <div>
        <button className="btn btn-danger m-1" onClick={remove}>
          Less
        </button>
        <button className="btn btn-success m-1" onClick={add}>
          More
        </button>
      </div>
    </div>
  );
};

export default BuildControl;
