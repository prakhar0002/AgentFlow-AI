# AgentFlow AI — Agentic Workflow Automation

A responsive front-end academic project demonstrating the core idea of an agentic workflow:
1. A user submits a goal.
2. A Planner Agent decomposes the goal.
3. A Research Agent identifies context and requirements.
4. An Execution Agent creates an action plan.
5. A Review Agent checks risks and completeness.
6. The system presents a structured result.

## Run locally
- Extract the ZIP.
- Open `index.html` in a modern browser.
- No installation or API key is required.

## Deploy on Netlify
1. Open https://app.netlify.com/drop
2. Drag and drop the extracted `agentflow_ai` folder (or its contents).
3. Netlify will publish a live website URL.

## Important project note
This is a self-contained demonstration. The agents are simulated with browser-side JavaScript rules; it does not call a live LLM, search the internet, or execute external actions. For a production version, connect an LLM API and add secure server-side orchestration, tool permissions, logging, and human approval for consequential actions.

## Suggested technology stack
HTML5, CSS3, JavaScript (ES6), responsive UI.
