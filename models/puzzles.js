const keystone = require('keystone')

const Types = keystone.Field.Types

const Puzzle = new keystone.List('Puzzle')

Puzzle.add({
  name: { type: Types.Name, required: true, index: true },
})

Puzzle.register()
