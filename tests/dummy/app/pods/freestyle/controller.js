import Ember from 'ember';
import FreestyleController from 'ember-freestyle/controllers/freestyle';

const { inject } = Ember;

export default FreestyleController.extend({
  emberFreestyle: inject.service(),

  /* BEGIN-FREESTYLE-USAGE fp:notes
### A few notes regarding freestyle-palette

- Accepts a colorPalette POJO like the one found in the freestyle.js blueprint controller
- Looks very nice

And another thing...

###### Markdown note demonstrating prettified code

```
import Ember from 'ember';

export default Ember.Component.extend({
  // ...
  colorPalette: {
    'primary': {
      'name': 'cyan',
      'base': '#00bcd4'
    },
    'accent': {
      'name': 'amber',
      'base': '#ffc107'
    }
  }
  // ...
});
```
  END-FREESTYLE-USAGE */

  colorPalette: {
    'primary': {
      'name': 'zesty-green',
      'base': '#becc29'
    },
    'accent': {
      'name': 'zesty-black',
      'base': '#393d3d'
    },
    'secondary': {
      'name': 'zesty-gray',
      'base': '#8c8e90'
    },
    'foreground': {
      'name': 'zesty-fog',
      'base': '#efefef'
    },
    'background': {
      'name': 'white',
      'base': '#ffffff'
    }
  }
});
