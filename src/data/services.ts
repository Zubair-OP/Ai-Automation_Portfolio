export interface PipelineStage {
  code: string
  title: string
  desc: string
}

export const PIPELINE: PipelineStage[] = [
  {
    code: '01',
    title: 'Input',
    desc: 'Repetitive workflows — emails, tickets, spreadsheets, webhooks.',
  },
  {
    code: '02',
    title: 'AI Processing',
    desc: 'LLM reasoning — classification, extraction, and decisions with LangChain.',
  },
  {
    code: '03',
    title: 'Logic',
    desc: 'Rules, routing, and guardrails that decide what happens next.',
  },
  {
    code: '04',
    title: 'Automation',
    desc: 'n8n pipelines, API glue, and actions executed against your stack.',
  },
  {
    code: '05',
    title: 'Output',
    desc: 'Dashboards, notifications, CRM updates, and calls — delivered.',
  },
]

export interface AutomationSystem {
  title: string
  desc: string
  tag: string
}

export const AUTOMATION_SYSTEMS: AutomationSystem[] = [
  {
    title: 'AI Agent Orchestration Platform',
    desc: 'A coordination layer where autonomous AI agents split, delegate, and solve one brief in real time.',
    tag: 'Agents',
  },
  {
    title: 'AI Chat Assistant',
    desc: 'Streaming chat experience with live token flow, voice input, and per-session memory.',
    tag: 'Realtime AI',
  },
  {
    title: 'E-commerce AI Assistant',
    desc: 'Shopping assistant wired into product data through a LangChain prompt graph.',
    tag: 'RAG',
  },
  {
    title: 'Workflow Automation Suite',
    desc: 'Custom n8n automations, webhook integrations, and pipelines connecting your entire tech stack.',
    tag: 'Automation',
  },
  {
    title: 'AI Voice Calling Agent',
    desc: 'Real-time conversational voice bot for automated inbound and outbound calling.',
    tag: 'Voice',
  },
  {
    title: 'AI Classification & Routing Engine',
    desc: 'Models that read intent from short input and route to the right outcome — like Moodify.',
    tag: 'ML',
  },
]