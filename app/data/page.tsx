"use client";
import { useEffect, useState } from "react";

export default function DataPage() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/form", { cache: "no-store" })
      .then((res) => res.json())
      .then(setData)
      .catch(() => setData([]));
  }, []);

  return (
    <div>
      <h1>Submitted Data</h1>
      {data.length === 0 ? (
        <p>No data found.</p>
      ) : (
        <ul>
          {data.map((item, i) => (
            <li key={i}>{JSON.stringify(item)}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
