# react-pagination-list
React component show the list with paging support

### Install

Through npm
`npm install react-pagination-list --save`

### Required

- node >= 8.

- npm >= 6.

- react, react-dom >= 16.8.0.

### Usage
ES6
```js
import PaginationList from 'react-pagination-list';
```

ES5
```js
const PaginationList = require('react-pagination-list');
```

Typescript
```js
import * as PaginationList from 'react-pagination-list';
```


### Props

#### data

data is a plain array

| TYPE | REQUIRED | DEFAULT |
|-------------|-------------|-------|
| array| yes | [] |

#### pageSize

Config of page size, hide it by setting it to **undefined**

```jsx
  pageSize={number} 
```

| TYPE | REQUIRED | DEFAULT |
|-------------|-------------|-------|
| number | no | undefined |

#### renderItem

Takes an item from **data** and renders it into the list.

```jsx
  renderItem(item, key);
```

| TYPE | REQUIRED | DEFAULT |
|-------------|-------------|-------|
| Function | yes | undefined |

- item (Object): The item from **data** being rendered.
- key (number): The index corresponding to this item in the **data** array.

### Examples
```jsx
import React, { Component } from 'react';
import PaginationList from 'react-pagination-list';

export default class MyComponent extends Component {
  state = {
    data: [
      {
        id: 1,
        name: "Johnson"
      },
      {
        id: 2,
        name: "David"
      },
      {
        id: 3,
        name: "Alice"
      }
    ]
  }
  render(){
    return (
      <PaginationList 
        data={this.state.data}
        pageSize={2}
        renderItem={(item, key) => (
          <p key={key}>{item.name}</p>
        )}
      >
    )
  }
}
```
