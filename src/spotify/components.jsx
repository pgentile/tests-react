import React from 'react';
import { Link } from 'react-router';
import { Row, Column, MediaObject, MediaObjectSection, Thumbnail, Badge } from 'react-foundation';
import queryString from 'query-string';

import { PageComponent } from '../page/components';


function Profile({ profile }) {
  return (
    <p><b>Profil Spotify :</b> <a href={profile.uri}>{profile.id}</a></p>
  );
}

Profile.propTypes = {
  profile: React.PropTypes.object.isRequired,
};


function Artist({ artist }) {
  let image = null;
  if (artist.image) {
    image = (
      <MediaObjectSection>
        <Thumbnail src={artist.image} width={150}/>
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
  artist: React.PropTypes.object.isRequired,
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
  artists: React.PropTypes.array.isRequired,
  onLoadArtists: React.PropTypes.func.isRequired,
};


export class SpotifyComponent extends React.Component {

  componentDidMount() {
    this.props.onLoadProfile();
  }

  render() {
    const { profile, children } = this.props;

    let content = null;

    if (profile) {
      content = (
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
              <Profile profile={profile}/>
            </Column>
          </Row>
          <Row>
            {children}
          </Row>
        </div>
      );
    }

    return (
      <PageComponent title="Spotify">{content}</PageComponent>
    );
  }

}

SpotifyComponent.propTypes = {
  profile: React.PropTypes.object,
  children: React.PropTypes.element,
  onLoadProfile: React.PropTypes.func.isRequired,
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
  uri: React.PropTypes.string.isRequired,
  view: React.PropTypes.oneOf(['list', 'coverart']).isRequired,
  theme: React.PropTypes.oneOf(['black', 'white']).isRequired,
  height: React.PropTypes.number,
  width: React.PropTypes.number,
};

SpotifyWidget.defaultProps = {
  theme: 'white',
};
