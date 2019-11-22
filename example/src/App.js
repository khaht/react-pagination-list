import React from 'react'

import Pagination from 'k-pagination-list'

const App = () => {
  return (
    <div>
        <Pagination 
          data={[
            {
              id: 1,
              title: "abc"
            },
            {
              id: 2,
              title: "def"
            },
            {
              id: 3,
              title: "fdsfsd"
            },
            {
              id: 1,
              title: "abc"
            },
            {
              id: 2,
              title: "def"
            },
            {
              id: 3,
              title: "fdsfsd"
            }
          ]}
          pageSize={2}
          renderItem={(item, key) => <p key={key}>{item.title}</p>}
        />
      </div>
  )
}
export default App;
