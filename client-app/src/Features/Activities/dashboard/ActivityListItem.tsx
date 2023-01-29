import { DateFormatter } from 'App/common/utils/date-formatter';
import { Images } from 'App/common/utils/images';
import { Activity } from 'App/models/interfaces/activity';
import ActivityListItemAttendee from 'Features/Activities/dashboard/ActivityListItemAttendee';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { Button, Icon, Item, Label, Segment } from 'semantic-ui-react';

interface Props {
  activity: Activity;
}

function AcitivityListItem({ activity }: Props) {
  return (
    <Segment.Group>
      <Segment>
        {activity.isCancelled && (
          <Label
            attached='top'
            color='red'
            style={{ textAlign: 'center' }}
            content='Cancelled'
          />
        )}
        <Item.Group>
          <Item>
            <Item.Image
              style={{ marginBottom: 5 }}
              size='tiny'
              circular
              src={Images.baseUserImage}
            />
            <Item.Content>
              <Item.Header as={Link} to={`${activity.id}`}>
                {activity.title}
              </Item.Header>
              <Item.Description>
                Hosted by {activity.host?.displayName}
              </Item.Description>
              {activity.isHost && (
                <Item.Description>
                  <Label basic color='orange'>
                    You are hosting this activity
                  </Label>
                </Item.Description>
              )}

              {activity.isGoing && !activity.isHost && (
                <Item.Description>
                  <Label basic color='green'>
                    You are going to this activity
                  </Label>
                </Item.Description>
              )}
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          <Icon name='clock' /> {DateFormatter.formatDateTime(activity.date!)}
          <Icon name='marker' /> {activity.venue}
        </span>
      </Segment>
      <Segment secondary>
        <ActivityListItemAttendee attendees={activity.attendees!} />
      </Segment>
      <Segment clearing>
        <span>{activity.description}</span>
        <Button
          as={Link}
          to={`${activity.id}`}
          color='teal'
          floated='right'
          content='View'
        />
      </Segment>
    </Segment.Group>
  );
}

export default observer(AcitivityListItem);
