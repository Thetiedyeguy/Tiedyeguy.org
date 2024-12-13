import React from 'react'
import { useNavigate } from 'react-router-dom';

function LinkList() {
    let navigate = useNavigate();

    const handleLinkSelect = (id) => {
        navigate(`/${id}`)
    }

    const handleDownload = (id) => {
        const link = 
            process.env.NODE_ENV === "production"
            ? `/${id}`
            : `http://localhost:3000/${id}`
        window.open(link);
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
                    <td>First full stack application I made based on this <a href="https://www.youtube.com/watch?v=7qAXvOFhlDc&t=0s&ab_channel=SanjeevThiyagarajan" target="_blank" rel="noopener noreferrer">YouTube tutorial</a></td>
                </tr>
                <tr onClick={() => handleLinkSelect('games')} key = 'games'>
                    <td>Games</td>
                    <td>A random assortment of games I made for fun</td>
                </tr>
                <tr onClick={() => handleLinkSelect('posts')} key='posts'>
                    <td>Posts</td>
                    <td>All the posts made on individuals profiles</td>
                </tr>
                <tr onClick={() => handleDownload('snake.zip')} key='snake'>
                    <td>Snakes</td>
                    <td>Download for my first Lua/Love game based on the classic snake game</td>
                </tr>
            </tbody>
        </table>
    </div>
  )
}

export default LinkList