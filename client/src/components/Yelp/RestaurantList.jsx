import React, {useContext, useEffect} from 'react'
import RestaurantFinder from '../../apis/RestaurantFinder';
import { Context } from '../../context/Context';
import { useNavigate } from 'react-router-dom';
import StarRating from './StarRating';
import './Yelp.css';

function RestaurantList() {
    const {restaurants, setRestaurants} = useContext(Context);
    let navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await RestaurantFinder.get("/");
                console.log(response)
                setRestaurants(response.data.data.restaurants);
            } catch (err){
                console.log(err);
            }
        }
        fetchData();
    }, [setRestaurants]);

    const handleDelete = async (e, id) => {
        e.stopPropagation()
        try {
            await RestaurantFinder.delete(`/${id}`)
            setRestaurants(restaurants.filter(restaurant => {
                return restaurant.id !== id
            }))
        }catch(err){
            console.log(err)
        }
    }

    const handleUpdate = (e, id) => {
        e.stopPropagation()
        navigate(`/yelp/restaurants/${id}/update`)
    }

    const handleRestaurantSelect = (id) => {
        navigate(`/yelp/restaurants/${id}`)
    }

    const renderRating = (restaurant) => {
        if(!restaurant.count){
            return <span className='text-warning'>0 reviews</span>
        }
        return(
            <>
                <StarRating rating={restaurant.average_rating}/>
                <span className='text-warning ml-1'>({restaurant.count})</span>
            </>
        )
    }

  return (
    <div className='list-group'>
        <table className='table table-hover table-dark'>
            <thead>
                <tr className='bg-primary'>
                    <th scope='col'>Restaurant</th>
                    <th scope='col'>Location</th>
                    <th scope='col'>Price Range</th>
                    <th scope='col'>Ratings</th>
                    <th scope='col'>Edit</th>
                    <th scope='col'>Delete</th>
                </tr>
            </thead>
            <tbody>
                {restaurants && restaurants.map(restaurant => {
                    return(
                    <tr onClick={() => handleRestaurantSelect(restaurant.id)} key = {restaurant.id}>
                        <td>{restaurant.name}</td>
                        <td>{restaurant.location}</td>
                        <td>{"$".repeat(restaurant.price_range)}</td>
                        <td>{renderRating(restaurant)}</td>
                        <td><button onClick={(e) => handleUpdate(e, restaurant.id)} className='btn btn-warning'>Update</button></td>
                        <td><button onClick={(e) => handleDelete(e, restaurant.id)} className='btn btn-danger'>Delete</button></td>
                    </tr>
                    )
                })}
                {/* <tr>
                    <td>mcdonalds</td>
                    <td>New York</td>
                    <td>$$</td>
                    <td>Rating</td>
                    <td><button className='btn btn-warning'>Update</button></td>
                    <td><button className='btn btn-danger'>Delete</button></td>
                </tr>
                <tr>
                    <td>mcdonalds</td>
                    <td>New York</td>
                    <td>$$</td>
                    <td>Rating</td>
                    <td><button className='btn btn-warning'>Update</button></td>
                    <td><button className='btn btn-danger'>Delete</button></td>
                </tr> */}
            </tbody>
        </table>
    </div>
  )
}

export default RestaurantList