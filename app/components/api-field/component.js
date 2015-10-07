import Ember from 'ember';

export default Ember.Component.extend({
  resource:     null, // The object that is being edited
  resourceType: null, // The schema type the object is
  field:        null, // The field on resource that this input is for
  schemas:      null, // All the schemas for all the types
  typeDocs:     null, // Type docs for all the types

  tagName: 'div',
  classNames: ['form-group','row','api-field'],

  value:        null,

  fieldDef: function() {
    var fieldName = this.get('field');
    var type = this.get('resourceType').toLowerCase();
    var schema = this.get('schemas').filterBy('id', type)[0];
    if ( !schema )
    {
      return;
    }

    var orig = schema.resourceFields[fieldName];
    if ( !orig )
    {
      return;
    }

    var out = JSON.parse(JSON.stringify(orig));
    out.name = fieldName;

    var docs = this.get('typeDocs').filterBy('id', type)[0];
    if ( docs )
    {
      orig = docs.resourceFields[fieldName];
      if ( orig )
      {
        out.description = orig.description;
        out.placeholder = orig.placeholder;
      }
    }

    return out;
  }.property('field','resourceType','schemas.[]'),

  valueChanged: function() {
    this.get('resource').set(this.get('field'), this.get('value'));
  }.observes('value'),
});
