import type { Agent, AgentContext, AgentResult } from "./types.js";

/** Minimal agent that echoes its input. Useful as a starting point. */
export class EchoAgent implements Agent {
  constructor(public readonly name: string = "echo") {}

  async run(input: string, context: AgentContext = {}): Promise<AgentResult> {
    return { output: input, context };
  }
}
