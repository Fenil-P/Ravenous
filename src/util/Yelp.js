const apiKey = '';
const Yelp = {
    /**
     * Search the Yelp "Business Search" endpoint
     * - API returns basic business information - Up to 1000 businesses
     * @param {string} term term/category to use during search 
     * @param {string} location Area to be used when searching for businesses
     * @param {string} sortBy best_match, rating, review_count
     * @returns Array for business objects
     */
    search(term, location, sortBy) {
        return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`,
            {headers: {Authorization:`Bearer ${apiKey}`}}).then((response)=>response.json(),(error)=>{console.log(error)}).then((jsonResponse)=>{
                if (jsonResponse.businesses) {
                    return jsonResponse.businesses.map(business => {
                        return {
                            id: business.id,
                            name: business.name,
                            imageSrc: business.image_url,
                            location: {
                                address: business.location.address1,
                                city: business.location.city,
                                state: business.location.state,
                                zipCode: business.location.zip_code
                            },
                            category: business.categories.title,
                            rating: business.rating,
                            reviewCount: business.review_count,
                            url: business.url
                        };
                    })
                }
            });
    }
};
export default Yelp;