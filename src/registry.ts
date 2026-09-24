import type { Agent } from "./types.js";

/** In-memory lookup of agents by name. */
export class AgentRegistry {
  private readonly agents = new Map<string, Agent>();

  register(agent: Agent): void {
    if (this.agents.has(agent.name)) {
      throw new Error(`An agent named "${agent.name}" is already registered.`);
    }
    this.agents.set(agent.name, agent);
  }

  get(name: string): Agent | undefined {
    return this.agents.get(name);
  }

  list(): string[] {
    return [...this.agents.keys()];
  }
}
