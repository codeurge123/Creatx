import React from "react";

export default function Privacy() {
  return (
    <section className="mx-auto max-w-4xl rounded-2xl border border-white/10 bg-white/5 px-8 py-10 text-white">
      <h1 className="text-3xl font-bold">Privacy Policy</h1>
      <p className="mt-4 text-white/70">
        Creatx stores the account details needed to authenticate users, save created components, and track likes on shared content.
      </p>
      <p className="mt-3 text-white/70">
        Access and refresh tokens are used only to keep your session active and protect authenticated features.
      </p>
      <p className="mt-3 text-white/70">
        We do not ask for more personal information than necessary to provide the product features shown inside the app.
      </p>
    </section>
  );
}
