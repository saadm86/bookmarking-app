import React, { useEffect, useState } from "react"
import { useQuery, useMutation } from "@apollo/client"
import gql from "graphql-tag"
import './styles.css'
import Card from '../components/Card'

const GET_DATA = gql`
  {
    bookmarks {
      title
      url
    }
  }
`
const ADD_BOOKMARK = gql`
    mutation addBookmark($title: String!, $url: String!){
        addBookmark(title: $title, url: $url){
            id
        }
    }
`

const IndexPage = () => {
  let titleField
  let urlField
  const [addBookmark] = useMutation(ADD_BOOKMARK)
  const { data, loading, error } = useQuery(GET_DATA)
  if (loading) return <h1>{loading}</h1>
  if (error) return <h1>{error}</h1>

  const handleSubmit = () => {
    addBookmark({
        variables: {
            title: titleField.value,
            url: urlField.value
        },
        refetchQueries: [{ query: GET_DATA }]
    })
}
  return (
    <div className="container">
      <h2>Add New Bookmark</h2>
      <label>
        Bookmark Title <br />
        <input type="text" ref={node => titleField = node} />
      </label>
      <br />
      <label>
        Bookmark URL <br />
        <input type="text" ref={node => (urlField = node)} />
      </label>

      <br />
      <br />
      <button onClick={handleSubmit}>Add Bookmark</button>
    

    <h2>My Bookmark List</h2>
    {/* {JSON.stringify(data.bookmarks)} */}

    <div className="card-container">
        {data.bookmarks.map((bm) => <Card url={bm.url} title={bm.title} />)}
    </div>

    </div>




  )
}

export default IndexPage
