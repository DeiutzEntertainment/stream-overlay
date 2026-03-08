import {StrictMode, type ComponentType} from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';

export function renderPage(Component: ComponentType) {
  const rootElement = document.getElementById('root');

  if (!rootElement) {
    throw new Error('Root element #root was not found.');
  }

  createRoot(rootElement).render(
    <StrictMode>
      <Component />
    </StrictMode>,
  );
}