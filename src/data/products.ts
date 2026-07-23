export type ProductStatus = 'available' | 'planned';

export type ProductDocsEntry = {
  name: string;
  shortName: string;
  slug: string;
  status: ProductStatus;
  docsPath: string;
  productHost: string;
  productHostStatus: string;
  sourceRepoPath: string;
  description: string;
};

export const products: ProductDocsEntry[] = [
  {
    name: 'Layr0 India Market Connector',
    shortName: 'IMC',
    slug: 'imc',
    status: 'available',
    docsPath: '/docs/products/imc',
    productHost: 'https://imc.layr0.org',
    productHostStatus: 'Not yet hosted',
    sourceRepoPath: 'C:\\Users\\adyse\\Documents\\github\\India-marketConnector',
    description:
      'Self-hosted broker gateway for Indian market automation, REST APIs, WebSocket market data, analyzer mode, and strategy reconciliation.',
  },
];
