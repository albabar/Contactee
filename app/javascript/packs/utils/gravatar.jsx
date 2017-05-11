import React from 'react';
import Avatar from 'material-ui/Avatar';
import crypto from 'crypto';

function gravatar(email) {
  const hash = crypto.createHash('md5').update(email).digest("hex");
  const url = `https://www.gravatar.com/avatar/${hash}`;

  return <Avatar src={url}/>
}
export default gravatar;
