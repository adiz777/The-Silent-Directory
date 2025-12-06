import React, { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";

function generateMessages(count = 60) {
  const channels = ["Whisper", "Courier", "Relay", "Dead Drop", "Emergency Line"];
  const msgs = [];
  for (let i = 0; i < count; i++) {
    msgs.push({
      id: "MSG-" + (i + 1),
      channel: faker.helpers.arrayElement(channels),
      from: faker.person.fullName(),
      to: faker.person.fullName(),
      subject: faker.lorem.words(3),
      body: faker.lorem.sentence(),
      timestamp: faker.date.recent({ days: 10 }).toISOString(),
    });
  }
  return msgs;
}

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [channelFilter, setChannelFilter] = useState("All");

  useEffect(() => {
    setMessages(generateMessages(80));
  }, []);

  const channels = ["All", "Whisper", "Courier", "Relay", "Dead Drop", "Emergency Line"];

  const filtered = messages.filter((m) =>
    channelFilter === "All" ? true : m.channel === channelFilter
  );

  return (
    <div className="w-full h-full p-6 overflow-auto">
      <h1 className="text-xl mb-4">Messages</h1>
      <p className="text-sm mb-4">
        Fictional encrypted-relay inbox. None of these messages are real or transmitted anywhere.
      </p>

      <div className="mb-4">
        <select
          value={channelFilter}
          onChange={(e) => setChannelFilter(e.target.value)}
          className="px-3 py-2"
        >
          {channels.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <table className="w-full text-left text-sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>Channel</th>
            <th>From</th>
            <th>To</th>
            <th>Subject</th>
            <th>Received</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((m) => (
            <tr key={m.id}>
              <td>{m.id}</td>
              <td>{m.channel}</td>
              <td>{m.from}</td>
              <td>{m.to}</td>
              <td>{m.subject}</td>
              <td>{new Date(m.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {filtered.length === 0 && (
        <p className="mt-4 text-sm opacity-70">
          No messages for this channel.
        </p>
      )}
    </div>
  );
}
