# path-paramer

Helper functions for url path paramators

# Install

```
npm i path-paramer
```

# Usage

```ts
import {replace} from 'path-paramer'

const path = "/user/{user_id}/profile/{profile_id}"
const result = replace(path, { user_id: "123", profile_id: "456" }
//  result is /user/123/profile/456
```
