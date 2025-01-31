import { Images } from 'App/common/utils/images';
import { UserProfile } from 'App/models/interfaces/profile';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { Card, Icon, Image } from 'semantic-ui-react';

interface Props {
  profile: UserProfile;
}
function UserProfileCard(props: Props) {
  const { profile } = props;
  return (
    <Card as={Link} to={`/profiles/${profile.userName}`}>
      <Image src={profile.image || Images.baseUserImage} />
      <Card.Content>
        <Card.Header>{profile.displayName}</Card.Header>
        <Card.Description>{profile.bio}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Icon name='user' />
        20 followers
      </Card.Content>
    </Card>
  );
}

export default observer(UserProfileCard);
