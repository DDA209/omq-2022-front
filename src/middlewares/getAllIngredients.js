import defaultMiddlewares from '../middlewares/common/defaultMiddlewares';
const { getAllDocuments } = defaultMiddlewares;

export default getAllIngredients = () => {
	return getAllDocuments('/ingredients');
};
