# react-blackjack

This is a basic implementation of the Blackjack game using React.

## How to play

1. [Install Docker Compose](https://docs.docker.com/compose/install/)
2. Clone this repository
3. Navigate to the project folder and run `docker-compose up`
4. Open your browser and navigate to [http://localhost:3000](http://localhost:3000)

## How to run tests

1. Navigate to the project folder and run `cd client`
2. Run tests with `npm test`
3. Run storybook with `npm run storybook`
4. Check file coverage by running `npm test -- --coverage --watchAll=false`, then find the `/client/coverage/lcov-report/index.html` file and open it in a browser

## TODO:

1. Improve layout and responsiveness
2. Implement other game features (bets, double, split, insurances)
3. Create a panel to let users customize de game rules (number of decks, stand/hit on soft 17, etc)
