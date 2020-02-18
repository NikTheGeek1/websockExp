'use strict'
// in here we'll have some functions that will pertain
// to the users. Like for signing up, retrieving and adding
// data to the database etc

// we'll also set up the routes here like the post routes, the get routes
// and probably more

// this will make the function available to other files
module.exports = function(_, passport, userValidation){

    return {
      SetRouting: function(router){
        router.get('/signup', this.getSignUp);  // the get method requests a representation of the specified resource. here: '/'

        router.post('/signup', userValidation.UserNameValidation, this.postSignUp)
      },

      getSignUp:function(req, res){
        //console.log(req.flash('error')) // this shouldn't be an empty list, check this when u can
        return res.render('signup', {hasErrors: req.flash('error').length > 0}) // renders a file from the views folder along side with an object
      },

      postSignUp: passport.authenticate('local.signup', {
        successRedirect: '/group'+'/hello',
        failureRedirect: '/signup',
        failureFlash: true
      }),

    }

}
