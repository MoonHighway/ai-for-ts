# Lab 00 · Pick Your Project

> ⏱️ ~15 min · Do this during or right after the setup lesson.

You're going to build one thing across all six labs today. By the end you'll have a real
AI feature that uses every major SDK pattern — streaming, structured outputs, RAG, and
production hardening.

**The project should be small enough to build in a day and useful enough to matter.**

---

## Step 1: Pick an idea

Some starting points to spark your own idea. Don't take these literally — they're prompts,
not constraints.

**Content & writing**
- Summarize and tag articles or bookmarks you paste in
- Turn rough notes into a formatted document
- Extract action items from meeting transcripts

**Code & dev tools**
- Explain a code diff in plain English
- Review a function for issues and suggest improvements
- Answer questions about a codebase or README

**Data extraction**
- Parse unstructured text (emails, tickets, forms) into typed records
- Classify and route incoming requests by topic or urgency
- Pull structured data from any free-text input

**Personal / domain-specific**
- A Q&A chatbot over a set of docs you care about
- A classifier for a domain you know well (recipes, expenses, anything)
- Something that automates a tedious text-to-structure task you do repeatedly

> 🧠 The best project is one where you already know what "good output" looks like.
> If you can describe the desired output precisely, you can evaluate whether the
> model is doing it right.

---

## Step 2: Write a project brief

Fill this in before you write a line of code. You'll paste it into your AI tools constantly.

```
## What I'm building
[One sentence: what this does and who it's for]

## Input
[What goes in? Paste, form, file, question, etc.]

## Output
[What comes out? Plain text, structured data, streaming response, etc.]

## Success looks like
[How will I know it's working? What's a good answer vs. a bad one?]

## What I'll skip today
[Explicitly name what's out of scope — auth, persistence, production UI, etc.]
```

> 💡 **Tip:** Save this as `BRIEF.md` in your project. You'll reference it in every
> AI prompt today. A good brief makes every subsequent "build this" instruction
> clearer and reduces back-and-forth.

---

## Step 3: Scaffold with AI

Give your brief to Claude Code or Cursor and ask it to scaffold the project:

```
I'm building [your one-sentence description].

Here's my brief:
[paste BRIEF.md]

Scaffold a TypeScript project for this with:
- A single entry-point file (src/index.ts) with a placeholder for the main function
- A config.ts that exports MODEL and EMBEDDING_MODEL using the Vercel AI Gateway pattern
- An .env.example with AI_GATEWAY_API_KEY
- A package.json with "ai", "zod", and "dotenv" as dependencies and a "start" script
  that runs src/index.ts with tsx

Keep it minimal — just the shell. We'll fill in the AI calls in lab 01.
```

Install dependencies (`npm install`) and confirm the project runs (even if it just
prints "hello").

---

## Step 4: Sense-check the scope

Before moving on, ask yourself:

- Can I describe what a **good response** looks like? (If not, the task is too vague.)
- Does the happy path fit in one or two AI calls? (If not, scope it down.)
- Will I still care about this at 4pm? (If not, pick something else.)

Good scope: "Summarize a GitHub PR description and extract the key changes as a typed
list." Less good scope: "Build a full AI coding assistant."

---

➡️ Next: [Lab 01 · First AI call](./01-first-call.md) — after lesson 01
