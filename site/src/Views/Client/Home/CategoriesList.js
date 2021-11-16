import { useQuery, gql } from '@apollo/client';

// Must be rendered inside of an ApolloProvider
const CategoriesList = () => {
  const GET_CATEGORIES = gql`
    query {
      categories {
        _id
        description
        image
        name
      }
    }
  `;
  const { loading, error, data } = useQuery(GET_CATEGORIES);
  if (loading) {
    console.log('still loading');
  }
  if (error) {
    console.log('err------->', error);
  }
  return data ? <h3>{data.categories[0].name}</h3> : 'no data';
};

export default CategoriesList;
