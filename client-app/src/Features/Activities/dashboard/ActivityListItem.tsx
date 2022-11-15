import React, { SyntheticEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Item, Label } from 'semantic-ui-react'
import { Activity } from '../../../App/models/interfaces/activity'
import { useStore } from '../../../App/stores/store'

interface Props {
  activity: Activity
}

function AcitivityListItem({ activity }: Props) {
  const { activityStore } = useStore()
  const { deleteActivity, loading } = activityStore
  const [target, setTarget] = useState('')

  const handleDeleteActivity = (
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    event.preventDefault()
    setTarget(event.currentTarget.name)
    deleteActivity(activity.id)
  }

  return (
    <Item key={activity.id}>
      <Item.Content>
        <Item.Header as='a'> {activity.title}</Item.Header>
        <Item.Meta>{activity.date.toString()}</Item.Meta>
        <Item.Description>
          <div>{activity.description}</div>
          <div>
            <address>
              {activity.city}, {activity.venue}
            </address>
          </div>
        </Item.Description>
        <Item.Extra>
          <Button
            as={Link}
            to={`${activity.id}`}
            floated='right'
            content='View'
            color='blue'
          />
          <Button
            name={activity.id}
            floated='right'
            content='Delete'
            color='red'
            loading={loading && target === activity.id}
            onClick={(e) => handleDeleteActivity(e, activity.id)}
          />
          <Label basic content={activity.category} />
        </Item.Extra>
      </Item.Content>
    </Item>
  )
}

export default AcitivityListItem
