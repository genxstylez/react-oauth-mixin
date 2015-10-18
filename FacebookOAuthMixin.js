export default {
    componentDidMount() {
        window.fbAsyncInit = function() {
            FB.init({
                appId      : {your-app-id},
                xfbml      : true,
                version    : 'v2.4'
            });
            FB.getLoginStatus(function(response) {
                this.statusChangeCallback(response);
            }.bind(this))
        }.bind(this)
    },

    componentWillMount() {
        (function(d, s, id){
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {return;}
            js = d.createElement(s); js.id = id;
            js.src = '//connect.facebook.net/en_US/sdk.js';
            fjs.parentNode.insertBefore(js, fjs);
       }(document, 'script', 'facebook-jssdk'));
    },

    statusChangeCallback(response) {
        if (response.status === 'connected') {
            var access_token = response.authResponse.accessToken;
            console.log(access_token);
        } else if (response.status === 'not_authorized') {
            console.log('not not_authorized');
        } else {
            console.log('not logged into facebook');
        }
    },
    checkLoginState() {
        FB.getLoginStatus((response) => {
            this.statusChangeCallback(response);
        }.bind(this))
    },

    handleClickFb() {
        FB.login((response) => {
            this.statusChangeCallback(response);
        });
    },

}
