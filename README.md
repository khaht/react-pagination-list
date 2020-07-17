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

```js
const initialData = [
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
```

#### Simple usage

```jsx
import React, { Component } from 'react';
import PaginationList from 'react-pagination-list';

export const MyComponent = () => {
  const [data, setData] = React.useState(initialData)
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

#### Customize Pagination Based on the current page

```jsx
import React from 'react'
import Pagination from 'k-pagination-list'

const App = () => {
  const [data, setData] = React.useState(initialData)
  const shouldFetchMore = React.useRef(true)

  return (
    <div>
      <Pagination
        data={data}
        pageSize={2}
        renderItem={(item, key) => <p key={key}>{item.title}</p>}
        onPageChange={async (param) => {
          if (param.page === param.totalPage && shouldFetchMore.current) {
            const moreNames = [{
              id: 11,
              title: "Luiz Fellype"
            },
            {
              id: 12,
              title: "Carlos"
            }]

            setData(currentData => [...currentData, ...moreNames])
            shouldFetchMore.current = false
          }
        }}
      />
    </div>
  )
}
export default App;
```

### How to run this project
```bash
  git clone URL_OF_THIS_PROJECT projectCustomName
  
  cd projectCustomName
  
  npm run install
  
  npm run dev
```
