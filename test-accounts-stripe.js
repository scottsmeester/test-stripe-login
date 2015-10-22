if (Meteor.isClient) {
  // counter starts at 0

  Template.hello.helpers({

  });

  Template.hello.events({
    'click button': function () {
      
      Meteor.loginWithStripe({
        loginStyle: 'popup'
        //loginStyle: 'redirect'  you can use redirect for mobile web app
      }, function () {
        console.log('in call back', arguments);
      });
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    Accounts.loginServiceConfiguration.remove({
      service: 'stripe'
    });

    Accounts.loginServiceConfiguration.insert({
      service: 'stripe',
      clientId: '3MVG9fMtCkV6eLhce1fuNglis5pcdjkC9nqVFwg8_ra7Yx4Fvmq457iW7g_b0TOmxHlj9.zvrMq9CkeYbEUeV',
      secret: '4166713217352858701'
    });
  });
}
