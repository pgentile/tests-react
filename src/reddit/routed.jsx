import PropTypes from 'prop-types';
import React from 'react';

import { PageComponent } from '../page/components';
import { LoadTopicComponent, RedditListComponent as RedditListComponentBase } from './containers';


export function RedditComponent({params, children}) {
  return (
    <PageComponent title="Reddit">
      <LoadTopicComponent topic={params.topic}/>
      {children}
    </PageComponent>
  );
}

RedditComponent.propTypes = {
  params: PropTypes.object.isRequired,
  children: PropTypes.element,
};


export function RedditListComponent({params}) {
  return (
    <RedditListComponentBase topic={params.topic}/>
  )
}

RedditListComponent.propTypes = {
  params: PropTypes.object.isRequired,
};
