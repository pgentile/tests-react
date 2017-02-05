import React from 'react';

import AboutComponentContainer from '../containers/AboutComponentContainer';
import TargetAppFormContainer from '../containers/TargetAppFormContainer';


import { PageComponent } from '../../page/components';


export function SpringBootComponent() {
  return (
    <PageComponent title="Spring Boot">
      <TargetAppFormContainer />
      <AboutComponentContainer/>
    </PageComponent>
  );
}

SpringBootComponent.propTypes = {
};
