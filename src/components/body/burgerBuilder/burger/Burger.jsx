import Ingrediant from "../ingrediant/Ingrediant";
import "./Burger.css";

const Burger = ({ ingrediants }) => {
  let ingrediant = ingrediants
    .map((item) => {
      const newIngrediantArray = [...Array(item.amount).keys()];

      return newIngrediantArray.map((_) => {
        return <Ingrediant type={item.type} key={Math.random()} />;
      });
    })
    .reduce((arr, element) => {
      return arr.concat(element);
    }, []);
  if (ingrediant.length == 0) {
    ingrediant = <p>Please Add Some Ingrediants </p>;
  }
  return (
    <div className="burger">
      <Ingrediant type="burger-top" />
      {ingrediant}
      <Ingrediant type="burger-bottom" />
    </div>
  );
};

export default Burger;
