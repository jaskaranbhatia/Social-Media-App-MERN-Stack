import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import { deletePost } from '../../actions/postActions';

class PostItem extends Component {
    onDeleteClick(id) {
        this.props.deletePost(id);
    }
  render() {
      const {post,auth} = this.props;
    return (
        <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <a href="profile.html">
              <img className="rounded-circle d-none d-md-block" src={post.avatar}
                alt="" />
            </a>
            <br />
            <p className="text-center">{post.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{post.text}</p>
            {post.user === auth.user.id ? (
                <button type="button" className="btn btn-danger mr-1" onClick={this.onDeleteClick.bind(this,post._id)}>
                <span className="mr-2">Delete Message</span><i className="fas fa-times" />
              </button>
            ) : (
                null       
            )}
          </div>
        </div>
      </div>
    )
  }
}

PostItem.propTypes = {
    post : PropTypes.object.isRequired,
    auth : PropTypes.object.isRequired,
    deletePost : PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth : state.auth
});

export default connect(mapStateToProps,{deletePost})(PostItem);