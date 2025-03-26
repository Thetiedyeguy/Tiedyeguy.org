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
                <tr onClick={() => handleLinkSelect('downloads')} key='downloads'>
                    <td>Downloads</td>
                    <td>Download links to all my projects that can not be hosted directly on my website. Currently mainly my Love/Lua Games</td>
                </tr>
                <tr onClick={() => window.open('https://cronkiteelectric.us', '_blank')} key='electrician site'>
                    <td>CronkiteElectric.us</td>
                    <td>Commissioned website for a local electrician. Finished making the website, however am waiting to get feedback from the owner to update the information to make it more accurate</td>
                </tr>
                <tr onClick={() => window.open('https://oliviabatesdesign.com', '_blank')} key='design site'>
                    <td>OliviaBatesDesign.com</td>
                    <td>Currently working with Olivia Bates, a design and communications major, on a website to serve as her portfolio. Currently still a work in progress, but still looks very good.</td>
                </tr>
            </tbody>
        </table>
    </div>
  )
}

export default LinkList