import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { createChat } from '../actions/chats';

import { withBaseLayout } from '../layouts/Base';

function chatCreate () {
  const { register, handleSubmit } = useForm()
  const user = useSelector(({auth}) => auth.user)
  const dispatch = useDispatch()
  const history = useHistory()

  const onSubmit = data => {
    dispatch(createChat(data, user.uid))
      .then(_ => history.push('/home'))
  }

  return (
    <div className="centered-view">
      <div className="centered-container">
        <form onSubmit={handleSubmit(onSubmit)} className="centered-container-form">
          <div className="header">Creating chat now!</div>
          <div className="subheader">Chat with people you know</div>
          <div className="form-container">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                ref={register}
                type="text"
                name="name"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                ref={register}
                name="description"
                className="form-control"
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="image">Image</label>
              <input
                ref={register}
                type="text"
                name="image"
                className="form-control"
              />
            </div>
            <button type="submit" className="btn btn-outline-primary">Create</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default withBaseLayout(chatCreate, {canGoBack: true})