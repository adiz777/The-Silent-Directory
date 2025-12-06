import React, { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";

function generateCities(count = 80) {
  const levels = ["Cold", "Low", "Active", "Hot", "Critical"];
  const cities = [];
  for (let i = 0; i < count; i++) {
    cities.push({
      id: "CITY-" + (i + 1),
      name: faker.location.city(),
      country: faker.location.country(),
      activity: faker.helpers.arrayElement(levels),
      operators: faker.number.int({ min: 0, max: 25 }),
      missions: faker.number.int({ min: 0, max: 40 }),
    });
  }
  return cities;
}

export default function Cities() {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    setCities(generateCities(120));
  }, []);

  return (
    <div className="w-full h-full p-6 overflow-auto">
      <h1 className="text-xl mb-4">Cities Activity</h1>
      <p className="text-sm mb-4">
        Synthetic world heat overview. Activity levels, operators and missions are all fictional.
      </p>

      <table className="w-full text-left text-sm">
        <thead>
          <tr>
            <th>City</th>
            <th>Country</th>
            <th>Activity</th>
            <th>Operators</th>
            <th>Missions</th>
          </tr>
        </thead>
        <tbody>
          {cities.map((c) => (
            <tr key={c.id}>
              <td>{c.name}</td>
              <td>{c.country}</td>
              <td>{c.activity}</td>
              <td>{c.operators}</td>
              <td>{c.missions}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
