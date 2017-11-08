import React from 'react';
import { Link } from 'react-router';
import { Row, Column, MediaObject, MediaObjectSection, Thumbnail, Badge } from 'react-foundation';
import PropTypes from 'prop-types';
import queryString from 'query-string';

import { PageComponent } from '../page/components';
import withIntersectionObserver, { IntersectionObserverAdapter, intersectionObserverPropTypes } from './withIntersectionObserver';


const adapter = new IntersectionObserverAdapter();


const LazyLoadingThumbnail = withIntersectionObserver(adapter)(class MyThumbnail extends React.PureComponent {

  static propTypes = {
    ...intersectionObserverPropTypes,
  };

  state = {
    loaded: false,
  };

  componentWillReceiveProps(nextProps) {
    const { intersectionRatio } = nextProps;
    if (intersectionRatio !== null && intersectionRatio > 0) {
      this.setState(prevState => {
        if (prevState.loaded) {
          return null;
        }
        return {
          loaded: true,
        };
      });
    }
  }

  componentDidUpdate() {
    const { unregisterFromIntersectionObserver } = this.props;
    const { loaded } = this.state;

    if (loaded) {
      unregisterFromIntersectionObserver();
    }
  }

  render() {
    // eslint-disable-next-line no-unused-vars
    const { intersectionRatio, unregisterFromIntersectionObserver, ...otherProps } = this.props;
    const { loaded } = this.state;
    return loaded ? <Thumbnail {...otherProps} /> : null;
  }

});


function Artist({ artist }) {
  let image = null;
  if (artist.image) {
    image = (
      <MediaObjectSection>
        <LazyLoadingThumbnail src={artist.image} width={200}/>
      </MediaObjectSection>
    );
  }

  const albums = artist.albums.map(album => {
    return (
      <span key={album.id}>
        {' '}<a href={album.uri}>{album.name}</a>
      </span>
    );
  })

  return (
    <MediaObject>
      {image}
      <MediaObjectSection isMain>
        <h4>
          <a href={artist.uri}>{artist.name}</a>
          {' '}
          <Badge>{artist.followers}</Badge>
        </h4>
        <p><b>Genres :</b> {artist.genres.join(', ')}</p>
        <p><b>Popularité :</b> {artist.popularity}%</p>
        <p><b>Albums :</b> {albums}</p>
      </MediaObjectSection>
    </MediaObject>
  );
}

Artist.propTypes = {
  artist: PropTypes.object.isRequired,
};


export class Artists extends React.Component {

  componentDidMount() {
    this.props.onLoadArtists();
  }

  render() {
    const { artists } = this.props;

    const columns = artists.map(artist => {
      return (
        <Column key={artist.id} isColumn>
          <Artist artist={artist}/>
        </Column>
      );
    });

    return (
      <Row upOnSmall={1} upOnMedium={1} upOnLarge={2}>{columns}</Row>
    );
  }

}


Artists.propTypes = {
  artists: PropTypes.array.isRequired,
  onLoadArtists: PropTypes.func.isRequired,
};


export class SpotifyComponent extends React.Component {

  componentDidMount() {
    this.props.onLoadProfile();
  }

  render() {
    const { profile, children } = this.props;

    let loggedContent = null;
    if (profile) {
      loggedContent = (
        <div>
          <Row>
            <Column>
              <p>
                <Link to="/spotify">Followed artists</Link>
                {' '}&mdash;{' '}
                <Link to="/spotify/top">Top artists</Link>
              </p>
            </Column>
          </Row>
          <Row>
            <Column>
              <p><b>Profil Spotify :</b> <a href={profile.uri}>{profile.id}</a></p>
            </Column>
          </Row>
          <Row>
            {children}
          </Row>
        </div>
      );
    }

    return (
      <PageComponent title="Spotify">
        {loggedContent}
      </PageComponent>
    );
  }

}

SpotifyComponent.propTypes = {
  profile: PropTypes.object,
  children: PropTypes.element,
  onLoadProfile: PropTypes.func.isRequired,
};


export function SpotifyWidget({ uri, view, theme, height, width }) {
  const dimensions = {};
  if (height) {
    dimensions.height = height;
  }
  if (width) {
    dimensions.width = width;
  }

  const queryParams = queryString.stringify({
    uri,
    theme,
    view,
  });
  const url = `https://embed.spotify.com/?${queryParams}`;

  return (
    <iframe src={url} frameBorder="0" allowTransparency="true" {...dimensions}></iframe>
  );
}

SpotifyWidget.propTypes = {
  uri: PropTypes.string.isRequired,
  view: PropTypes.oneOf(['list', 'coverart']).isRequired,
  theme: PropTypes.oneOf(['black', 'white']).isRequired,
  height: PropTypes.number,
  width: PropTypes.number,
};

SpotifyWidget.defaultProps = {
  theme: 'white',
};
