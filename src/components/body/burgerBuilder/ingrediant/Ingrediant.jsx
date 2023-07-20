import BurgerTop from "../../../../assets/images/top.png";
import BurgerBottom from "../../../../assets/images/bottom.png";
import Salad from "../../../../assets/images/salad.png";
import Cheese from "../../../../assets/images/cheese.png";
import Meat from "../../../../assets/images/meat.png";

const Ingrediant = (props) => {
  let ingrediant = null;

  switch (props.type) {
    case "burger-top":
      ingrediant = (
        <div>
          <img src={BurgerTop} alt="top" />
        </div>
      );
      break;
    case "burger-bottom":
      ingrediant = (
        <div>
          <img src={BurgerBottom} alt="bottom" />
        </div>
      );
      break;
    case "salad":
      ingrediant = (
        <div>
          <img src={Salad} alt="salad" />
        </div>
      );
      break;

    case "cheese":
      ingrediant = (
        <div>
          <img src={Cheese} alt="salad" />
        </div>
      );
      break;

    case "meat":
      ingrediant = (
        <div>
          <img src={Meat} alt="salad" />
        </div>
      );
      break;

    default:
      ingrediant = null;
      break;
  }
  return ingrediant;
};

export default Ingrediant;
