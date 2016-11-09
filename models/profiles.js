var mongoose=require('mongoose');
var profileSchema = mongoose.Schema({
        uname:{
            type:String,
            required:true
        },
        fname:{
            type:String,
            required:true
        },
        lname:{
            type:String,
            required:true
        }
});

module.exports = mongoose.model('Profile', profileSchema);    