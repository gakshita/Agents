export type AgentHandler = (input: string) => Promise<string> | string;

export interface AgentConfig {
  name: string;
  version: string;
  capabilities: string[];
}

export class Agent {
  private readonly handlers = new Map<string, AgentHandler>();

  constructor(private readonly config: AgentConfig) {}

  public get metadata(): AgentConfig {
    return { ...this.config, capabilities: [...this.config.capabilities] };
  }

  public registerCapability(name: string, handler: AgentHandler): void {
    this.handlers.set(name, handler);

    if (!this.config.capabilities.includes(name)) {
      this.config.capabilities.push(name);
    }
  }

  public async execute(capability: string, input: string): Promise<string> {
    const handler = this.handlers.get(capability);

    if (!handler) {
      throw new Error(
        `Capability "${capability}" is not registered for agent "${this.config.name}".`,
      );
    }

    return Promise.resolve(handler(input));
  }
}

async function main(): Promise<void> {
  const agent = new Agent({
    name: "NewwwAgent",
    version: "1.0.0",
    capabilities: [],
  });

  agent.registerCapability("chat", (input) => `NewwwAgent heard: ${input}`);
  agent.registerCapability("automation", (input) => `Automated task: ${input}`);

  console.log(`Starting ${agent.metadata.name} v${agent.metadata.version}...`);
  console.log(`Capabilities: ${agent.metadata.capabilities.join(", ")}`);

  const response = await agent.execute("chat", "hello");
  console.log(response);
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : "Unknown error";
  console.error(`Agent failed: ${message}`);
  process.exitCode = 1;
});
