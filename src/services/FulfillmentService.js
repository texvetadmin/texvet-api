import logger from '../utils/logger';
import staticResources from '../models/staticResources';

class EmailService {
  getStaticResourcesBySlug = async req => {
    try {
      const {
        params: { slug },
      } = req;

      return staticResources.findOne({ slug });
    } catch (err) {
      logger.error(`[${this.constructor.name}.getStaticResourcesBySlug] Error: ${err}`);
      throw err;
    }
  };
}

export default new EmailService();
