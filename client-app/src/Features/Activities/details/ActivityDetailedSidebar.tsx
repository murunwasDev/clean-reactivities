import { Images } from 'App/common/utils/images';
import { Activity } from 'App/models/interfaces/activity';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { Image, Item, Label, List, Segment } from 'semantic-ui-react';

interface Props {
  activity: Activity;
}

export default observer(function ActivityDetailedSidebar(props: Props) {
  const { attendees, host } = props.activity;
  if (!attendees) return null;
  return (
    <>
      <Segment
        textAlign='center'
        style={{ border: 'none' }}
        attached='top'
        secondary
        inverted
        color='teal'
      >
        {attendees.length} {attendees.length === 1 ? 'Person' : 'People'} going
      </Segment>
      <Segment attached>
        <List relaxed divided>
          {attendees.map((attendee) => (
            <Item style={{ position: 'relative' }} key={attendee.userName}>
              {attendee.userName === host?.userName && (
                <Label
                  style={{ position: 'absolute' }}
                  color='orange'
                  ribbon='right'
                >
                  Host
                </Label>
              )}
              <Image size='tiny' src={attendee.image || Images.baseUserImage} />
              <Item.Content verticalAlign='middle'>
                <Item.Header as='h3'>
                  <Link to={`/profiles/${attendee.userName}`}>
                    {attendee.displayName}
                  </Link>
                </Item.Header>
                <Item.Extra style={{ color: 'orange' }}>Following</Item.Extra>
              </Item.Content>
            </Item>
          ))}
        </List>
      </Segment>
    </>
  );
});
