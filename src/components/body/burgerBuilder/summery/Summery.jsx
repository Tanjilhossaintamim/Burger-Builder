const Summery = ({ ingrediants }) => {
  const ingrediantSummery = ingrediants.map((item) => {
    return (
      <li key={item.type} style={{listStyle:'none'}}>
        <span style={{textTransform:'capitalize'}}>{item.type} : </span>
        <span> {item.amount}</span>
      </li>
    );
  });

  return (
    <div>
      <ul>{ingrediantSummery}</ul>
    </div>
  );
};

export default Summery;
