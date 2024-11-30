import React, { useContext, useState } from 'react';
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantsContext } from '../context/RestaurantsContext';


const AddRestaurant = () => {
    const {addRestaurants} = useContext(RestaurantsContext);
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [priceRange, setPriceRange] = useState("Price Range");

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await RestaurantFinder.post("/", {
            name,
            location,
            price_range: priceRange
        });
        console.log(response)
        addRestaurants(response.data.data.restaurant);
    }
  return (
    <div className='mb-4'>
        <form action=''>
            <div className="form-row">
                <div className="col">
                    <input type="text" onChange = {e => setName(e.target.value)} value={name} className='form-control' placeholder='name'/>
                </div>
                <div className="col">
                    <input type='text' onChange={e => setLocation(e.target.value)} value={location} className='form-control' placeholder='location'/>
                </div>
                <div className="col">
                    <select value = {priceRange} onChange={(e) => setPriceRange(e.target.value)} className='cutom-select my-1 mr-sm-2'>
                        <option disabled>Price Range</option>
                        <option value="1">$</option>
                        <option value="2">$$</option>
                        <option value="3">$$$</option>
                        <option value="4">$$$$</option>
                        <option value="5">$$$$$</option>
                    </select>
                </div>
                <button onClick={handleSubmit} type = "submit" className='btn btn-primary'>Add</button>
            </div>
        </form>
    </div>
  )
}

export default AddRestaurant