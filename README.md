# Vuemaster

This is am implementation using VueJS of the once very popular thinking game called Master Mind.

This implementation requires a bit unconventional programming because the way the Cells have been rendered does not lend
itself to be rerendered automatically on data change.

This implementation of the game includes:
- Widget composition
- Forced rerendering on the nextTick
- parent/child communication using events ($on, $emit)

To run this: 
- Clone this repository
- Then run `npm install` 
- run `npm run dev`
- In a browser `http://localhost:8080` to start the game

Enjoy.

Jay Kelkar
