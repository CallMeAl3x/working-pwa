"use client";
import { useState, FormEvent } from "react";
import Link from "next/link";

export default function Page() {
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    if (navigator.onLine) {
      await fetch("/api/form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      setStatus("Sent successfully");
    } else {
      const registration = await navigator.serviceWorker.ready;
      const cache = await caches.open("form-requests");
      const cacheKey = new Request(`/form-sync-${Date.now()}`);
      await cache.put(cacheKey, new Response(JSON.stringify(payload)));
      try {
        await registration.sync.register("sync-form");
      } catch (err) {}
      setStatus("Saved offline, will send when online");
    }
  };

  return (
    <>
      <h1>Next.js + Serwist</h1>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Your name" required />
        <button type="submit">Submit</button>
      </form>
      <p>{status}</p>
      <Link href="/data">
        <button type="button">Data</button>
      </Link>
    </>
  );
}
