import { useParams, Link } from 'react-router-dom';

function UserDetail(props) {
    const params = useParams ();
    const userFound = props.findUser(params.id);
    console.log(params)
    console.log(params.id)
  return (
    <>
    <article>
        <h2>{userFound.name} {userFound.lastname}</h2>
        <p>{userFound.age}</p>
        <p>{userFound.city}</p>
        <p>{userFound.gender}</p>
    </article>
    <Link to='/'><p>aaaa</p></Link>
    </>
    );
}


export default UserDetail;