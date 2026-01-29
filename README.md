# Agents

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)

A TypeScript-based framework for building intelligent autonomous agents.

## Overview

**Agents** is a lightweight, extensible foundation for developing intelligent software agents. Whether you're building chatbots, automation tools, or AI-powered assistants, this project provides the scaffolding you need to get started quickly.

## Key Features

- **TypeScript First** - Built with TypeScript for type safety and better developer experience
- **Modular Architecture** - Easily extend and customize agent behavior
- **Lightweight** - Minimal dependencies, maximum flexibility
- **Easy Integration** - Designed to work with various AI/ML services and APIs

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- npm, yarn, or pnpm

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/gakshita/Agents.git
   cd Agents
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up TypeScript (if not already configured):**

   ```bash
   npm install -D typescript @types/node
   npx tsc --init
   ```

### Quick Start

```typescript
// index.ts - Your agent entry point

// Define your agent configuration
const agentConfig = {
  name: 'MyAgent',
  version: '1.0.0',
  capabilities: ['chat', 'automation']
};

// Initialize and run your agent
async function main() {
  console.log(`Starting ${agentConfig.name}...`);
  
  // Add your agent logic here
  // - Connect to APIs
  // - Process user input
  // - Execute tasks
}

main().catch(console.error);
```

### Running Your Agent

```bash
# Using ts-node for development
npx ts-node index.ts

# Or compile and run
npx tsc && node dist/index.js
```

## Project Structure

```
Agents/
├── index.ts          # Main entry point
├── README.md         # Project documentation
├── package.json      # Dependencies and scripts (create as needed)
└── tsconfig.json     # TypeScript configuration (create as needed)
```

## Development

### Recommended Extensions (VS Code)

- ESLint
- Prettier
- TypeScript Hero

### Scripts

Add these to your `package.json`:

```json
{
  "scripts": {
    "start": "ts-node index.ts",
    "build": "tsc",
    "dev": "ts-node-dev --respawn index.ts",
    "lint": "eslint . --ext .ts"
  }
}
```

## 🧩 Challenge: The Tricky React Keypress Problem

Here's a brain-teaser for React developers working with keyboard events:

### The Problem

You're building a search component that should:
1. Update search results as the user types (controlled input)
2. Close the dropdown when the user presses `Escape`
3. Submit the search when the user presses `Enter`
4. Navigate through results with `ArrowUp` and `ArrowDown`

```tsx
function SearchBox() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'Escape':
        setIsOpen(false);
        break;
      case 'Enter':
        submitSearch(query);
        break;
      case 'ArrowDown':
        setSelectedIndex(prev => prev + 1);
        break;
      case 'ArrowUp':
        setSelectedIndex(prev => prev - 1);
        break;
    }
  };

  return (
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      onKeyDown={handleKeyDown}
    />
  );
}
```

### The Tricky Parts

1. **Event Order Confusion**: `onKeyDown` fires before `onChange`. If you check `query` in `handleKeyDown` when pressing `Enter`, you might get stale state if the user typed fast!

2. **Composition Events**: For IME (Input Method Editor) users typing in Chinese, Japanese, or Korean, `keydown` events fire during composition but the input isn't finalized yet. Your `Enter` handler might submit incomplete text.

3. **`e.key` vs `e.keyCode` vs `e.code`**: 
   - `e.keyCode` is deprecated
   - `e.key` gives you `"Enter"` but can vary by keyboard layout
   - `e.code` gives you `"Enter"` consistently but ignores remapped keys

4. **Preventing Default Behavior**: Pressing `ArrowDown` in an input moves the cursor to the end. Did you remember `e.preventDefault()`?

5. **The `useCallback` Trap**: If you wrap `handleKeyDown` in `useCallback` with `[query]` as a dependency, you're recreating the function on every keystroke anyway!

### The Solution Hints

```tsx
const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  // Ignore events during IME composition
  if (e.nativeEvent.isComposing) return;
  
  switch (e.key) {
    case 'Escape':
      setIsOpen(false);
      e.currentTarget.blur(); // Also unfocus
      break;
    case 'Enter':
      e.preventDefault(); // Prevent form submission if inside a form
      // Use the current input value, not stale state
      submitSearch(e.currentTarget.value);
      break;
    case 'ArrowDown':
      e.preventDefault(); // Prevent cursor movement
      setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
      break;
    case 'ArrowUp':
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, 0));
      break;
  }
};
```

**Bonus Challenge**: How would you handle `Ctrl+A` to select all results vs the browser's native "select all text" behavior?

---

## Roadmap

- [ ] Core agent framework
- [ ] Plugin system for extensibility
- [ ] Built-in logging and monitoring
- [ ] Example agents and templates
- [ ] Documentation and tutorials

## Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Create** your feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

Please make sure to update tests and documentation as appropriate.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

**gakshita** - [GitHub Profile](https://github.com/gakshita)

---

<p align="center">
  Made with ❤️ for the developer community
</p>
