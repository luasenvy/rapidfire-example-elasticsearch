const {
  Interfaces: { Service },
} = require('@luasenvy/rapidfire')

const ElasticsearchServiceLoader = require('../loaders/ElasticsearchServiceLoader')

class ElasticsearchService extends Service {
  // loader
  static loader = ElasticsearchServiceLoader

  constructor() {
    super()

    this._elastic = null
  }

  get elastic() {
    return this._elastic
  }

  set elastic(elastic) {
    this._elastic = elastic
  }
}

module.exports = ElasticsearchService
