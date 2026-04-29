import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const docSections = [
  {
    id: "introduction",
    label: "Introduction",
    title: "Introduction to Creatx",
    description:
      "Creatx is a component playground for discovering micro-interactions, copying production-ready snippets, sharing creations, and building your own UI ideas with live previews.",
    blocks: [
      {
        heading: "What Is Creatx?",
        paragraphs: [
          "Creatx is built for developers and designers who want fast access to small, expressive front-end components. Instead of hunting through scattered examples, you can browse a focused library of interactive UI patterns in one place.",
          "Each component in Creatx is previewable, editable, and copyable. You can open a component, inspect the HTML, CSS, and JavaScript, and decide whether to use it as-is or adapt it for your product.",
        ],
      },
      {
        heading: "Why Creatx Matters",
        bullets: [
          "Discover reusable CSS and JS components quickly",
          "Preview behavior before copying code",
          "Create and save your own experiments with live editing",
          "Share selected creations with the community",
          "Keep track of favorites inside your personal profile",
        ],
      },
    ],
  },
  {
    id: "getting-started",
    label: "Getting Started",
    title: "Getting Started",
    description:
      "Use Creatx in a few simple steps whether you want to browse, build, or share.",
    blocks: [
      {
        heading: "Basic Flow",
        bullets: [
          "Open the Components tab to browse sample components",
          "Open any card to preview and inspect its code",
          "Sign up or log in to like, save, and manage your work",
          "Use the Create page to build a custom component from HTML, CSS, and JS",
          "Share your saved component publicly if you want it to appear in Community",
        ],
      },
      {
        heading: "Accounts and Access",
        paragraphs: [
          "Guests can browse components and community content, but account-based actions such as saving and persistent likes require authentication.",
          "Once logged in, your saved work, favorites, and profile actions become available immediately across the app.",
        ],
      },
    ],
  },
  {
    id: "components",
    label: "Components Tab",
    title: "Using the Components Library",
    description:
      "The Components tab is the fastest way to discover Creatx building blocks.",
    blocks: [
      {
        heading: "Inside the Library",
        paragraphs: [
          "The Components tab shows curated sample components from the local library. You can filter by CSS or JS category and open any item for a full preview.",
          "When you like a component while logged in, the like state stays with your account on the front end until you unlike it.",
        ],
      },
      {
        heading: "What You Can Do",
        bullets: [
          "Filter components by type",
          "Open modal previews with code and live output",
          "Copy code directly from the modal",
          "Like components while logged in",
          "Keep liked sample components visible in your profile favorites popup",
        ],
      },
    ],
  },
  {
    id: "create",
    label: "Create Tab",
    title: "Create Your Own Components",
    description:
      "The Create tab gives you a live playground for building and saving custom UI experiments.",
    blocks: [
      {
        heading: "Editor Workflow",
        paragraphs: [
          "You can edit HTML, CSS, and JavaScript side by side and see the result instantly in the live preview pane.",
          "When you save a component while logged in, it appears in your saved list below the editor. You can load it back into the editor later or delete it permanently.",
        ],
      },
      {
        heading: "Saved Items",
        bullets: [
          "Load a previously saved component back into the editor",
          "Delete a saved component directly from the list",
          "Optionally mark a component as shared when saving",
          "View your personal saved list only when authenticated",
        ],
      },
    ],
  },
  {
    id: "community",
    label: "Community",
    title: "Community and Sharing",
    description:
      "Community is where public user-created components become discoverable to everyone.",
    blocks: [
      {
        heading: "How Sharing Works",
        paragraphs: [
          "A component appears in Community when a logged-in user saves it as shared. Community visitors can browse those public items without logging in.",
          "Liking a community item is still protected. A guest can view it, but only a logged-in user can keep it in favorites.",
        ],
      },
      {
        heading: "Community Features",
        bullets: [
          "Browse public user-created components",
          "Open preview and code modal views",
          "Visit creator profiles",
          "Like public items while logged in",
          "See liked items later inside your profile favorites popup",
        ],
      },
    ],
  },
  {
    id: "profile",
    label: "Profile",
    title: "Profile and Favorites",
    description:
      "The profile page is your control center for account details, shared items, and favorites.",
    blocks: [
      {
        heading: "Profile Structure",
        paragraphs: [
          "The main profile view now shows a clean account summary with username, email, and quick action buttons.",
          "Profile actions open focused popups so account updates, shared items, and favorites stay separated and easier to manage.",
        ],
      },
      {
        heading: "Available Actions",
        bullets: [
          "Open Update Profile to change username, email, or password",
          "Open Shared to view components you made public",
          "Open Favorite to view all liked items",
          "Keep liked sample components and backend community likes in one favorites experience",
        ],
      },
    ],
  },
  {
    id: "best-practices",
    label: "Best Practices",
    title: "Best Practices",
    description:
      "A few habits help you get better results while working inside Creatx.",
    blocks: [
      {
        heading: "Recommended Habits",
        bullets: [
          "Start simple and build effects incrementally",
          "Keep HTML structure minimal and semantic",
          "Use reusable class names when designing custom components",
          "Preview interactions before saving or sharing",
          "Only share items that look complete enough for others to learn from",
        ],
      },
    ],
  },
];

function SectionContent({ section }) {
  return (
    <div className="space-y-12">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/40">
          Creatx Docs
        </p>
        <h1 className="mt-3 text-5xl font-bold tracking-tight text-white md:text-6xl">
          {section.title}
        </h1>
        <p className="mt-5 max-w-4xl text-xl leading-9 text-white/60">
          {section.description}
        </p>
      </div>

      {section.blocks.map((block) => (
        <section key={block.heading} className="border-b border-white/8 pb-10 last:border-b-0 last:pb-0">
          <h2 className="text-3xl font-semibold text-white md:text-4xl">{block.heading}</h2>

          {block.paragraphs?.map((paragraph) => (
            <p key={paragraph} className="mt-5 max-w-4xl text-lg leading-8 text-white/65">
              {paragraph}
            </p>
          ))}

          {block.bullets?.length ? (
            <ul className="mt-7 space-y-4 text-lg text-white/65">
              {block.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3">
                  <span className="mt-2 h-2.5 w-2.5 rounded-full bg-white/80" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </section>
      ))}
    </div>
  );
}

export default function DocsShell() {
  const [activeSection, setActiveSection] = useState("introduction");

  const activeDoc = useMemo(
    () => docSections.find((section) => section.id === activeSection) || docSections[0],
    [activeSection]
  );

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto flex min-h-screen max-w-[1600px]">
        <aside className="sticky top-0 hidden h-screen w-[300px] shrink-0 border-r border-white/10 bg-black px-5 py-10 lg:block">
          <Link to="/" className="block text-[2.1rem] font-bold tracking-tight text-white">
            Creatx
          </Link>

          <div className="mt-10 space-y-1.5">
            {docSections.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`block w-full rounded-xl px-4 py-2.5 text-left text-[0.96rem] font-medium transition ${
                  activeSection === item.id
                    ? "bg-white/6 text-white"
                    : "text-white/42 hover:bg-white/[0.03] hover:text-white/85"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.02] p-5">
            <p className="text-sm font-semibold text-white">Quick Tip</p>
            <p className="mt-2 text-sm leading-6 text-white/55">
              Use the Components tab for curated sample items and the Create tab for your own saved experiments.
            </p>
          </div>

          <Link
            to="/"
            className="mt-8 inline-flex w-full items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/[0.06]"
          >
            ← Back to Home
          </Link>
        </aside>

        <main className="min-w-0 flex-1 px-6 py-10 md:px-10 lg:px-16 xl:px-20">
          <div className="mb-8 flex items-center justify-between lg:hidden">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-white/40">Creatx Docs</p>
              <div className="mt-2 text-3xl font-bold">Creatx</div>
            </div>
            <Link
              to="/"
              className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/[0.06]"
            >
              ← Back Home
            </Link>
          </div>

          <div className="mb-10 flex gap-3 overflow-x-auto pb-2 lg:hidden">
            {docSections.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition ${
                  activeSection === item.id
                    ? "bg-white text-black"
                    : "bg-white/[0.04] text-white/60 hover:bg-white/[0.08]"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="max-w-5xl">
            <SectionContent section={activeDoc} />
          </div>
        </main>
      </div>
    </div>
  );
}
