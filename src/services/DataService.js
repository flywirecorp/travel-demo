import _ from'lodash';
import moment from 'moment';

const hotels = [
    { id: 1, type:'Hotel', location: 'France', title: 'Hotel Araba', description: 'Basic lodgings', price: 150, units:"night", imageUrl: "https://images.interhome.com/FR7365.630.1/partner-medium/101809-1-559889-1235389150", rating: 1 },
    { id: 2, type:'Hotel', location: 'France', title: 'Mountain Lodge', description: 'Mountain life', price: 175, units:"night", imageUrl: "https://s-ec.bstatic.com/images/hotel/max1024x768/845/84575908.jpg", rating: 2 },
    { id: 4, type:'Hotel', location: 'USA', title: 'Tatch Lodge', description: 'Country living', price: 185, units:"night", imageUrl: "https://anewhotels.com/wp-content/uploads/2017/06/Lodge-1.jpg", rating: 4 },
    { id: 5, type:'Hotel', location: 'France', title: 'Peak Place', description: 'Alpine class', price: 210, units:"night", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEfKQBCoKqPqLtpDspWHDtH4RqODztvkOTdzjN2xlQ6l-6vQgn1A", rating: 5 },
    { id: 6, type:'Hotel', location: 'Switzerland', title: 'Milka Place', description: 'Quiet retreat', price: 179, units:"night", imageUrl: "http://www.visitporthardy.com/wp-content/uploads/2016/07/Great-Bear-Nature-Lodge-for-website-only-1-360x202.jpg", rating: 5 },
    { id: 7, type:'Hotel', location: 'France', title: 'Mountain Hotel', description: 'Dining beauty', price: 235, units:"night", imageUrl: "https://www.butterfield.com/blog/wp-content/uploads/2016/09/Best-Luxury-Safari-Lodges-FB2.jpg", rating: 5 },

    { id: 8, type:'Extra', location: 'France', title: 'Skis', description: 'The only way down the mountain', price: 25, units:"day", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNut5bZ8GtenccXu4x2Aev9tEl2DfAtbGmN2RmSTlRmoKqHj8a" },
    { id: 9, type:'Extra', location: 'France', title: 'Snowboard', description: 'The other way down the mountain', price: 20, units:"day", imageUrl: "https://cdn11.bigcommerce.com/s-6p8lmnk/images/stencil/original/products/206/21350/Naked_Snow_-_clipped_-_shadow4__91761.1518121853.jpg?c=2" }
];

export default {
    search: ({ s, dep, dur, num }) => {
        const results = _
            .chain(hotels)
            .filter(({ location, title, description}) => {
                return _.every(s.split(' '), token => {
                    token = token.toLowerCase();
                    return (location.toLowerCase().indexOf(token) >= 0 || title.toLowerCase().indexOf(token) >= 0 || description.toLowerCase().indexOf(token) >= 0);
                })
            })
            .map(function(item) {
                item.availableFrom = moment(dep).format("ddd D MMM YYYY");
                item.availableTo = moment(dep).add(parseInt(dur), "days").format("ddd D MMM YYYY");
                item.availableQuantity = parseInt(num);

                return item;
            })
            .orderBy(['rating'], ['desc'])
            .value();

        return results;
    },
}