import React, { component } from 'react';

import TextField from 'material-ui/TextField';
import { Card, CardText } from 'material-ui/Card';
import { blueGrey300, pink50, green100, orange900, grey900, white } from 'material-ui/styles/colors';

export default function NLPteamBuilder() {
  return (
    <Card>
      <CardText>
        <TextField
          fullWidth={true}
          multiLine={true}
          rowsMax={2}
          underlineFocusStyle={{borderColor:orange900}}
          hintText="I need a team with fast pace and good dribbling" />
      </CardText>
    </Card>
  )
}