/** Shared types for the Agents framework. */

export type AgentContext = Record<string, unknown>;

export interface AgentResult {
  output: string;
  context: AgentContext;
}

export interface Agent {
  readonly name: string;
  run(input: string, context?: AgentContext): Promise<AgentResult>;
}
