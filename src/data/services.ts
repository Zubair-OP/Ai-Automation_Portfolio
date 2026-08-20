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
  icon: 'sync' | 'leads' | 'unlink' | 'pen' | 'brain' | 'scale'
}

export const AUTOMATION_SYSTEMS: AutomationSystem[] = [
  {
    title: 'Repetitive Admin Tasks',
    desc: 'Hours lost on tasks that should run themselves.',
    tag: 'Automation',
    icon: 'sync',
  },
  {
    title: 'Lost Leads & Slow Follow-ups',
    desc: 'Potential clients slipping through the cracks.',
    tag: 'Sales & CRM',
    icon: 'leads',
  },
  {
    title: 'Disconnected Tools',
    desc: 'Data stuck in silos with no integration.',
    tag: 'Integrations',
    icon: 'unlink',
  },
  {
    title: 'Manual Content Creation',
    desc: 'Creating every post, email, and asset by hand.',
    tag: 'AI Workflows',
    icon: 'pen',
  },
  {
    title: 'No AI in Operations',
    desc: 'Competitors are automating — you\'re not.',
    tag: 'AI Operations',
    icon: 'brain',
  },
  {
    title: 'Scaling Bottlenecks',
    desc: 'Growing headcount instead of scaling systems automatically.',
    tag: 'Efficiency',
    icon: 'scale',
  },
]