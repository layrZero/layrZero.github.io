import styles from './styles.module.css';

const accessSteps = [
  {
    title: 'Layr0 Console',
    detail: 'Enable product access.',
  },
  {
    title: 'License + OTP',
    detail: 'Sign in and select license.',
  },
  {
    title: 'Broker Setup',
    detail: 'Register credentials.',
  },
  {
    title: 'Broker Session',
    detail: 'Login, OAuth, or TOTP.',
  },
];

const tradingSources = ['TradingView', 'GoCharting', 'Chartink', 'Python/API'];

const routeSteps = [
  {
    title: 'API Key',
    detail: 'Broker-scoped request auth.',
  },
  {
    title: 'Auto / Semi-Auto',
    detail: 'Execute now or approve first.',
  },
  {
    title: 'Broker Execution',
    detail: 'Route accepted live orders.',
  },
];

const monitoringItems = ['Monitoring', 'Logs', 'Positions', 'P&L', 'positionsopen'];
const safetyChips = ['Live', 'Analyze/Sandbox', 'Auto', 'Semi-Auto', 'expected_mode', 'request_id'];

function PipelineNode({title, detail}: {title: string; detail: string}) {
  return (
    <li className={styles.node}>
      <strong>{title}</strong>
      <span>{detail}</span>
    </li>
  );
}

function PacketRail({label}: {label: string}) {
  return (
    <div className={styles.packetRail} aria-hidden="true">
      <span className={styles.railLabel}>{label}</span>
      <span className={styles.packet} />
      <span className={styles.packet} />
      <span className={styles.packet} />
    </div>
  );
}

export default function ProductFlowExplainer() {
  return (
    <section className={styles.explainer} aria-label="Router-IMC product flow explainer">
      <div className={styles.header}>
        <span className={styles.eyebrow}>Product route</span>
        <h2>License, connect, route, verify</h2>
        <p>
          Router-IMC validates the licensed broker context before routing automation requests to
          execution and monitoring surfaces.
        </p>
      </div>

      <div className={styles.pipeline}>
        <div className={styles.lane}>
          <span className={styles.laneTitle}>Access path</span>
          <ol className={styles.nodeStack}>
            {accessSteps.map((step) => (
              <PipelineNode key={step.title} {...step} />
            ))}
          </ol>
        </div>

        <PacketRail label="licensed context" />

        <div className={styles.processor} aria-label="Router-IMC processor">
          <span className={styles.processorHalo} />
          <span className={styles.processorBadge}>Router-IMC</span>
          <strong>Validate and route</strong>
          <span>mode, broker, API key, request context</span>
          <div className={styles.processorChecks}>
            <code>expected_mode</code>
            <code>request_id</code>
          </div>
        </div>

        <PacketRail label="accepted order flow" />

        <div className={styles.lane}>
          <span className={styles.laneTitle}>Routing path</span>
          <div className={styles.sourceCluster} aria-label="Supported trading sources">
            {tradingSources.map((source) => (
              <span key={source}>{source}</span>
            ))}
          </div>
          <ol className={styles.nodeStack}>
            {routeSteps.map((step) => (
              <PipelineNode key={step.title} {...step} />
            ))}
          </ol>
        </div>
      </div>

      <div className={styles.monitorRail} aria-label="Monitoring and reconciliation">
        <span className={styles.monitorTitle}>Monitoring + reconciliation</span>
        <div className={styles.monitorItems}>
          {monitoringItems.map((item) => (
            <code key={item}>{item}</code>
          ))}
        </div>
      </div>

      <div className={styles.safetyStrip} aria-label="Operating safeguards">
        {safetyChips.map((chip) => (
          <code key={chip}>{chip}</code>
        ))}
      </div>
    </section>
  );
}
