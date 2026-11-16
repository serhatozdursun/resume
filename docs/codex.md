# Codex project setup

This repository uses the Codex account signed into the app. No OpenAI API key is
needed for these local project instructions, skills, or custom agents. Models and
reasoning settings inherit from the active chat; the project does not pin a model
or change account authentication or permissions.

## Migrated features

| Cursor/Claude source                 | Codex equivalent                                          |
| ------------------------------------ | --------------------------------------------------------- |
| `.cursorrules`, `claude.md`          | Root `AGENTS.md`, loaded as project instructions          |
| `.cursor/skills/babysit-pr/SKILL.md` | `.agents/skills/babysit-pr/SKILL.md`                      |
| Auto-open PR workflow                | `.agents/skills/open-pr/SKILL.md` and `pr-opener` agent   |
| CI fix loop + auto-merge workflow    | `babysit-pr` skill and `ci-maintainer` agent; user merges |

The user selected automatic PR creation and scoped CI fixes, with **all merges
left to the user**, including dependent UI-test PRs. This replaces the original
Cursor auto-merge policy. The original Cursor files remain as migration references;
Codex uses the native files above, not the old workflow JSON. If Cursor automations
are still enabled in Cursor, disable them there to avoid competing workflows.

## Use in Codex

Open this repository in Codex and start a new chat to load `AGENTS.md`. Skills are
discovered under `.agents/skills/`; restart the app if newly added skills do not
appear. Use the workflows directly:

```text
Use $open-pr for my pushed feature branch.
Use $babysit-pr to investigate and fix CI on PR <number>. Leave merging to me.
```

Or explicitly request the named custom agents:

```text
Use the pr-opener agent for branch <branch>.
Use the ci-maintainer agent for PR <number>; wait for its result.
```

The monitor delegates eligible PR creation to `pr-opener` and a selected CI fix
to `ci-maintainer`, waits for each result, and records durable state in the primary
checkout. The schedule is managed in the app and is not installed by merging these files.

Agent definitions live in `.codex/agents/*.toml`. They inherit the active account,
model, permissions, and connected tools. They do not launch themselves.

## Repository monitor

Cursor's push/CI event workflow JSON is not a Codex schedule. A recurring Codex
app monitor can poll pushed branches and open PRs, invoke the two native skills,
and leave green PRs for the user. Scheduling is stored by the app/account rather
than activated by committing this documentation.

The monitor should inspect only `serhatozdursun/resume` and related UI-test PRs.
Open PRs only for same-repository pushed feature branches ahead of `main`. Skip
`main`, draft PR maintenance, forks, closed PRs, pending checks, unchanged failures,
and PRs stopped at the five-attempt limit. Check PR checks against the latest head
SHA. Use isolated checkouts for fixes so unrelated work is preserved. Persist retry
state under `.codex-pr-state/` in the primary project checkout. Notify only on a new
PR, a pushed fix, newly green checks, a failure requiring action, or another meaningful
change; stay quiet on unchanged or non-actionable runs.

Use existing GitHub connector access or CLI authentication (`gh auth status`).
Report missing permissions without exposing credentials. Never merge, enable
auto-merge, post extra PR comments, or push directly to `main`.

The monitor runs every 30 minutes in this chat while the computer is on and the app
is running. It records an initial branch baseline so old untouched branches do not
produce a burst of PRs; it opens PRs for subsequent new branches or changed pushed
heads. On a first run without saved state, establish that baseline before opening
PRs. Existing open PRs can still receive CI fixes. Process at most one CI fix per run.

The connected GitHub tool may expose only read access. The existing GitHub CLI
sign-in was verified for this setup and can be used for writes. A restricted-network
sandbox can make `gh auth status` report an invalid token; verify with permitted
network access before diagnosing this as a sign-in problem.

## Existing GitHub Actions AI review

`dangerfile.ts` already calls the OpenAI API. Its `OPENAI_API_KEY` GitHub secret
and API billing are separate from signing into Codex. The migration does not turn
that job into account-authenticated Codex execution. Keep the existing API-backed
review configured separately; never put Codex session credentials in Actions.

The browser tests also live in a separate repository. Its healer configuration is
not migrated by changing this repository; CI maintenance reads its instructions
when a UI-test failure needs work there.

## Official references

- [Project instructions](https://learn.chatgpt.com/docs/agent-configuration/agents-md)
- [Skills and repository discovery](https://learn.chatgpt.com/docs/build-skills)
- [Custom agents](https://learn.chatgpt.com/docs/agent-configuration/subagents)
