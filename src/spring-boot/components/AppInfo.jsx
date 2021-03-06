import PropTypes from 'prop-types';
import React from 'react';
import { Row, Column } from 'react-foundation';


export default class AppInfo extends React.Component {

  render() {
    const {info} = this.props;

    if (!info) {
      return null;
    }

    return (
      <Row>
        <Column>
          <h4>Build info</h4>
          <ul>
            <li><b>Group ID:</b> <code>{info.build.group}</code></li>
            <li><b>Artifact ID:</b> <code>{info.build.artifact}</code></li>
            <li><b>Name:</b> <code>{info.build.name}</code></li>
            <li><b>Version:</b> <code>{info.build.version}</code></li>
          </ul>

          <h4>Git</h4>
          <ul>
            <li><b>Git branch:</b> <code>{info.git.branch}</code></li>
            <li><b>Git commit:</b> <code>{info.git.commit.id}</code></li>
          </ul>

          <h4>Instance info</h4>
          <ul>
            <li><b>Application:</b> <code>{info.instanceInfo.app}</code></li>
            <li><b>Env logique:</b> <code>{info.instanceInfo.logicalEnv}</code></li>
            <li><b>Env physique:</b> <code>{info.instanceInfo.physicalEnv}</code></li>
            <li><b>Instance:</b> <code>{info.instanceInfo.instance}</code></li>
          </ul>
        </Column>
      </Row>
    );
  }

}

AppInfo.propTypes = {
  info: PropTypes.object,
};
