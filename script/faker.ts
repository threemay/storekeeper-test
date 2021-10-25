const MongoClient = require('mongodb').MongoClient;
const faker = require('faker');
const dayjs = require('dayjs');
const url = 'mongodb://localhost:27017';
const dbName = 'storekeeper';

let _id = 0;
MongoClient.connect(url, function (err, client) {
  const db = client.db(dbName);

  const fakeData = [];
  const genders = ['female', 'male'];
  const roles = ['manager', 'receptionist', 'therapist'];
  const profitLevels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const certifieds = ['true', 'false'];
  const states = ['NSW', 'VIC', 'ACT', 'QLD'];
  while (_id++ < 100) {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const password = faker.internet.password();
    const username = faker.lorem.word();
    const DOB = faker.date.between('1950-01-01', '2005-01-01');
    const email = faker.internet.email();
    const gender = faker.random.arrayElement(genders);
    const role = faker.random.arrayElement(roles);
    const mobile = '0451927455';
    const profitLevel = faker.random.arrayElement(profitLevels);
    const certified = faker.random.arrayElement(certifieds);
    const comment = faker.lorem.sentence();
    const active = faker.random.arrayElement(certifieds);
    const ip = faker.internet.ip();
    const time = faker.date.recent();
    const address = faker.address.streetAddress();
    const postcode = faker.address.zipCode();
    const suburb = faker.address.county();
    const city = faker.address.city();
    const state = faker.random.arrayElement(states);
    const country = faker.address.country();

    fakeData.push({
      _id,
      firstName,
      lastName,
      username,
      password,
      DOB: dayjs(DOB).format('DD-MM-YYYY'),
      email,
      gender,
      role,
      mobile,
      profitLevel,
      certified,
      comment,
      active,
      loginStatus: { ip, time },
      address: { address, suburb, postcode, city, state, country },
    });
  }

  db.collection('users')
    .insertMany(fakeData)
    .then(() => {
      client.close();
    });
});
