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

If you want to use `path-paramer` for `:`-styled path(ex. `/user/:user_id/profile/profile_id`), you can achieve it by `npm i path-styler` and write code like this.

```ts
import {styler} from 'path-styler'
import {replace} from 'path-paramer'

const convert = newStyler({ var: ':' , case: 'snake' })
const result = convert('/user/{user_id}/contents/{contents_id}')

const path = "/user/:user_id/profile/:profile_id"

const bracketPath = convert(path)
// bracketPath = "/user/{user_id}/profile/{profile_id}"

const result = replace(bracketPath, { user_id: "123", profile_id: "456" }
//  result is /user/123/profile/456
```
