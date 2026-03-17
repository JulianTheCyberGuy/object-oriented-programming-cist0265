export default class Thesis {
    constructor({
      statement,
      independentVariable,
      dependentVariable,
      scope,
      filters = {}
    }) {
      this.statement = statement;
      this.independentVariable = independentVariable;
      this.dependentVariable = dependentVariable;
      this.scope = scope;
      this.filters = filters;
    }
  }