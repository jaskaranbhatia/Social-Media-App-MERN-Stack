import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
import {createProfile} from '../../actions/profileActions';
import { withRouter } from 'react-router-dom';
class CreateProfile extends Component {
    constructor(props){
        super(props);
        this.state = {
            displaySocialInputs : false,
            handle : '',
            company : '',
            website : '',
            location : '',
            status : '',
            skills : '',
            githubusername : '',
            bio : '',
            twitter : '',
            facebook : '',
            linkedin : '',
            youtube : '',
            instagram : '',
            errors : {}
        };
      this.onChange = this.onChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps){
      if(nextProps.errors){
        this.setState({errors:nextProps.errors})
      }
    }

    onSubmit(e){
      e.preventDefault();
      const profileData = {
        handle : this.state.handle,
        company : this.state.company,
        website : this.state.website,
        location : this.state.location,
        status : this.state.status,
        skills : this.state.skills,
        githubusername : this.state.githubusername,
        bio : this.state.bio,
        twitter : this.state.twitter,
        facebook : this.state.facebook,
        linkedin : this.state.linkedin,
        youtube : this.state.youtube,
        instagram : this.state.instagram
      }
      this.props.createProfile(profileData,this.props.history);
    }

    onChange(e){
      this.setState({[e.target.name]:e.target.value})
    }

  render() {
    const {displaySocialInputs,errors} = this.state;
    let socialInputs;
    if (displaySocialInputs){
      socialInputs = (
        <div>
          <InputGroup
            placeholder="Twitter Profile Url"
            name = "twitter"
            icon = "fab fa-twitter"
            value ={this.state.twitter}
            onChange={this.onChange}
            error = {errors.twitter}
          />
          <InputGroup
            placeholder="Youtube Profile Url"
            name = "youtube"
            icon = "fab fa-youtube"
            value ={this.state.youtube}
            onChange={this.onChange}
            error = {errors.youtube}
          />
          <InputGroup
            placeholder="Facebook Profile Url"
            name = "facebook"
            icon = "fab fa-facebook"
            value ={this.state.facebook}
            onChange={this.onChange}
            error = {errors.facebook}
          />
          <InputGroup
            placeholder="Instagram Profile Url"
            name = "instagram"
            icon = "fab fa-instagram"
            value ={this.state.instagram}
            onChange={this.onChange}
            error = {errors.instagram}
          />
          <InputGroup
            placeholder="Linkedin Profile Url"
            name = "linkedin"
            icon = "fab fa-linkedin"
            value ={this.state.linkedin}
            onChange={this.onChange}
            error = {errors.linkedin}
          />
        </div>
      )
    }
    //Select options for status
    const options = [
      { label : '* Select Professional Status', value : 0},
      { label : 'Student', value : 'Student'},
      { label : 'Developer', value : 'Developer'},
      { label : 'Teacher', value : 'Teacher'},
      { label : 'Intern', value : 'Intern'},
      { label : 'Manager', value : 'Manager'}
    ];

    return (
      <div className="create-profile">
      <div className="container">
      <div  className="row">
      <div className="col-md-8 m-auto">
        <h1 className="display-4 text-center">Create Your Profile</h1>
        <p>
            Let's get some information to get your profile stand out
        </p>
        <small className="d-block pb-3">* = required fields</small>
        <form onSubmit={this.onSubmit}>
          <TextFieldGroup
            placeholder="* Profile Handle"
            name="handle"
            value={this.state.handle}
            onChange={this.onChange}
            error={errors.handle}
            info = "A unique handle for your profile URL.It can be your full name or compnay name,etc"
          />
          <SelectListGroup
            placeholder="Status"
            name="status"
            value={this.state.status}
            onChange={this.onChange}
            error={errors.status}
            options = {options}
            info = "Give us an idea where you are in your careear"
          />
          <TextFieldGroup
            placeholder="Company Name"
            name="company"
            value={this.state.company}
            onChange={this.onChange}
            error={errors.company}
            info = "Your own company or where you work"
          />
          <TextFieldGroup
            placeholder="Website"
            name="website"
            value={this.state.website}
            onChange={this.onChange}
            error={errors.website}
            info = "Your portfolio website or any other made by you"
          />
          <TextFieldGroup
            placeholder="* Skills"
            name="skills"
            value={this.state.skills}
            onChange={this.onChange}
            error={errors.skills}
            info = "Please use comma seperated value(e.g HTML,CSS,JavaScript)"
          />
          <TextFieldGroup
            placeholder="Github Username"
            name="githubusername"
            value={this.state.githubusername}
            onChange={this.onChange}
            error={errors.githubusername}
            info = "If you want your github reporsitories to display here, add github username"
          />
          <TextAreaFieldGroup
            placeholder="Short Bio"
            name="bio"
            value={this.state.bio}
            onChange={this.onChange}
            error={errors.bio}
            info = "Tell us a little bit about yourself"
          />
          <div className="mb-3">
          <button type="button" onClick={()=>{
              this.setState(prevState => ({
                displaySocialInputs : !prevState.displaySocialInputs
              }))
          }} className="btn btn-info">
          Add Social Network Links
          </button>
          <span className="text-muted ml-4">Optional</span>
          </div>
          {socialInputs}
          <input type="submit" value="Submit" className="btn btn-info btn-block mt-4"></input>
        </form>
        </div>
      </div>
      </div>  
      </div>
    )
  }
}

CreateProfile.propTypes = {
    profile : PropTypes.object.isRequired,
    errors : PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile : state.profile,
    errors : state.errors
});

export default connect(mapStateToProps,{createProfile})(withRouter(CreateProfile));
