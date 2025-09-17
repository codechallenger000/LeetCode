class FoodRatings {
    constructor(foods, cuisines, ratings) {
        this.foodToCuisine = new Map();
        this.foodToRating = new Map();
        this.cuisineToRatings = new Map();

        this.comparator = (a, b) => {
            if (a.rating !== b.rating) return b.rating - a.rating;
            return a.food.localeCompare(b.food);
        };

        for (let i = 0; i < foods.length; i++) {
            const food = foods[i];
            const cuisine = cuisines[i];
            const rating = ratings[i];

            this.foodToCuisine.set(food, cuisine);
            this.foodToRating.set(food, rating);

            if (!this.cuisineToRatings.has(cuisine)) {
                this.cuisineToRatings.set(cuisine, []);
            }

            this.cuisineToRatings.get(cuisine).push({ food, rating });
        }

        for (let [cuisine, list] of this.cuisineToRatings.entries()) {
            list.sort(this.comparator);
        }
    }

    changeRating(food, newRating) {
        const cuisine = this.foodToCuisine.get(food);
        const list = this.cuisineToRatings.get(cuisine);
        const oldRating = this.foodToRating.get(food);

        // Remove old entry
        const index = list.findIndex(entry => entry.food === food);
        list.splice(index, 1);

        // Insert new entry
        list.push({ food, rating: newRating });
        list.sort(this.comparator);

        // Update map
        this.foodToRating.set(food, newRating);
    }

    highestRated(cuisine) {
        return this.cuisineToRatings.get(cuisine)[0].food;
    }
}