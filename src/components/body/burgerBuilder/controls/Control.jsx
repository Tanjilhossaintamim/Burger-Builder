import { Button, Card, CardBody, CardFooter, CardHeader } from "reactstrap";
import BuildControl from "./BuildControl";
const ingrediantArray = [
  { type: "salad", label: "Salad" },
  { type: "meat", label: "meat" },
  { type: "cheese", label: "Cheese" },
];
const Control = ({
  totalAmount,
  ingrediantAdd,
  ingrediantRemove,
  purchsesAble,
  toggleModal,
}) => {
  return (
    <div className="container">
      <Card style={{ textAlign: "center" }}>
        <CardHeader
          style={{
            backgroundColor: "#D70F64",
            textAlign: "center",
            color: "#fff",
            fontSize: "20px",
          }}
        >
          <h4>Add Ingrediants</h4>
        </CardHeader>
        <CardBody>
          {ingrediantArray.map((item) => {
            return (
              <BuildControl
                key={Math.random()}
                label={item.label}
                add={() => ingrediantAdd(item.type)}
                remove={() => ingrediantRemove(item.type)}
              />
            );
          })}
        </CardBody>
        <CardFooter>
          <h5>
            Total Price : <strong>{totalAmount}</strong> BDT
          </h5>
        </CardFooter>
        <Button
          style={{ backgroundColor: "#D70F64" }}
          disabled={!purchsesAble}
          onClick={toggleModal}
        >
          Order Now
        </Button>
      </Card>
    </div>
  );
};

export default Control;
