const SingelOrder = ({ order }) => {
  let ing = order.ingrediants.map((item) => {
    return (
      <span key={item.type} style={{ border: "1px solid #ccc", padding: "5px", margin: "0 5px",borderRadius:'5px' }}>
        <span>{item.type}</span>
        <span> X {item.amount}</span>
      </span>
    );
  });
  return (
    <div
      style={{ border: "1px solid #ccc", padding: "20px", margin: "10px 0",borderRadius:'5px' }}
    >
      <p>Order Id : {order.id}</p>
      <p>Delivary Address : {order.customerInfo.address}</p>
      {ing}
      <p className="mt-3">Phone Number : {order.customerInfo.phone}</p>
      <strong>Total Amount : {order.totalAmount} BDT</strong>
    </div>
  );
};

export default SingelOrder;
