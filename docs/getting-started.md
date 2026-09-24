# Getting started

A short walkthrough of building your first agent.

## 1. Install

```bash
git clone https://github.com/gakshita/Agents.git
cd Agents
npm install
```

Node 18 or newer is required.

## 2. Write an agent

An agent is anything with a `name` and a `run()` method that returns an output
and the context it was given.

```ts
import type { Agent, AgentContext, AgentResult } from "./src/types.js";

export class UppercaseAgent implements Agent {
  readonly name = "uppercase";

  async run(input: string, context: AgentContext = {}): Promise<AgentResult> {
    return { output: input.toUpperCase(), context };
  }
}
```

## 3. Run it

```bash
npx ts-node index.ts
```

## Where to go next

- `docs/` for longer guides as they land.
- `README.md` for the project overview and roadmap.
