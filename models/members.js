const mongoose = require('mongoose')

const MemberSchema = new mongoose.Schema({

    name: {
        type: String,
        require: true
    },
    memberID: {
        type:String,
        default: Date.now
    }
}, 
{timestamps: true}
)

const MemberModel = new mongoose.model("Member",MemberSchema)

module.exports = MemberModel