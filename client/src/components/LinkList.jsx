import React from 'react'
import { useNavigate } from 'react-router-dom';

function LinkList() {
    let navigate = useNavigate();

    const handleLinkSelect = (id) => {
        navigate(`/${id}`)
    }

  return (
    <div className='list-group'>
        <table className='table table-hover table-dark'>
            <thead>
                <tr className='bg-primary'>
                    <th scope='col'>Name</th>
                    <th scope='col'>Description</th>
                </tr>
            </thead>
            <tbody>
                <tr onClick={() => handleLinkSelect('yelp')} key = 'yelp'>
                    <td>Yelp</td>
                    <td>First full stack app I ever made based on a YouTube tutorial at https://www.youtube.com/watch?v=7qAXvOFhlDc&t=0s&ab_channel=SanjeevThiyagarajan</td>
                </tr>
                <tr onClick={() => handleLinkSelect('games')} key = 'games'>
                    <td>Games</td>
                    <td>A random assortment of games I made for fun</td>
                </tr>
            </tbody>
        </table>
    </div>
  )
}

export default LinkList