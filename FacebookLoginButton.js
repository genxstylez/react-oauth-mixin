
import React from 'react';
import UserService from '../services/UserService'
import UserActions from '../actions/UserActions'

export default React.createClass({
    checkLoginState() {
        FB.getLoginStatus((response) => {
            this.statusChangeCallback(response);
        }.bind(this))
    },

    handleClick() {
        FB.login((response) => {
            this.checkLoginState();
        }, {scope: 'public_profile,email'});
    },

    statusChangeCallback(response) {
        if (response.status === 'connected') {
            var access_token = response.authResponse.accessToken
            UserService.login_with_social({
                access_token: access_token,
                backend: 'facebook'
            })
            .then((res) => {
                UserActions.login(res.body.token)
            })
            .catch((err) => {
                if(err.body.error_code == 'social_no_user') {
                    // prompt for a username and password
                    this.props.new_social(access_token)
                }
            })
        } else if (response.status === 'not_authorized') {
            alert('You need to authorize to sign in with facebook');
        } else {
            console.log('not logged into facebook');
        }
    },

    render() {
        return (
            <button type="button" {...this.props} onClick={this.handleClick}>
                {this.props.children}
            </button>
        )
    }
});
