import React from 'react'

import Pagination from 'k-pagination-list'
const initialData = [
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
]
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
            const newDataFetched = [{
              id: 11,
              title: "1 - New DataFetched"
            },
            {
              id: 12,
              title: "2 - New Data Fetched"
            }]

            setData(currentData => [...currentData, ...newDataFetched])
            shouldFetchMore.current = false
          }
        }}
      />
    </div>
  )
}
export default App;
