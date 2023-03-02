import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import { useEffect, useState } from "react";
import { FadeLoader } from "react-spinners";

const AvailableMeals = () => {
  const [availableMeals, setAvailableMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    fetch("https://react-http-16399-default-rtdb.firebaseio.com/meals.json")
      .then((response) => response.json())

      .then((data) => {
        if (!data) {
          throw new Error("Invalid data received");
        }
        const mealsData = [];

        for (const key in data) {
          mealsData.push({
            id: key,
            ...data[key],
          });
        }
        setAvailableMeals(mealsData);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setHasError(true);
        setIsLoading(false);
      });
  }, []);

  if (hasError) {
    return (
      <p style={{ textAlign: "center", color: "red" }}>
        Something went wrong!!
      </p>
    );
  }

  const meals = Array.isArray(availableMeals)
    ? availableMeals.map(({ id, name, description, price }) => {
        return (
          <MealItem
            key={id}
            id={id}
            name={name}
            description={description}
            price={price}
          />
        );
      })
    : null;

  return (
    <section className={classes.meals}>
      {isLoading ? (
        <div className={classes.loading}>
          <FadeLoader color="#36d7b7" />
          <h3>Fetching Available Meals...</h3>
        </div>
      ) : (
        <Card>
          <ul>{meals}</ul>
        </Card>
      )}
    </section>
  );
};

export default AvailableMeals;
