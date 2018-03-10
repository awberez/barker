# Barker - the Dog Tinder App

Welcome to Barker, a simple app to help you and your best bud find and match with nearby playdates. Check out the live demo [here](https://barkerapp.herokuapp.com/)!

## Functionality

Using your address and playdate preferences such as dog breed, size, age, and even demeanor, our app will show you a list of matching "Barkers" within your specified distance with the option to "Match" with anyone that catches your eye! When there is a mutual match, both users will have the option to communicate and hopefully be on their way to a new puppy playdate.

## Getting Started

To run the application locally, first clone this repository to your computer using the following command:

```
$ git clone https://github.com/awberez/dog-tinder.git
```

Assuming mySQL is installed, navigate to `/dog-tinder/config` and edit the `config.json` file to incorporate your own mySQL password and an empty database.

Navigate to the generated folder and run the following command twice, once in the main directory and once within the `/dog-tinder/client` folder.

```
$ yarn install
```

After running 'yarn install' in both of those folders, navigate back to the main folder and run:

```
$ yarn start
```

Navigate to http://localhost:3001/, and check out the functioning app!

[screenshots of website]

## Technologies Used
- [React](https://reactjs.org/)
- [React Router](https://reacttraining.com/react-router/)
- [Node.js](https://nodejs.org/en/)
- [Express Server](https://www.npmjs.com/package/express)
- [MySQL](https://www.mysql.com/)
- [Sequelize ORM](http://sequelizejs.com/)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [Cloudinary](https://cloudinary.com/)
- [Google Maps API](https://developers.google.com/maps/)

## Future Development

## Contributers
- [Alex Berez](https://github.com/awberez)
- [Van Dang](https://github.com/honeyvan)
- [Charlotte Driscoll](https://github.com/Cdriscoll621)
- [Ronald Giles](https://github.com/rtgiles)
