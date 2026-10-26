# Security policy

## Reporting a vulnerability

Please don't open a public issue. Report it privately here:
https://github.com/VKrebs/code-a-la-carte/security/advisories/new

Include what you found, how to reproduce it, and what an attacker could do with it. English or French is fine.

Good-faith testing is welcome. Please avoid denial of service, spam and social engineering.

## Scope

Code à la Carte is a static site: no accounts, no forms, no cookies, no backend.

In scope:

- the site at https://codealacarte.dev (response headers, CSP, anything it serves)
- the dependencies in this repository
- the GitHub Actions workflows and the deploy pipeline

Out of scope:

- issues in Cloudflare or GitHub themselves; report those to them
- attacks that need control of the visitor's machine or browser

## What to expect

I maintain this alone. I'll reply within 7 days. If the report is valid, I'll fix it, publish a GitHub security advisory, and credit you in it unless you'd rather not be named.
