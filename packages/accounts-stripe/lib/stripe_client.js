StripeOAuth = {};

StripeOAuth.requestCredential = function (options, credentialRequestCompleteCallback) {

    if (!credentialRequestCompleteCallback && typeof options === "function") {
        credentialRequestCompleteCallback = options;
        options = {};
    }

    var config = ServiceConfiguration.configurations.findOne({ service: "stripe" });
    if (!config) {
        credentialRequestCompleteCallback && credentialRequestCompleteCallback(new ServiceConfiguration.ConfigError("Service not configured"));
        return;
    }

    var credentialToken = Random.id();
    var mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
    var display = mobile ? "touch" : "popup";
    var scope = "";

    if (options && options.requestPermissions) {
        scope = options.requestPermissions.join(",");
    }

    var loginUrl =
        'https://login.salesforce.com/services/oauth2/authorize' +
            '?response_type=code' +
            '&client_id=' + config.appId +
            '&redirect_uri=' + Meteor.absoluteUrl('_oauth/stripe?close') +
            '&state=' + credentialToken;

    var dimensions = { width: 650, height: 560 };
    Oauth.initiateLogin(credentialToken, loginUrl, credentialRequestCompleteCallback, dimensions);

};

// https://login.salesforce.com/services/oauth2/authorize?response_type=code
// &client_id=3MVG9lKcPoNINVBIPJjdw1J9LLM82HnFVVX19KY1uA5mu0QqEWhqKpoW3svG3X
// HrXDiCQjK1mdgAvhCscA9GE&redirect_uri=https%3A%2F%2Fwww.mysite.com%2F
// code_callback.jsp&state=mystate