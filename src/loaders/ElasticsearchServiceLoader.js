const {
  Interfaces: { ServiceLoader },
} = require('@luasenvy/rapidfire')

const { Client: Elasticsearch } = require('@elastic/elasticsearch')

class ElasticsearchServiceLoader extends ServiceLoader {
  constructor() {
    super()
  }

  async load({ dbs, express, Service: ElasticsearchService }) {
    const elastic = dbs.find(db => db instanceof Elasticsearch)

    if (ElasticsearchService.index) {
      try {
        await elastic.indices.get({ index: ElasticsearchService.index })
      } catch (err) {
        if (err.body.error.type === 'index_not_found_exception')
          await elastic.indices.create({ index: ElasticsearchService.index, wait_for_active_shards: 'all' })
      }
    }

    const service = new ElasticsearchService({ router: express.Router() })
    service.db = elastic
    return service
  }
}

module.exports = ElasticsearchServiceLoader
