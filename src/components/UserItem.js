import { Link } from 'react-router-dom';
//styles
import '../styles/UserItem.scss';

function UserItem({ eachUser }) {

  return (
    
      <div>
        <li key={eachUser.id} className='user'>
          <h2 className='user__title'>{eachUser.name} {eachUser.lastname}</h2>
          <p className='user__text'>{eachUser.age}</p>
          <p className='user__text'>{eachUser.city}</p>
          <p className='user__text'>{eachUser.gender}</p>
          <Link to={`/user/${eachUser.name}`}>Info</Link >
        </li>
      </div>
    );
}

export default UserItem;