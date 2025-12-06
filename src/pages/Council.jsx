import React, { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";

function generateCouncil(count = 12) {
  const seats = [];
  for (let i = 0; i < count; i++) {
    seats.push({
      id: "SEAT-" + (i + 1),
      title: "High Seat " + (i + 1),
      holder: faker.person.fullName(),
      region: faker.location.country(),
      status: faker.helpers.arrayElement(["Active", "Vacant", "Under Review"]),
      lastDecree: faker.lorem.sentence(),
    });
  }
  return seats;
}

function generateSessions(count = 20) {
  const sessions = [];
  for (let i = 0; i < count; i++) {
    sessions.push({
      id: "SESSION-" + (i + 1),
      subject: faker.lorem.words(4),
      outcome: faker.lorem.sentence(),
      date: faker.date.recent({ days: 60 }).toISOString(),
    });
  }
  return sessions;
}

export default function Council() {
  const [seats, setSeats] = useState([]);
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    setSeats(generateCouncil(12));
    setSessions(generateSessions(30));
  }, []);

  return (
    <div className="w-full h-full p-6 overflow-auto">
      <h1 className="text-xl mb-4">Council</h1>
      <p className="text-sm mb-4">
        Fictional High Table-style council overview. All seats, decrees and sessions are synthetic.
      </p>

      <h2 className="text-lg mb-2">Seats</h2>
      <table className="w-full text-left text-sm mb-6">
        <thead>
          <tr>
            <th>Seat</th>
            <th>Holder</th>
            <th>Region</th>
            <th>Status</th>
            <th>Last Decree</th>
          </tr>
        </thead>
        <tbody>
          {seats.map((s) => (
            <tr key={s.id}>
              <td>{s.title}</td>
              <td>{s.holder}</td>
              <td>{s.region}</td>
              <td>{s.status}</td>
              <td>{s.lastDecree}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="text-lg mb-2">Recent Sessions</h2>
      <table className="w-full text-left text-sm">
        <thead>
          <tr>
            <th>Session</th>
            <th>Subject</th>
            <th>Outcome</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {sessions.map((s) => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.subject}</td>
              <td>{s.outcome}</td>
              <td>{new Date(s.date).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
