import React from 'react';

import { PageComponent } from '../../page/components';
import FailingComponent from './FailingComponent';


export default function ErrorBoundaryPage() {
  return (
    <PageComponent title="Error boundary">
      <p>
        <FailingComponent />
      </p>
    </PageComponent>
  );
}
