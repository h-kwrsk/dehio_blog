// src/components/category-list.js
import React from "react"

// Components
import { Link, StaticQuery, graphql } from "gatsby"

const CategoryList = () => (
  <StaticQuery
    query={graphql`
      query {
        allMarkdownRemark(limit: 2000) {
          group(field: frontmatter___category) {
            fieldValue
            totalCount
          }
        }
      }
    `}
    render={data => (
      <nav>
        <h5>カテゴリ一覧</h5>
        <ul>
          {data.allMarkdownRemark.group.map(category => (
            <li key={category.fieldValue}>
              <Link to={`/category/${category.fieldValue.toLowerCase()}/`}>
                {category.fieldValue} ({category.totalCount})
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    )}
  />
)

export default CategoryList
