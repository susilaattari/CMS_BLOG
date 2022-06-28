import React from 'react'
import {Link} from 'react-router-dom'

export const ButtonComponent = (props) => {
  return (
    <button type="button" className="btn btn-success">
      <Link className='text-light text-decoration-none fw-3' to={`/${props.link}`}>{props.label}</Link>
    </button>
  )
}
export default ButtonComponent;