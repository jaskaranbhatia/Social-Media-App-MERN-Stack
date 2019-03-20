import React, { Component } from 'react'
import isEmpty from '../../validation/is-empty';

class ProfileAbout extends Component {
  render() {
    const { profile } = this.props;
    //Get firstName
    const firstName = profile.user.name.trim().split(' ')[0];
    const skills = profile.skills.map((skill,index) => (
      <div key={index} className="p-3">
        <i className="fa fa-check">{skill}</i>
      </div>
    ));
    return (
      <div>
      <div class="row">
            <div class="col-md-12">
              <div class="card card-body bg-light mb-3">
                <h3 class="text-center text-info">{firstName} 's Bio</h3>
                <p class="lead">{isEmpty(profile.bio) ? (<span>Doesn't have a bio</span>) : (<span>{profile.bio}</span>)}
                </p>
                <hr />
                <h3 class="text-center text-info">Skill Set</h3>
                <div class="row">
                  {skills}                
                </div>
              </div>
            </div>
          </div>
      </div>
    )
  }
}


export default ProfileAbout;