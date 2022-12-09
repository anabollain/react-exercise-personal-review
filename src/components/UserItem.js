import { Link } from 'react-router-dom';

function UserItem({ eachUser }) {

  return (
    <Link to={`/user/${eachUser.id}`}>
      <li key={eachUser.id}>
        <h2>{eachUser.name} {eachUser.lastname}</h2>
        <p>{eachUser.age}</p>
        <p>{eachUser.city}</p>
        <p>{eachUser.gender}</p>
      </li>
    </Link >
    );
}

export default UserItem;