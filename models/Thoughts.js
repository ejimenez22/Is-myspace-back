const { Schema, model, Types } = require('mongoose')
const dateFormat = require('../utils/dateFormat')

const ReactionSchema = new Schema (
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        }
    }
)

const ThoughtSchema = new Schema (
   { 
    thoughtText: {
        type: String,
        required: true,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
    },
    username: {
        type: String,
        required: true
    },
    reactions: [ReactionSchema]
  },
  {
      toJSON: {
          getters: true
      },
      id: false
  }
)

ThoughtSchema.virtual('reaction').get(function() {
    return this.reactions.reduce((total, reactions) => total + reactions.length + 1, 0)
})

const Thoughts = model('Thoughts', ThoughtSchema)

module.exports = Thoughts