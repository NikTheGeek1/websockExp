
module.exports = function(_, usersInGroup){

    return {
      SetRouting: function(router){
        router.get('/group/:name', this.groupPage); // the :name allows us to take is after the /    you can find it in controllers/users.js: successRedirect
      },
      groupPage: function(req, res){
        const name = req.params.name;
        //usersInGroup.users.push(req.user.username)
        res.render('group', {groupName:name, usernames: 'what', username: req.user.username});
      }
         }
}
