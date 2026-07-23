import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';
import {products} from '@site/src/data/products';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/products">
            Browse products
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="Company-wide documentation for Layr0 products, starting with Layr0 India Market Connector.">
      <HomepageHeader />
      <main>
        <section className={styles.productBand}>
          <div className="container">
            <Heading as="h2">Products</Heading>
            <div className={styles.productGrid}>
              {products.map((product) => (
                <article className={styles.productCard} key={product.slug}>
                  <div className={styles.productMeta}>
                    <span>{product.shortName}</span>
                    <span>{product.status}</span>
                  </div>
                  <Heading as="h3">{product.name}</Heading>
                  <p>{product.description}</p>
                  <p className={styles.hostStatus}>
                    Product host: {product.productHost} ({product.productHostStatus})
                  </p>
                  <Link className="button button--primary" to={product.docsPath}>
                    Open documentation
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
